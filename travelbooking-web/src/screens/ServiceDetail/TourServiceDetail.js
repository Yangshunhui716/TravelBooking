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


const TourServiceDetail = () => {
    const { serviceId } = useParams();
    const [tourService, setTourService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user] = useContext(MyUserContext);
    const nav = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [, dispatch] = useContext(MyCartContext);

    const loadTourDetail = async () => {
        try {
            setLoading(true);
            let res = await Api.get(endpoints['tour-service-detail'](serviceId));
            setTourService(res.data);
        } catch (ex) {
            console.error("Lỗi khi tải chi tiết dịch vụ tour:", ex);
        } finally {
            setLoading(false);
        }
    };


    const loadReviews = async () => {
        try {
            const coreServiceId = tourService?.services?.id;
            if (coreServiceId) {

                let res = await Api.get(endpoints['service-reviews'](coreServiceId));
                setReviews(res.data);
            }
        } catch (ex) {
            console.error("Lỗi khi fetch danh sách reviews của tour:", ex);
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
                type: "tour",
                quantity: 1,
                durationDays: service.durationDays
            }; 
        } 
        cookies.save("cart", cart);
        dispatch({
            type: "UPDATE"
        });
        alert("Đã thêm vé tour vào giỏ hàng thành công!");
    };
    

    useEffect(() => {
        if (serviceId) {
            loadTourDetail();
        }
    }, [serviceId]);


    useEffect(() => {
        if (tourService) {
            loadReviews();
        }
    }, [tourService]);


    const handlePostReview = async (comment, rating) => {
        try {
            const coreServiceId = tourService?.services?.id;
            if (!coreServiceId) {
                alert("Không tìm thấy mã dịch vụ!");
                return;
            }

            let res = await authApis().post(
                endpoints['customer-create-review'](coreServiceId), 
                {
                    comment: comment,
                    rating: String(rating)
                }
            );

            alert("Đánh giá tour thành công!");
            setReviews([res.data, ...reviews]);
        } catch (ex) {
            console.error("Lỗi chi tiết khi gửi review tour:", ex);
            if (ex.response && ex.response.data) {
                alert(`Lỗi: ${ex.response.data.message || "Hệ thống từ chối quyền đánh giá!"}`);
            } else {
                alert("Đã xảy ra lỗi khi gửi đánh giá. Vui lòng kiểm tra lại quyền đăng nhập!");
            }
        }
    };


    const handleViewProvider = () => {
        const providerId = tourService.services?.providerId?.id;
        if (providerId) {
            nav(`/providers/${providerId}`);
        }
    };


    const handleChatProvider = async () => {
        if (user === null) {
            nav(`/login?next=/tour-services/${serviceId}`);
            return;
        }
        
        const providerUserId = tourService.services?.providerId?.users?.id;
        if (providerUserId) {
            let conversation = await authApis().post(endpoints["conversation-create"](providerUserId));
            nav("/conversations", { state: { conversationId: conversation.data.id } });
        }
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString("vi-VN");
    };

    const [, compareDispatch] = useContext(MyCompareContext);

    const handleAddCompare = () => {
        if (!tourService || !tourService.services) return; 
        const servicePayload = {
            id: tourService.id,
            name: tourService.services.name,
            description: [
                `Điểm đến: ${tourService.services.destination}`,
                `Thời gian khởi hành: ${formatDate(tourService.departureTime)}`,
                `Thời lượng tour: ${tourService.durationDays} ngày`,
            ].join("<br/>"), 
            price: tourService.services.price,
            image: tourService.services.imgUrl,
            typeService: "tour-services"
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
            {tourService && (
                <>
                    <div style={ServiceDetailStyle.titleBox} className=" m-4 d-flex justify-content-between align-items-center">
                        <h2 className="text-dark font-weight-bold">
                            {tourService.services?.name}
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
                                <DisplayImage src={tourService.services?.imgUrl} />
                            </div>

                            <div style={ServiceDetailStyle.infoCard} className="d-flex justify-content-between my-4 py-4">
                                <div className="d-flex align-items-center">
                                    <Image style={ServiceDetailStyle.providerAvatar} alt="Provider Avatar"
                                        src={tourService.services?.providerId?.users?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                    />
                                    <div className="ms-3">
                                        <h6 className="m-0 font-weight-bold text-primary">
                                            {tourService.services?.providerId?.businessName}
                                        </h6>
                                        <p className="m-0 text-muted small mt-1">
                                            Địa chỉ: {tourService.services?.providerId?.address}
                                        </p>
                                        <p className="m-0 text-muted small">
                                            Số điện thoại: {tourService.services?.providerId?.users?.phone}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="d-flex flex-column gap-2">
                                    <Button variant="primary" size="sm" 
                                        className="font-weight-bold btn-sm"
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
                                        <span className="text-muted d-block small">Giá từ</span>
                                        <h3 style={ServiceDetailStyle.priceText}>
                                            {tourService.services?.price?.toLocaleString()} VNĐ
                                        </h3>
                                        <small className="text-secondary">
                                            Còn trống: {tourService.services?.availableSlots} / {tourService.services?.slots} chỗ
                                        </small>
                                    </div>
                                    {(user === null || user?.users?.role !== "ROLE_PROVIDER") && (
                                        <Button variant="danger" size="lg" 
                                            className="px-4 font-weight-bold mt-2" 
                                            onClick={() => order(tourService)}
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
                                    
                                    <ul className="list-unstyled ps-1 mb-4">
                                        <li className="mb-2">
                                            <strong>Điểm đến: </strong> 
                                            <span className="text-secondary">{tourService.services?.destination}</span>
                                        </li>
                                        <li className="mb-2">
                                            <strong>Thời lượng tour: </strong> 
                                            <span className="text-secondary">{tourService.durationDays} ngày</span>
                                        </li>
                                        <li className="mb-2">
                                            <strong>Mô tả: </strong>
                                            <p style={ServiceDetailStyle.descriptionText} className="mt-1">
                                                {tourService.services?.description}
                                            </p>
                                        </li>
                                    </ul>
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

export default TourServiceDetail;