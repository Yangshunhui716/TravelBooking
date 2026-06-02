import { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ref, onValue, push } from "firebase/database";
import { db, auth } from "../../configs/FirebaseConfig";
import { authApis, endpoints } from "../../configs/Api";
import { useNavigate, useParams } from "react-router-dom";
import MySpinner from "../../components/MySpinner";

const Chatroom = () => {
    const { conversationId } = useParams();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formatDate = (ts) => {
        const d = new Date(ts);
        return d.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const formatTime = (ts) => {
        const d = new Date(ts);
        return d.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    useEffect(() => {
        if (!conversationId) return;
        setLoading(true);

        const msgRef = ref(db, `chat_rooms/${conversationId}/messages`);

        const unsub = onValue(msgRef, 
            (snap) => {
                const data = snap.val() || {};
                const list = Object.entries(data)
                    .map(([id, v]) => ({ id, ...v }))
                    .sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
                setMessages(list);
                authApis().patch(endpoints["conversation-detail"](conversationId), {});
                setLoading(false);
            }, 
            (error) => {
                console.error("Lỗi đọc dữ liệu Firebase:", error);
                navigate("/conversations");
            }
        );
        return () => unsub();
    }, [conversationId]);

    const seen = setTimeout(async () => {
        try {
            await authApis().patch(endpoints["conversation-detail"](conversationId), {});
        } catch (error) {
            console.error("Lỗi khi bắn API báo Seen:", error);
        }
    }, 1500);

    useEffect(() => {
        return () => clearTimeout(seen);
    }, [messages.length, conversationId]);

    const sendMessage = async (e) => {
        e?.preventDefault();
        if (!text.trim() || !auth.currentUser) return;

        try {
            let tmpText = text.trim();
            setText("");

            await push(ref(db, `chat_rooms/${conversationId}/messages`), {
                sender: auth.currentUser.uid,
                text: tmpText,
                created_at: Date.now(),
            });

            await authApis().patch(endpoints["conversation-detail"](conversationId), {
                "message": tmpText,
            });

        } catch (error) {
            console.error("Lỗi khi gửi tin nhắn:", error);
        }
    };

    const renderItem = (item, index) => {
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

    if (loading) {
        return <MySpinner />;
    }

    return (
        <div className="container d-flex flex-column" style={{ height: "100vh", maxWidth: "800px" }}>
            <div className="flex-grow-1 d-flex flex-column-reverse p-3" 
                style={{ overflowY: "auto", backgroundColor: "#fafafa", border: "1px solid #dee2e6", borderRadius: "8px" }}
            >
                {messages.map((item, index) => renderItem(item, index))}
            </div>


            <Form className="d-flex align-items-center py-3" onSubmit={sendMessage}>
                <Form.Control
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-grow-1 me-2 shadow-none"
                    style={{ borderRadius: "8px" }}
                />
                <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={!text.trim()} 
                    style={{ borderRadius: "8px", backgroundColor: "#2563eb", border: "none" }}
                >
                    Gửi
                </Button>
            </Form>
        </div>
    );
};

export default Chatroom;