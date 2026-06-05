import { useContext, useEffect, useState } from "react";
import { Card, Badge, Image, Form, Button, Container, Row, Col } from "react-bootstrap";
import { ref, onValue, push, set } from "firebase/database";
import { db, auth } from "../../configs/FirebaseConfig";
import { authApis, endpoints } from "../../configs/Api";
import { MyMessageContext, MyUserContext } from "../../configs/Context";
import MySpinner from "../../components/MySpinner";
import { useLocation } from "react-router-dom";

const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    const [user] = useContext(MyUserContext);
    const [unreadCount]= useContext(MyMessageContext);
    const location = useLocation();
    const { conversationId=null } = location.state || {};
    const [activeConversationId, setActiveConversationId] = useState(conversationId);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loadingChat, setLoadingChat] = useState(false);

    const loadConversations = async () => {
        try {
            const conversation = await authApis().get(endpoints['conversation']);
            setConversations(conversation.data);
        } catch (e) {
            console.error(e);
        }
    };


    useEffect(() => {
        loadConversations();
    }, [unreadCount]);


    useEffect(() => {
        if (!activeConversationId) return;
        setLoadingChat(true);

        const msgRef = ref(db, `chat_rooms/${activeConversationId}/messages`);

        const unsub = onValue(msgRef, 
            (snap) => {
                const data = snap.val() || {};
                const list = Object.entries(data)
                    .map(([id, v]) => ({ id, ...v }))
                    .sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
                setMessages(list);
                authApis().patch(endpoints["conversation-detail"](activeConversationId), {});
                loadConversations();
                setLoadingChat(false);
            }, 
            (error) => {
                console.error("Lỗi đọc dữ liệu Firebase:", error);
                setLoadingChat(false);
            }
        );

        return () => unsub();
    }, [activeConversationId]);


    useEffect(() => {
        if (!activeConversationId) return;
        const seen = setTimeout(async () => {
            try {
                await authApis().patch(endpoints["conversation-detail"](activeConversationId), {});
                loadConversations();
                await set(ref(db, `chat_updates/${user.users.id}`), Date.now());
            } catch (error) {
                console.error("Lỗi khi bắn API báo Seen:", error);
            }
        }, 500);

        return () => clearTimeout(seen);
    }, [messages.length, activeConversationId]);

    const sendMessage = async (e) => {
        e?.preventDefault();
        if (!text.trim() || !auth.currentUser || !activeConversationId) return;

        try {
            let tmpText = text.trim();
            setText("");
            await push(ref(db, `chat_rooms/${activeConversationId}/messages`), {
                sender: auth.currentUser.uid,
                text: tmpText,
                created_at: Date.now(),
            });
            const parts = activeConversationId.split('_');
            const receiverId = parts[1] === auth.currentUser.uid ? parts[2] : parts[1];
            if (receiverId) {
                await set(ref(db, `chat_updates/${receiverId}`), Date.now());
            }
            await authApis().patch(endpoints["conversation-detail"](activeConversationId), {
                "message": tmpText,
            });
            loadConversations();
        } catch (error) {
            console.error("Lỗi khi gửi tin nhắn:", error);
        }
    };


    const formatDate = (ts) => {
        const d = new Date(ts);
        return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
    };

    const formatTime = (ts) => {
        const d = new Date(ts);
        return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    };


    const renderConversations = (conversation) => {
        const isCustomer = user?.users.role === 'ROLE_CUSTOMER';
        const targetUser = isCustomer ? conversation.provider : conversation.customer;
        const unreadCount = isCustomer ? conversation.customerUnread : conversation.providerUnread;
        const isActive = activeConversationId === conversation.id;

        return (
            <Card 
                key={conversation.id} 
                className={`mb-2 shadow-sm ${isActive ? 'border-primary' : 'border-0'}`} 
                style={{ cursor: "pointer", backgroundColor: isActive ? '#f8f9fa' : 'white' }}
                onClick={() => setActiveConversationId(conversation.id)}
            >
                <Card.Body className="d-flex align-items-center p-3">
                    <div className="me-3">
                        <Image 
                            src={targetUser.users.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                            roundedCircle width={48} height={48} 
                            style={{ objectFit: 'cover' }} 
                        />
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                        <h6 className="mb-1 fw-bold text-truncate">{targetUser.fullname || targetUser.businessName}</h6>
                        <small className="text-muted text-truncate d-block">
                            {conversation.lastMessage ? `Tin nhắn cuối cùng: ${conversation.lastMessage}` : "Chưa có tin nhắn"}
                        </small>
                    </div>
                    
                    {unreadCount > 0 && (
                        <div className="ms-3 align-self-center">
                            <Badge bg="danger" pill>{unreadCount}</Badge>
                        </div>
                    )}
                </Card.Body>
            </Card>
        );
    };

    const renderMessageItem = (item, index) => {
        const isMe = item.sender === auth.currentUser?.uid;
        const nextMessage = index < messages.length - 1 ? messages[index + 1] : null;
        const showDate = !nextMessage || formatDate(nextMessage.created_at) !== formatDate(item.created_at);

        return (
            <div key={item.id} className="w-100">
                {showDate && (
                    <div className="text-center my-2 text-muted" style={{ fontSize: "12px" }}>
                        {formatDate(item.created_at)}
                    </div>
                )}
                
                <div className={`d-flex mb-2 ${isMe ? "justify-content-end" : "justify-content-start"}`}>
                    <div 
                        className="shadow-sm"
                        style={{
                            maxWidth: "75%",
                            backgroundColor: isMe ? "#5194ec" : "#f1f5f9",
                            padding: "8px 12px",
                            borderRadius: "16px",
                            borderTopRightRadius: isMe ? "0px" : "16px",
                            borderTopLeftRadius: isMe ? "16px" : "0px",
                        }}
                    >
                        <div style={{ color: isMe ? "#ffffff" : "#0f172a", fontSize: "16px", wordBreak: "break-word" }}>
                            {item.text}
                        </div>
                        <div 
                            className={`text-end mt-1 ${isMe ? "text-light" : "text-muted"}`} 
                            style={{ fontSize: "11px", opacity: 0.8 }}
                        >
                            {formatTime(item.created_at)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className=" d-flex p-4 gap-4 vh-100">
            <Card style={{ width: '25rem', border: '2px solid #dee2e6' }}>
		        <Card.Body>
                    <div className="p-3 border-bottom bg-light">
                        <h5 className="mb-0 fw-bold">Tin nhắn</h5>
                    </div>
                    <div className="p-2 flex-grow-1" style={{ overflowY: "auto" }}>
                        {conversations.length === 0 ? (
                            <p className="text-center text-muted mt-3">Không có cuộc trò chuyện nào.</p>
                        ) : (
                            conversations.map(renderConversations)
                        )}
                    </div>
                </Card.Body>
            </Card>

                <Col className="h-100 d-flex flex-column">
                    {!activeConversationId ? (
                        <div className="flex-grow-1 d-flex justify-content-center align-items-center bg-light">
                            <h5 className="text-muted">Chọn một cuộc trò chuyện để bắt đầu</h5>
                        </div>
                    ) : loadingChat ? (
                        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                            <MySpinner />
                        </div>
                    ) : (
                        <>
                            <div className="flex-grow-1 d-flex flex-column-reverse p-3" 
                                style={{ overflowY: "auto", backgroundColor: "#fafafa" }}
                            >
                                {messages.map((item, index) => renderMessageItem(item, index))}
                            </div>

                            <div className="p-3 bg-white border-top">
                                <Form className="d-flex align-items-center" onSubmit={sendMessage}>
                                    <Form.Control
                                        type="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Nhập tin nhắn..."
                                        className="flex-grow-1 me-2 shadow-none"
                                        style={{ borderRadius: "20px", padding: "10px 20px" }}
                                    />
                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        disabled={!text.trim()} 
                                        style={{ borderRadius: "20px", padding: "10px 24px", backgroundColor: "#2563eb", border: "none" }}
                                    >
                                        Gửi
                                    </Button>
                                </Form>
                            </div>
                        </>
                    )}
                </Col>
        </div>
    );
};

export default Conversations;