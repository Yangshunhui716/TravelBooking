import { useContext, useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DisplayImage from "../../components/DisplayImage";
import MySpinner from "../../components/MySpinner";
import Api, { authApis, endpoints } from "../../configs/Api";
import { MyUserContext, MyCartContext, MyCompareContext } from "../../configs/Context";
import ServiceDetailStyle from "./ServiceDetailStyle";
import StaticStyle from "../StaticStyle";
import ReviewSection from "../../components/ReviewSection";
import cookies from "react-cookies";

const TransportServiceDetail = () => {
    const { serviceId } = useParams();
    const [transportService, setTransportService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user] = useContext(MyUserContext);
    const nav = useNavigate();
    const [, dispatch] = useContext(MyCartContext);
    

    const [reviews, setReviews] = useState([]);


    const formatDateTime = (timestamp) => {
        if (!timestamp) return "";
        return new Date(timestamp).toLocaleString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };


    const loadTransportDetail = async () => {
        try {
            setLoading(true);
            let res = await Api.get(endpoints['transport-service-detail'](serviceId));
            setTransportService(res.data);
        } catch (ex) {
            console.error("Lỗi khi tải chi tiết dịch vụ vận chuyển:", ex);
        } finally {
            setLoading(false);
        }
    };


    const loadReviews = async () => {
        try {
            const coreServiceId = transportService?.services?.id;
            if (coreServiceId) {
                let res = await Api.get(endpoints['service-reviews'](coreServiceId));
                setReviews(res.data);
            }
        } catch (ex) {
            console.error("Lỗi khi fetch danh sách reviews của vận chuyển:", ex);
        }
    };
    const order = (service) => {
        let cart = cookies.load("cart") || null;
        if (cart === null) {
            cart = {};
        }
        const serviceId = service.services?.id;

        if (serviceId in cart) {
            cart[serviceId].quantity += 1;
        } else {
            cart[serviceId] = {
                id: serviceId,
                name: service.services?.name,
                price: service.services?.price,
                departure_time: service.departureTime,
                type: "transport",
                quantity: 1,
                durationDays:1
            }; 
        } 
        cookies.save("cart", cart);
        dispatch({
            type: "UPDATE"
        });
        alert("Đã thêm vé xe vào giỏ hàng thành công!");
    };
    

    useEffect(() => {
        if (serviceId) {
            loadTransportDetail();
        }
    }, [serviceId]);


    useEffect(() => {
        if (transportService) {
            loadReviews();
        }
    }, [transportService]);


    const handlePostReview = async (comment, rating) => {
        try {
            const coreServiceId = transportService?.services?.id;
            if (!coreServiceId) {
                alert("Không tìm thấy mã dịch vụ cốt lõi!");
                return;
            }


            let res = await authApis().post(
                endpoints['customer-create-review'](coreServiceId), 
                {
                    comment: comment,
                    rating: String(rating)
                }
            );

            alert("Đánh giá dịch vụ vận chuyển thành công!");
            setReviews([res.data, ...reviews]);
        } catch (ex) {
            console.error("Lỗi chi tiết khi gửi review vận chuyển:", ex);
            if (ex.response && ex.response.data) {
                alert(`Lỗi: ${ex.response.data.message || "Hệ thống từ chối quyền đánh giá!"}`);
            } else {
                alert("Đã xảy ra lỗi khi gửi đánh giá. Vui lòng kiểm tra lại trạng thái đăng nhập!");
            }
        }
    };


    const handleViewProvider = () => {
        const providerId = transportService.services?.providerId?.id;
        if (providerId) nav(`/providers/${providerId}`);
    };

    const handleChatProvider = async () => {
        if (user === null) {
            nav(`/login?next=/transport-services/${serviceId}`);
            return;
        }
        const providerUserId = transportService.services?.providerId?.users?.id;
        if (providerUserId) {
            let conversation = await authApis().post(endpoints["conversation-create"](providerUserId));
            nav("/conversations", { state: { conversationId: conversation.data.id } });
        }
    };

    const [, compareDispatch] = useContext(MyCompareContext);

    const handleAddCompare = () => {
        if (!transportService || !transportService.services) return; 
        const servicePayload = {
            id: transportService.id,
            name: transportService.services.name,
            description: [
                `Loại phương tiện: ${transportService.transportType}`,
                `Địa điểm: ${transportService.departure} > ${transportService.services.destination}`,
                `Thời gian khởi hành: ${formatDateTime(transportService.departureTime)}`
            ].join("<br/>"), 
            price: transportService.services.price,
            image: transportService.services.imgUrl,
            typeService: "transport-services"
        };
        compareDispatch({ type: 'ADD_SERVICE', payload: servicePayload });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-5" style={StaticStyle.baseHeight}>
                <MySpinner />
            </div>
        );
    }

    return (
        <div style={StaticStyle.baseHeight}>
            {transportService && (
                <>
                    <div style={ServiceDetailStyle.titleBox} className=" m-4 d-flex justify-content-between align-items-center">
                        <h2 className="text-dark font-weight-bold">
                            {transportService.services?.name}
                        </h2>
                        <Button variant="outline-secondary"
                            className="rounded-pill"
                            onClick={handleAddCompare}
                        >
                            + So sánh
                        </Button>
                    </div>

                    <Row className="m-3 d-flex justify-content-center">
                        <Col md={5} xs={12} style={ServiceDetailStyle.sticky}>
                            <div style={{ ...ServiceDetailStyle.imageWrapper, width: "100%" }}>
                                <DisplayImage src={transportService.services?.imgUrl} />
                            </div>

                            <div style={ServiceDetailStyle.infoCard} className="d-flex justify-content-between my-4 py-4">
                                <div className="d-flex align-items-center">
                                    <Image style={ServiceDetailStyle.providerAvatar} alt="Provider Avatar"
                                        src={transportService.services?.providerId?.users?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                    />
                                    <div className="ms-3">
                                        <h6 className="m-0 font-weight-bold text-primary">
                                            {transportService.services?.providerId?.businessName}
                                        </h6>
                                        <p className="m-0 text-muted small mt-1">
                                            Trụ sở: {transportService.services?.providerId?.address}
                                        </p>
                                        <p className="m-0 text-muted small">
                                            Hotline: {transportService.services?.providerId?.users?.phone}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="d-flex flex-column gap-2">
                                    <Button variant="primary" size="sm" 
                                        className="font-weight-bold"
                                        onClick={handleViewProvider}
                                    >
                                        Xem chi tiết
                                    </Button>
                                    {user?.users.role === "ROLE_CUSTOMER" &&
                                    <Button variant="success" size="sm" 
                                        className="font-weight-bold"
                                        onClick={handleChatProvider}
                                    >
                                        Chat ngay
                                    </Button>}
                                </div>
                            </div>
                        </Col>


                        <Col md={7} xs={12}>
                            <div style={ServiceDetailStyle.infoCard}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <span className="text-muted d-block small">Giá vé từ</span>
                                        <h3 style={ServiceDetailStyle.priceText}>
                                            {transportService.services?.price?.toLocaleString()} VNĐ
                                        </h3>
                                        <small className="text-secondary">
                                            Còn trống: {transportService.services?.availableSlots} / {transportService.services?.slots} ghế
                                        </small>
                                    </div>
                                    {(user === null || user?.users?.role !== "ROLE_PROVIDER") && (
                                        <Button variant="danger" size="lg" 
                                            className="px-4 font-weight-bold mt-2" 
                                            onClick={() => order(transportService)}
                                        >
                                            Đặt
                                        </Button>
                                    )}
                                </div>

                                <hr />

                                <div className="mt-3">
                                    <h5 className="font-weight-bold text-dark mb-3">
                                        Thông tin chi tiết dịch vụ
                                    </h5>
                                    
                                    <Row>
                                        <Col sm={6} xs={12}>
                                            <ul className="list-unstyled ps-1">
                                                <li className="mb-3">
                                                    <strong>Loại phương tiện: </strong> 
                                                    <span className="text-secondary">{transportService.transportType}</span>
                                                </li>
                                                <li className="mb-3">
                                                    <strong>Địa điểm: </strong> 
                                                    <span className="text-secondary">
                                                        {transportService.loactionDetail} ({transportService.departure} &rarr; {transportService.services?.destination})
                                                    </span>
                                                </li>
                                                <li className="mb-2">
                                                    <strong>Thời gian khởi hành: </strong> 
                                                    <span className="text-secondary block">
                                                        {formatDateTime(transportService.departureTime)}
                                                    </span>
                                                </li>
                                            </ul>
                                        </Col>

                                        <Col sm={6} xs={12}>
                                            <ul className="list-unstyled mb-2">
                                                <li>
                                                    <strong>Loại vé: </strong> 
                                                    <span className="text-secondary">{transportService.ticketType}</span>
                                                </li>
                                                <li className="mb-2" style={{ visibility: "hidden" }}>
                                                    <br/><small>&nbsp;</small>
                                                </li>
                                                <li className="mb-2">
                                                    <strong>Thời gian đến (dự kiến): </strong> 
                                                    <span className="text-secondary block">
                                                        {formatDateTime(transportService.endTime)}
                                                    </span>
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>

                                    <div className="mt-2 ps-1 mb-4">
                                        <strong>Mô tả: </strong>
                                        <p style={ServiceDetailStyle.descriptionText} className="mt-1">
                                            {transportService.services?.description}
                                        </p>
                                    </div>
                                </div>

                                <hr />

                                
                                <ReviewSection reviews={reviews}
                                    onAddReview={handlePostReview}
                                    user={user}
                                />

                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default TransportServiceDetail;