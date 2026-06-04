import { useCallback, useContext, useEffect, useState } from "react";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { authApis, endpoints } from "../../configs/Api";
import ButtonServiceGroup from "../../components/ButtonServiceGroup";
import { useNavigate } from "react-router-dom";
import { MyUserContext } from "../../configs/Context";
import MySpinner from "../../components/MySpinner";


const ProviderServices = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [serviceType, setServiceType] = useState('tour');
    const [user] = useContext(MyUserContext);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("vi-VN");
    };

    const loadServices = useCallback(async () => {
        try {
            setLoading(true);
            let res;
            if(serviceType === 'tour') {
                res = await authApis().get(endpoints["provider-tour-services"]);
            }else if(serviceType === 'hotelRoom') {
                res = await authApis().get(endpoints["provider-hotel-room-services"]);
            }else if(serviceType === 'transport') {
                res = await authApis().get(endpoints["provider-transport-services"]);
            }
            setServices(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }, [serviceType]);

    useEffect(() => {
        loadServices();
    }, [loadServices]);

    const closeService = async (serviceId) => {
        const isConfirm = window.confirm("Dịch vụ sau khi đóng sẽ không thể mở lại. Vui lòng xác nhận khi đã chắc chắn?");
        if (!isConfirm) return;

        try {
            setLoading(true);
            let patchUrl = ""

            if (serviceType === 'tour') {
                patchUrl = endpoints["provider-tour-service"](serviceId);
            } else if (serviceType === 'hotelRoom') {
                patchUrl = endpoints["provider-hotel-room-service"](serviceId);
            } else if (serviceType === 'transport') {
                patchUrl = endpoints["provider-transport-service"](serviceId);
            }

            const payload = {
                "status": "false"
            };

            await authApis().patch(patchUrl, payload);
            loadServices();

        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    const navigateModifierService = (s) => {
        if (s){
            navigate("/modifier-service",{ state: { isEditMode: true, existingService: s, type: serviceType } });
        }else {
            navigate("/modifier-service", { state: { isEditMode: false, type: serviceType } });
        }
    };

    return (
        <Card className="shadow rounded-4 p-4 border-0">
            <h3 className="text-uppercase fw-bold">Quản lý dịch vụ</h3>
            <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                <ButtonServiceGroup onChangeType={setServiceType}/>
                
                {user.users.isActive ? 
                <Button variant="primary" onClick={() => navigateModifierService(null)}>
                    Thêm dịch vụ mới
                </Button>:
                <Alert variant="warning" className="py-2 px-2 small rounded-3">
                    Tài khoản chưa được phê duyệt, vui lòng đợi hoặc liên hệ để được cấp quyền đăng tải
                </Alert>
                }
            </div>

            {loading && <MySpinner />}

            {services.map(s => (
                <Card key={s.id} className="p-3 mb-3 rounded-4 border-2 shadow-sm">
                    <Card.Title>{s.services.name}</Card.Title>
                    <div className="d-flex justify-content-between mb-3 mt-1 me-3 fw-medium">
                        <div>Trạng thái: {s.services.status ? "Đang mở" : "Đã đóng"}</div>
                        <div>Ngày đăng: {formatDate(s.services.createdAt)}</div>
                        <div className="text-end">Số lượng: {s.services.availableSlots} / {s.services.slots}</div>
                    </div>

                    <div className="d-flex justify-content-between align-items-end">
                        <div>
                        { s.services.status && user.users.isActive && (
                            <>
                                <Button variant="outline-danger" className="rounded-pill px-3 me-2" onClick={() => closeService(s.services.id)}>
                                    Đóng dịch vụ
                                </Button>
                                <Button variant="outline-primary" className="rounded-pill px-3" onClick={() => navigateModifierService(s)}>
                                    Chỉnh sửa chi tiết
                                </Button>
                            </>
                        ) }
                        </div>

                        <div>
                            <Button variant="info" className="me-1 rounded-pill px-4" onClick={() => navigate(`/provider/services/${s.services.id}/customers`)}>
                                Danh sách khách hàng
                            </Button>

                        </div>
                    </div>
                </Card>
            ))}
        </Card>
    );
}

export default ProviderServices;