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
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useContext(MyUserContext);
    const nav = useNavigate();
    
    // State quản lý việc đặt phòng
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [roomCount, setRoomCount] = useState(1);

    // Khởi tạo mặc định: Nhận phòng hôm nay, Trả phòng ngày mai
    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        setCheckInDate(today.toISOString().split("T")[0]);
        setCheckOutDate(tomorrow.toISOString().split("T")[0]);
    }, []);

    // VÒNG ĐỜI TUẦN TỰ: Tự động tải thông tin khách sạn và đánh giá khi ID thay đổi
    useEffect(() => {
        const fetchData = async () => {
            if (!serviceId) return;
            try {
                setLoading(true);
                
                // 1. Tải chi tiết dịch vụ khách sạn
                let resDetail = await Api.get(endpoints['hotel-room-service-detail'](serviceId));
                setHotelService(resDetail.data);

                // 2. Tải danh sách đánh giá
                let resReviews = await Api.get(endpoints['service-reviews'](serviceId));
                setReviews(resReviews.data);
            } catch (ex) {
                console.error("Lỗi khi tải dữ liệu chi tiết khách sạn:", ex);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [serviceId]);

    // Xử lý khi nhấn nút Đặt phòng
    const handleBooking = () => {
        if (user === null) {
            nav(`/login?next=/hotel-room-services/${serviceId}`);
        } else {
            nav(`/customer/checkout?serviceId=${serviceId}&type=HOTEL&checkIn=${checkInDate}&checkOut=${checkOutDate}&rooms=${roomCount}`);
        }
    };

    // Xem thông tin chi tiết nhà cung cấp (Đối tác)
    const handleViewProvider = () => {
        const providerId = hotelService?.services?.providerId?.id;
        if (providerId) nav(`/providers/${providerId}`);
    };

    // Chat trực tiếp với nhà cung cấp
    const handleChatProvider = () => {
        if (user === null) {
            nav(`/login?next=/hotel-room-services/${serviceId}`);
            return;
        }
        const providerUserId = hotelService?.services?.providerId?.users?.id;
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
                    {/* KHUNG TRÊN CÙNG: Tên phòng / Tên dịch vụ */}
                    <Row className="mb-4">
                        <Col>
                            <div style={styles.titleBox}>
                                <h2 className="m-0 text-dark font-weight-bold">
                                    {hotelService.services?.name}
                                </h2>
                            </div>
                        </Col>
                    </Row>

                    {/* PHẦN THÂN: Chia 2 cột Trái - Phải */}
                    <Row>
                        {/* CỘT TRÁI: Hình ảnh không gian phòng */}
                        <Col md={5} xs={12} className="mb-4 d-flex align-items-center justify-content-center">
                            <div style={{ ...styles.imageWrapper, width: "100%" }}>
                                <DisplayImage src={hotelService.services?.imgUrl} />
                            </div>
                        </Col>

                        {/* CỘT PHẢI: Giá cả, Form chọn lịch và Thông tin khách sạn */}
                        <Col md={7} xs={12}>
                            <div style={styles.infoCard}>
                                
                                {/* 1. Khung Giá & Nút Đặt phòng */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <span className="text-muted d-block small">Giá từ</span>
                                        <h3 style={styles.priceText} className="m-0">
                                            {hotelService.services?.price?.toLocaleString()} VNĐ 
                                            <small className="fs-6 text-muted fw-normal"> / đêm</small>
                                        </h3>
                                    </div>
                                    <Button variant="danger" size="lg" className="px-4 font-weight-bold" onClick={handleBooking}>
                                        Đặt ngay
                                    </Button>
                                </div>

                                {/* Form chọn Ngày và Số lượng phòng */}
                                <Row className="g-2 mb-3 p-3 bg-light rounded-3 align-items-center mx-0">
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
                                            <div className="d-flex align-items-center gap-2">
                                                <Form.Select 
                                                    size="sm"
                                                    value={roomCount}
                                                    onChange={(e) => setRoomCount(Number(e.target.value))}
                                                    style={{ width: "80px" }}
                                                >
                                                    {[...Array(hotelService.services?.availableSlots || 1).keys()].map((i) => (
                                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </Form.Select>
                                                <small className="text-muted" style={{ fontSize: '11px' }}>
                                                    (Còn {hotelService.services?.availableSlots} phòng trống)
                                                </small>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr />

                                {/* 2. Khung Thông tin Đối tác / Chủ khách sạn */}
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
                                        <Button variant="outline-primary" size="sm" className="font-weight-bold" onClick={handleViewProvider}>
                                            Xem chi tiết
                                        </Button>
                                        <Button variant="outline-success" size="sm" className="font-weight-bold" onClick={handleChatProvider}>
                                            Chat ngay
                                        </Button>
                                    </div>
                                </div>

                                <hr />

                                {/* 3. Khung Thông tin chi tiết dịch vụ phòng */}
                                <div className="mt-3">
                                    <h5 className="font-weight-bold text-dark mb-3">Thông tin chi tiết phòng</h5>
                                    
                                    <ul className="list-unstyled ps-1">
                                        <li className="mb-2">
                                            <strong>Tên khách sạn: </strong> 
                                            <span className="text-secondary">{hotelService.hotelName}</span>
                                        </li>
                                        <li className="mb-2">
                                            <strong>Địa chỉ: </strong> 
                                            <span className="text-secondary">{hotelService.address}</span>
                                        </li>
                                        <li className="mb-2">
                                            <strong>Mô tả tiện nghi: </strong>
                                            <p style={styles.descriptionText} className="mt-1">
                                                {hotelService.services?.description}
                                            </p>
                                        </li>
                                    </ul>
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