import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DisplayImage from "../../components/DisplayImage";
import MySpinner from "../../components/MySpinner";
import Api, { authApis, endpoints } from "../../configs/Api";
import { MyUserContext, MyCartContext } from "../../configs/Context";
import styles from "./ServiceDetailStyle";
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
                quantity: 1
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
            setReviews([res.data, ...reviews]); // Đẩy đánh giá mới nhất lên đầu danh sách hiển thị
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

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <MySpinner />
            </div>
        );
    }

    return (
        <Container className="mt-4 mb-5">
            {transportService && (
                <>
                    <Row className="mb-4">
                        <Col>
                            <div style={styles.titleBox}>
                                <h2 className="m-0 text-dark font-weight-bold">
                                    {transportService.services?.name}
                                </h2>
                            </div>
                        </Col>
                    </Row>


                    <Row>
                        <Col md={5} xs={12} className="mb-4">
                            <div style={styles.imageWrapper}>
                                <DisplayImage src={transportService.services?.imgUrl} />
                            </div>
                        </Col>


                        <Col md={7} xs={12}>
                            <div style={styles.infoCard}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <span className="text-muted d-block small">Giá vé từ</span>
                                        <h3 style={styles.priceText}>
                                            {transportService.services?.price?.toLocaleString()} VNĐ
                                        </h3>
                                        <small className="text-secondary">
                                            Còn trống: {transportService.services?.availableSlots} / {transportService.services?.slots} ghế
                                        </small>
                                    </div>
                                    {(user === null || user?.users?.role !== "ROLE_PROVIDER") && (
                                        <Button 
                                            variant="danger" 
                                            size="lg" 
                                            className="px-4 font-weight-bold mt-2" 
                                            onClick={() => order(transportService)}
                                        >
                                            Đặt
                                        </Button>
                                    )}
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center my-3 py-2">
                                    <div className="d-flex align-items-center">
                                        <Image 
                                            src={transportService.services?.providerId?.users?.avatar || "https://via.placeholder.com/50"} 
                                            style={styles.providerAvatar} 
                                            alt="Provider Avatar"
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
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm" 
                                            className="font-weight-bold"
                                            onClick={handleViewProvider}
                                        >
                                            Xem chi tiết
                                        </Button>
                                        <Button 
                                            variant="outline-success" 
                                            size="sm" 
                                            className="font-weight-bold"
                                            onClick={handleChatProvider}
                                        >
                                            Chat ngay
                                        </Button>
                                    </div>
                                </div>

                                <hr />

                                <div className="mt-3">
                                    <h5 className="font-weight-bold text-dark mb-3">
                                        Thông tin chi tiết dịch vụ
                                    </h5>
                                    
                                    <Row>
                                        <Col sm={6} xs={12}>
                                            <ul className="list-unstyled ps-1">
                                                <li className="mb-2">
                                                    <strong>Loại phương tiện: </strong> 
                                                    <span className="text-secondary">{transportService.transportType}</span>
                                                </li>
                                                <li className="mb-2">
                                                    <strong>Địa điểm: </strong> 
                                                    <span className="text-secondary">
                                                        {transportService.departure} &rarr; {transportService.services?.destination}
                                                    </span>
                                                    <div className="text-muted small ps-2">({transportService.loactionDetail})</div>
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
                                            <ul className="list-unstyled ps-1">
                                                <li className="mb-2">
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
                                        <p style={styles.descriptionText} className="mt-1">
                                            {transportService.services?.description}
                                        </p>
                                    </div>
                                </div>

                                <hr />

                                
                                <ReviewSection 
                                    reviews={reviews}
                                    onAddReview={handlePostReview}
                                    user={user}
                                />

                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default TransportServiceDetail;