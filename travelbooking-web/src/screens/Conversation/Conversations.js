import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Badge, Image } from "react-bootstrap";
import { endpoints, authApis } from "../../configs/Api";
import { MyUserContext } from "../../configs/Context";

const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    const [user] = useContext(MyUserContext);

    const nav = useNavigate();

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
    }, []);
    
    const renderConversations = (conversation) => {
        const isCustomer = user?.users.role === 'ROLE_CUSTOMER';
        const targetUser = isCustomer ? conversation.provider : conversation.customer;
        const unreadCount = isCustomer ? conversation.customerUnread : conversation.providerUnread;

        return (
            <Card key={conversation.id} className="mb-2 shadow-sm border-0" 
                style={{ cursor: "pointer" }}
                onClick={() => nav(`/conversations/${conversation.id}`)}
            >
                <Card.Body className="d-flex align-items-center p-3">
                    <div className="me-3">
                        <Image 
                            src={targetUser.users.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                            roundedCircle width={48} height={48} 
                            style={{ objectFit: 'cover' }} 
                        />
                    </div>

                    <div className="flex-grow-1">
                        <h6 className="mb-1 fw-bold">{targetUser.fullname || targetUser.businessName}</h6>
                        <small className="text-muted">
                            {conversation.lastMessage ? `Tin nhắn cuối cùng: ${conversation.lastMessage}` : "Chưa có tin nhắn"}
                        </small>
                    </div>
                    
                    {unreadCount > 0 && (
                        <div className="ms-3 align-self-center">
                            <Badge bg="danger" pill>
                                {unreadCount}
                            </Badge>
                        </div>
                    )}
                </Card.Body>
            </Card>
        );
    };

    return (
        <div className="container mt-3">
        {conversations.length === 0 ? (
            <p>Không có cuộc trò chuyện nào.</p>
        ) : (
            <div className="chat-list-container">
                {conversations.map((conversation) => renderConversations(conversation))}
            </div>
        )}
        </div>
    );
};

export default Conversations;