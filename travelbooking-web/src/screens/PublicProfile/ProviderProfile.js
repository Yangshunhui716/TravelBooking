import { Button, Card, Col, Image, Row } from "react-bootstrap";
import ServicesList from "../../components/ServiceList";
import { useCallback, useContext, useEffect, useState } from "react";
import { authApis, endpoints } from "../../configs/Api";
import { useNavigate, useParams } from "react-router-dom";
import MySpinner from "../../components/MySpinner";
import { MyUserContext } from "../../configs/Context";
import StaticStyle from "../StaticStyle";
import ProviderProfileStyle from "./ProviderProfileStyle";

const ProviderProfile = () => {
    const { providerId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [provider, setProvider] = useState(null);
    const [providerServices, setProviderServices] = useState([]);
    const [serviceType, setServiceType] = useState('tour');
    const [user] = useContext(MyUserContext);

    const loadProfileProvider = useCallback(async () => {
        try {
            setLoading(true);
            let res = await authApis().get(endpoints["public-provider-profile"](providerId));
            setProvider(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }, [providerId]);
    
    const loadServices = useCallback(async () => {
        try {
            setLoading(true);
            let res;
            if(serviceType === 'tour') {
                res = await authApis().get(endpoints["public-provider-tour-services"](providerId));
                setProviderServices(res.data.map(service => ({
                    id: service.id,
                    title: service.services.name,
                    image: service.services.imgUrl,
                    onView: () => navigate(`/tour-services/${service.id}`)
                })));
            }else if(serviceType === 'hotelRoom') {
                res = await authApis().get(endpoints["public-provider-hotel-room-services"](providerId));
                setProviderServices(res.data.map(service => ({
                    id: service.id,
                    title: service.services.name,
                    image: service.services.imgUrl,
                    onView: () => navigate(`/hotel-room-services/${service.id}`)
                })));
            }else if(serviceType === 'transport') {
                res = await authApis().get(endpoints["public-provider-transport-services"](providerId));
                setProviderServices(res.data.map(service => ({
                    id: service.id,
                    title: service.services.name,
                    image: service.services.imgUrl,
                    onView: () => navigate(`/transport-services/${service.id}`)
                })));
            }   
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }, [serviceType]);

    useEffect(() => {
        loadProfileProvider();
        loadServices();
    }, [providerId]);

    useEffect(() => {
        loadServices();
    }, [loadServices]);

    const handleChat = async () => {
        try {
            let conversation = await authApis().post(endpoints["conversation-create"](provider.id));
            navigate("/conversations", { state: { conversationId: conversation.data.id } });
        } catch (ex) {
            console.error(ex);
        }
    };

    return (
        <div className="p-4 gap-4 d-flex" style={StaticStyle.baseHeight}>
                <div style={ProviderProfileStyle.profile}>
                    <Card className="shadow p-4 rounded-4 border-0">
                        <div className="text-center mb-3">
                            <Image alt="avatar" width="100" height="100" 
                                src={provider?.users?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                style={ProviderProfileStyle.image}
                            />
                        </div>

                        <h4 className="text-center mb-4 fw-bold">{provider?.businessName}</h4>

                        <div className="mb-3">
                            <b className="text-muted">Mã số thuế:</b>
                            <p className="mb-0 fw-medium">{provider?.tax || "Chưa cập nhật"}</p>
                        </div>

                        <div className="mb-3">
                            <b className="text-muted">Địa chỉ:</b>
                            <p className="mb-0 fw-medium">{provider?.address || "Chưa cập nhật"}</p>
                        </div>
                            
                        <div className="mb-3">
                            <b className="text-muted">SĐT:</b>
                            <p className="mb-0 fw-medium">{provider?.users?.phone || "Chưa cập nhật"}</p>
                        </div>

                        <div className="mb-3">
                            <b className="text-muted">Email:</b>
                            <p className="mb-0 fw-medium">{provider?.users?.email || "Chưa cập nhật"}</p>
                        </div>
                        
                        {user?.users.role === "ROLE_CUSTOMER" && (
                            <div className="d-flex justify-content-center mt-4">
                                <Button variant="primary" className="px-5 rounded-pill shadow-sm" 
                                onClick={handleChat}>
                                    Chat ngay 
                                </Button>
                            </div>
                        )}
                        
                    </Card>
                </div>

                <div className="flex-grow-1">
                    <ServicesList title={`Dịch vụ của ${provider?.businessName || "nhà cung cấp"}`} 
                    items={providerServices} currentSort={serviceType} onSortChange={setServiceType} />
                </div>
        </div>
    );
};


export default ProviderProfile;