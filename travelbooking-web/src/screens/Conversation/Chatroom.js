import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spinner, Form, Button } from "react-bootstrap";
import { ref, onValue, push } from "firebase/database";
import { db, auth } from "../utils/firebase";
import { endpoints, authApis } from "../config/Apis";
import { MyUserContext } from "../utils/mycontext";

const Chatroom = () => {
    const location = useLocation();
    // Giả định bạn truyền chatRoom qua state của React Router: navigate('/chat', { state: { chatRoom: room } })
    const { chatRoom } = location.state || {}; 
    const roomId = chatRoom?.chat_room_id;
    
    const [user] = useContext(MyUserContext);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

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
        if (!roomId) return;

        setLoading(true);

        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    await authApis(token).get(endpoints["chatroom"](roomId));
                }
            } catch (error) {
                console.error("Lỗi khi tải thông tin chat room:", error);
            }
        };

        fetchData();

        const msgRef = ref(db, `chat_rooms/${roomId}/messages`);

        const unsub = onValue(msgRef, snap => {
            const data = snap.val() || {};
            const list = Object.entries(data)
                .map(([id, v]) => ({ id, ...v }))
                .sort((a, b) => (b.created_at || 0) - (a.created_at || 0)); // Sắp xếp mới nhất lên đầu

            setMessages(list);
            setLoading(false);
        });

        return () => unsub();
    }, [roomId]);

    const sendMessage = async (e) => {
        e?.preventDefault(); // Ngăn chặn reload trang nếu dùng form
        
        if (!text.trim() || !auth.currentUser) return;

        try {
            await push(ref(db, `chat_rooms/${roomId}/messages`), {
                sender: auth.currentUser.uid,
                text,
                created_at: Date.now(),
            });

            const token = localStorage.getItem("token");
            if (token) {
                await authApis(token).patch(endpoints["chatroom"](roomId), {
                    last_message: text,
                });
            }

            setText("");
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
                {/* Ngày tháng */}
                {showDate && (
                    <div className="text-center my-2 text-muted" style={{ fontSize: "12px" }}>
                        {formatDate(item.created_at)}
                    </div>
                )}
                
                {/* Dòng tin nhắn */}
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
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!roomId) {
        return <div className="text-center mt-5">Không tìm thấy phòng chat.</div>;
    }

    return (
        <div className="container d-flex flex-column" style={{ height: "100vh", maxWidth: "800px" }}>
            {/* Vùng hiển thị tin nhắn (FlatList inverted -> flex-column-reverse) */}
            <div 
                className="flex-grow-1 d-flex flex-column-reverse p-3" 
                style={{ overflowY: "auto", backgroundColor: "#fafafa", border: "1px solid #dee2e6", borderRadius: "8px" }}
            >
                {messages.map((item, index) => renderItem(item, index))}
            </div>

            {/* Vùng nhập tin nhắn */}
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