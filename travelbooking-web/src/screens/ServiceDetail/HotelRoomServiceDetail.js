import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DisplayImage from "../../components/DisplayImage";
import MySpinner from "../../components/MySpinner";
import Api, { endpoints } from "../../configs/Api";
import { MyUserContext } from "../../configs/Context";
import styles from "./ServiceDetailStyle"; 
import ReviewSection from "../../components/ReviewSection";

const HotelRoomServiceDetail = () => {
    const { serviceId } = useParams();
    const [hotelService, setHotelService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user] = useContext(MyUserContext);
    const nav = useNavigate();
    const [reviews, setReviews] = useState([]);
    
    // State chọn phòng đặt lịch
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [roomCount, setRoomCount] = useState(1);

    // Đặt mặc định ngày nhận phòng (Hôm nay) & ngày trả phòng (Mai)
    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        setCheckInDate(today.toISOString().split("T")[0]);
        setCheckOutDate(tomorrow.toISOString().split("T")[0]);
    }, []);

    // 1. API lấy dữ liệu chi tiết phòng khách sạn
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

    // 2. API lấy danh sách bình luận dựa trên ID dịch vụ cốt lõi
    const loadReviews = async () => {
        try {
            const coreServiceId = hotelService?.services?.id;
            if (coreServiceId) {
                let res = await Api.get(endpoints['service-reviews'](coreServiceId));
                setReviews(res.data);
            }
        } catch (ex) {
            console.error("Lỗi khi fetch danh sách reviews:", ex);
        }
    };

    // VÒNG ĐỜI 1: Chỉ chạy duy nhất khi id trên đường dẫn URL thay đổi để lấy thông tin phòng
    useEffect(() => {
        if (serviceId) {
            loadHotelDetail();
        }
    }, [serviceId]);

    // VÒNG ĐỜI 2: Chỉ chạy khi thông tin phòng đã tải xong xuôi để lấy danh sách review
    useEffect(() => {
        if (hotelService) {
            loadReviews();
        }
    }, [hotelService]);

    // Xử lý logic nút Đặt phòng
    const handleBooking = () => {
        if (user === null) {
            nav(`/login?next=/hotel-room-services/${serviceId}`);
        } else {
            nav(
                `/customer/checkout?serviceId=${serviceId}&type=HOTEL&checkIn=${checkInDate}&checkOut=${checkOutDate}&rooms=${roomCount}`
            );
        }
    };

    // Điều hướng nhà cung cấp đối tác
    const handleViewProvider = () => {
        const providerId = hotelService.services?.providerId?.id;
        if (providerId) nav(`/providers/${providerId}`);
    };

    const handleChatProvider = () => {
        if (user === null) {
            nav(`/login?next=/hotel-room-services/${serviceId}`);
            return;
        }
        const providerUserId = hotelService.services?.providerId?.users?.id;
        if (providerUserId) nav(`/chat?withUser=${providerUserId}`);
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
                    {/* TIÊU ĐỀ */}
                    <Row className="mb-4">
                        <Col>
                            <div style={styles.titleBox}>
                                <h2 className="m-0 text-dark font-weight-bold">
                                    {hotelService.services?.name}
                                </h2>
                            </div>
                        </Col>
                    </Row>

                    {/* THÂN CHI TIẾT DỊCH VỤ */}
                    <Row>
                        {/* CỘT TRÁI: Hình ảnh */}
                        <Col md={5} xs={12} className="mb-4 d-flex align-items-center justify-content-center">
                            <div style={{ ...styles.imageWrapper, width: "100%" }}>
                                <DisplayImage src={hotelService.services?.imgUrl} />
                            </div>
                        </Col>

                        {/* CỘT PHẢI: Khung tương tác đặt và thông tin chi tiết */}
                        <Col md={7} xs={12}>
                            <div style={styles.infoCard}>
                                
                                {/* 1. Khung Giá & Booking */}
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <span className="text-muted d-block small">Giá từ</span>
                                        <h3 style={styles.priceText}>
                                            {hotelService.services?.price?.toLocaleString()} VNĐ <small className="fs-6 text-muted fw-normal">/ đêm</small>
                                        </h3>
                                    </div>
                                    <Button 
                                        variant="danger" 
                                        size="lg" 
                                        className="px-4 font-weight-bold mt-2" 
                                        onClick={handleBooking}
                                    >
                                        Đặt ngay
                                    </Button>
                                </div>

                                {/* Form chọn Ngày & Số lượng phòng */}
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

                                {/* 2. Khung Đối tác quản lý */}
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

                                {/* 3. Khung chi tiết dịch vụ */}
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
                                
                                {/* 4. Tích hợp danh sách đánh giá */}
                                <ReviewSection reviews={reviews} />

                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default HotelRoomServiceDetail;