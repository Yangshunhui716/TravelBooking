import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DisplayImage from "../../components/DisplayImage";
import MySpinner from "../../components/MySpinner";
import Api, { endpoints } from "../../configs/Api";
import { MyUserContext, MyCartContext } from "../../configs/Context";
import styles from "./ServiceDetailStyle"; 
import ReviewSection from "../../components/ReviewSection";
import { authApis } from "../../configs/Api";
import cookies from "react-cookies";

const HotelRoomServiceDetail = () => {
    const { serviceId } = useParams();
    const [hotelService, setHotelService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user] = useContext(MyUserContext);
    const [, dispatch] = useContext(MyCartContext);
    const nav = useNavigate();
    const [reviews, setReviews] = useState([]);
    

    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [roomCount, setRoomCount] = useState(1);
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

    const loadHotelDetail = async () => {
        try {
            setLoading(true);
            let res = await Api.get(endpoints['hotel-room-service-detail'](serviceId));
            setHotelService(res.data);
        } catch (ex) {
            console.error("Lỗi khi tải chi tiết dịch vụ khách sạn:", ex);
        } finally {
            setLoading(false);
        }
    };


    const loadReviews = async () => {
        try {
            const serviceId = hotelService?.services?.id;
            if (serviceId) {
                let res = await Api.get(endpoints['service-reviews'](serviceId));
                setReviews(res.data);
            }
        } catch (ex) {
            console.error("Lỗi khi fetch danh sách reviews:", ex);
        }
    };
    const order = (service) => {
        if (!checkInDate || !checkOutDate) {
            alert("Vui lòng chọn đầy đủ ngày nhận và trả phòng!");
            return;
        }
        const date1 = new Date(checkInDate);
        const date2 = new Date(checkOutDate);
        if (date2 <= date1) {
            alert("Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày!");
            return;
        }

        const differenceInTime = date2.getTime() - date1.getTime();
        const calculatedNights = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        const formatDateOnly = (dateObj) => {
            return dateObj.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
        };
        let cart = cookies.load("cart") || null;
        if (cart === null) {
            cart = {};
        }
        cart[service.services?.id] = {
            id: service.services?.id,
            name: service.services?.name,
            price: service.services?.price, 
            imgUrl: service.services?.imgUrl,
            checkIn: formatDateOnly(date1), 
            checkOut: formatDateOnly(date2), 
            nights: calculatedNights, 
            type: "hotel",
            quantity: roomCount, 
        }; 

        cookies.save("cart", cart);
        dispatch({
            type: "UPDATE"
        });
        alert("Đã thêm vào giỏ hàng thành công!");
    };
    
    useEffect(() => {
        if (serviceId) {
            loadHotelDetail();
        }
    }, [serviceId]);

    useEffect(() => {
        if (hotelService) {
            loadReviews();
        }
    }, [hotelService]);

    const handleViewProvider = () => {
        const providerId = hotelService.services?.providerId?.id;
        if (providerId) nav(`/providers/${providerId}`);
    };

    const handleChatProvider = async () => {
        if (user === null) {
            nav(`/login?next=/hotel-room-services/${serviceId}`);
            return;
        }
        const providerUserId = hotelService.services?.providerId?.users?.id;
        if (providerUserId) {
            let conversation = await authApis().post(endpoints["conversation-create"](providerUserId));
            nav("/conversations", { state: { conversationId: conversation.data.id } });
        }
    };

    const handlePostReview = async (comment, rating) => {
        try {
            const serviceId = hotelService?.services?.id;
            if (!serviceId) {
                alert("Không tìm thấy thông tin dịch vụ để đánh giá!");
                return;
            }

            let res = await authApis().post(
                endpoints['customer-create-review'](serviceId), 
                {
                    comment: comment,
                    rating: String(rating)
                }
            );

            alert("Đánh giá thành công!");
            setReviews([res.data, ...reviews]); 
        } catch (ex) {
            console.error("Lỗi chi tiết từ hệ thống:", ex);

            if (ex.response && ex.response.data) {
                alert(`Lỗi: ${ex.response.data.message || "Hệ thống từ chối quyền đánh giá!"}`);
            } else {
                alert("Đã xảy ra lỗi khi kết nối hoặc gửi đánh giá lên Server.");
            }
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
            {hotelService && (
                <>
                    <Row className="mb-4">
                        <Col>
                            <div style={styles.titleBox}>
                                <h2 className="m-0 text-dark font-weight-bold">
                                    {hotelService.services?.name}
                                </h2>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={5} xs={12} className="mb-4 d-flex align-items-center justify-content-center">
                            <div style={{ ...styles.imageWrapper, width: "100%" }}>
                                <DisplayImage src={hotelService.services?.imgUrl} />
                            </div>
                        </Col>

                        <Col md={7} xs={12}>
                            <div style={styles.infoCard}>
                                
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <span className="text-muted d-block small">Giá từ</span>
                                        <h3 style={styles.priceText}>
                                            {hotelService.services?.price?.toLocaleString()} VNĐ <small className="fs-6 text-muted fw-normal">/ đêm</small>
                                        </h3>
                                    </div>
                                    {(user === null || user?.users?.role !== "ROLE_PROVIDER") && (
                                        <Button 
                                            variant="danger" 
                                            size="lg" 
                                            className="px-4 font-weight-bold mt-2" 
                                            onClick={() => order(hotelService)}
                                        >
                                            Đặt
                                        </Button>
                                    )}
                                </div>

                                <Row className="g-2 mb-3 p-2 bg-light rounded-3 align-items-center">
                                    <Col sm={4} xs={6}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-secondary mb-1">Ngày nhận phòng</Form.Label>
                                            <Form.Control 
                                                type="date" 
                                                size="sm"
                                                value={checkInDate}
                                                onChange={(e) => setCheckInDate(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={4} xs={6}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-secondary mb-1">Ngày trả phòng</Form.Label>
                                            <Form.Control 
                                                type="date" 
                                                size="sm"
                                                value={checkOutDate}
                                                onChange={(e) => setCheckOutDate(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={4} xs={12}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-secondary mb-1">Số lượng phòng</Form.Label>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <Form.Select 
                                                    size="sm"
                                                    value={roomCount}
                                                    onChange={(e) => setRoomCount(Number(e.target.value))}
                                                    style={{ width: "70%" }}
                                                >
                                                    {[...Array(hotelService.services?.availableSlots || 1).keys()].map((i) => (
                                                        <option key={i + 1} value={i + 1}>{i + 1} phòng</option>
                                                    ))}
                                                </Form.Select>
                                                <small className="text-muted text-end w-100 ps-1" style={{ fontSize: '11px' }}>
                                                    (Còn {hotelService.services?.availableSlots} phòng trống)
                                                </small>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center my-3 py-2">
                                    <div className="d-flex align-items-center">
                                        <Image 
                                            src={hotelService.services?.providerId?.users?.avatar || "https://via.placeholder.com/50"} 
                                            style={styles.providerAvatar} 
                                            alt="Provider Avatar"
                                        />
                                        <div className="ms-3">
                                            <h6 className="m-0 font-weight-bold text-primary">
                                                {hotelService.services?.providerId?.businessName}
                                            </h6>
                                            <p className="m-0 text-muted small mt-1">
                                                Trụ sở: {hotelService.services?.providerId?.address}
                                            </p>
                                            <p className="m-0 text-muted small">
                                                Liên hệ: {hotelService.services?.providerId?.users?.phone}
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
                                    
                                    <div className="ps-1 mb-2">
                                        <strong>Tên khách sạn: </strong>
                                        <span className="text-secondary">{hotelService.hotelName}</span>
                                    </div>
                                    
                                    <div className="ps-1 mb-3">
                                        <strong>Địa chỉ: </strong>
                                        <span className="text-secondary">{hotelService.address}</span>
                                    </div>

                                    <div className="ps-1">
                                        <strong>Mô tả phòng ốc: </strong>
                                        <p style={styles.descriptionText} className="mt-1">
                                            {hotelService.services?.description}
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

export default HotelRoomServiceDetail;