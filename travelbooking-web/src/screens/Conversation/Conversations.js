import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Badge, Image } from "react-bootstrap";
import { endpoints, authApis } from "../config/Apis";
import { MyUserContext } from "../utils/mycontext";

const Conversations = () => {
    const [chatrooms, setChatRooms] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [user] = useContext(MyUserContext);

    const nav = useNavigate();

    const loadConversation = async () => {
        try {
            // Sử dụng localStorage thay cho AsyncStorage trên Web
            const token = localStorage.getItem("token");
            if (!token) return;

            const chatroom = await authApis(token).get(endpoints['chat']);
            setChatRooms(chatroom.data.results);
            
            const conversation = await authApis(token).get(endpoints['conversation']);
            setConversations(conversation.data.results);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        loadConversation();
        // CẢNH BÁO: Đã đổi thành [] để tránh lỗi infinite loop (Render liên tục) 
        // từ dependency [conversations] của file React Native cũ.
    }, []);
    
    const renderItem = (room) => {
        const conversation = conversations?.find(
            c => c.conversation.chat_room_id === room.chat_room_id
        );

        // Gom logic để tái sử dụng thay vì viết lại 2 khối Card giống hệt nhau
        const isCandidate = user?.role === 'CANDIDATE';
        const targetUser = isCandidate ? room.employer : room.candidate;

        if (!targetUser) return null;

        return (
            <Card 
                key={room.chat_room_id} 
                className="mb-2 shadow-sm border-0" 
                style={{ cursor: "pointer" }}
                onClick={() => nav(`/chat-room/${room.chat_room_id}`)}
                // Lưu ý: Đường dẫn nav tùy thuộc vào cấu hình route của bạn
            >
                <Card.Body className="d-flex align-items-center p-3">
                    {/* Phần Avatar (Bên trái) */}
                    <div className="me-3">
                        {targetUser.avatar ? (
                            <Image 
                                src={targetUser.avatar} 
                                roundedCircle 
                                width={48} 
                                height={48} 
                                style={{ objectFit: 'cover' }} 
                            />
                        ) : (
                            <div 
                                className="d-flex justify-content-center align-items-center bg-secondary text-white rounded-circle"
                                style={{ width: '48px', height: '48px', fontSize: '20px' }}
                            >
                                {targetUser.full_name.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Phần Nội dung (Ở giữa) */}
                    <div className="flex-grow-1">
                        <h6 className="mb-1 fw-bold">{targetUser.full_name}</h6>
                        <small className="text-muted">
                            {room.last_message 
                                ? `Tin nhắn cuối cùng: ${room.last_message}` 
                                : "Chưa có tin nhắn"}
                        </small>
                    </div>

                    {/* Phần Badge (Bên phải) */}
                    {conversation?.unread_count > 0 && (
                        <div className="ms-3 align-self-center">
                            <Badge bg="danger" pill>
                                {conversation.unread_count}
                            </Badge>
                        </div>
                    )}
                </Card.Body>
            </Card>
        );
    };

    return (
        <div className="container mt-3">
            {/* Tương đương với FlatList trên Web */}
            <div className="chat-list-container">
                {chatrooms.map((room) => renderItem(room))}
            </div>
        </div>
    );
};

export default Conversations;