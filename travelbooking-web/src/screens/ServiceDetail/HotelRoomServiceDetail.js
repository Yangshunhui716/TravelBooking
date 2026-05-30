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
<<<<<<< HEAD
    const [loading, setLoading] = useState(false);
    const [user] = useContext(MyUserContext);
    const nav = useNavigate();
    const [reviews, setReviews] = useState([]);
    
    // State chọn phòng đặt lịch
=======
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useContext(MyUserContext);
    const nav = useNavigate();
    
    // State quản lý việc đặt phòng
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [roomCount, setRoomCount] = useState(1);

<<<<<<< HEAD
    // Đặt mặc định ngày nhận phòng (Hôm nay) & ngày trả phòng (Mai)
=======
    // Khởi tạo mặc định: Nhận phòng hôm nay, Trả phòng ngày mai
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        setCheckInDate(today.toISOString().split("T")[0]);
        setCheckOutDate(tomorrow.toISOString().split("T")[0]);
    }, []);

<<<<<<< HEAD
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
=======
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
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
    const handleBooking = () => {
        if (user === null) {
            nav(`/login?next=/hotel-room-services/${serviceId}`);
        } else {
<<<<<<< HEAD
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

=======
            nav(`/customer/checkout?serviceId=${serviceId}&type=HOTEL&checkIn=${checkInDate}&checkOut=${checkOutDate}&rooms=${roomCount}`);
        }
    };

    // Xem thông tin chi tiết nhà cung cấp (Đối tác)
    const handleViewProvider = () => {
        const providerId = hotelService?.services?.providerId?.id;
        if (providerId) nav(`/providers/${providerId}`);
    };

    // Chat trực tiếp với nhà cung cấp
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
    const handleChatProvider = () => {
        if (user === null) {
            nav(`/login?next=/hotel-room-services/${serviceId}`);
            return;
        }
<<<<<<< HEAD
        const providerUserId = hotelService.services?.providerId?.users?.id;
=======
        const providerUserId = hotelService?.services?.providerId?.users?.id;
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
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
<<<<<<< HEAD
                    {/* TIÊU ĐỀ */}
=======
                    {/* KHUNG TRÊN CÙNG: Tên phòng / Tên dịch vụ */}
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                    <Row className="mb-4">
                        <Col>
                            <div style={styles.titleBox}>
                                <h2 className="m-0 text-dark font-weight-bold">
                                    {hotelService.services?.name}
                                </h2>
                            </div>
                        </Col>
                    </Row>

<<<<<<< HEAD
                    {/* THÂN CHI TIẾT DỊCH VỤ */}
                    <Row>
                        {/* CỘT TRÁI: Hình ảnh */}
=======
                    {/* PHẦN THÂN: Chia 2 cột Trái - Phải */}
                    <Row>
                        {/* CỘT TRÁI: Hình ảnh không gian phòng */}
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                        <Col md={5} xs={12} className="mb-4 d-flex align-items-center justify-content-center">
                            <div style={{ ...styles.imageWrapper, width: "100%" }}>
                                <DisplayImage src={hotelService.services?.imgUrl} />
                            </div>
                        </Col>

<<<<<<< HEAD
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
=======
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
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                                        Đặt ngay
                                    </Button>
                                </div>

<<<<<<< HEAD
                                {/* Form chọn Ngày & Số lượng phòng */}
                                <Row className="g-2 mb-3 p-2 bg-light rounded-3 align-items-center">
=======
                                {/* Form chọn Ngày và Số lượng phòng */}
                                <Row className="g-2 mb-3 p-3 bg-light rounded-3 align-items-center mx-0">
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
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
<<<<<<< HEAD
                                            <div className="d-flex align-items-center justify-content-between">
=======
                                            <div className="d-flex align-items-center gap-2">
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                                                <Form.Select 
                                                    size="sm"
                                                    value={roomCount}
                                                    onChange={(e) => setRoomCount(Number(e.target.value))}
<<<<<<< HEAD
                                                    style={{ width: "70%" }}
                                                >
                                                    {[...Array(hotelService.services?.availableSlots || 1).keys()].map((i) => (
                                                        <option key={i + 1} value={i + 1}>{i + 1} phòng</option>
                                                    ))}
                                                </Form.Select>
                                                <small className="text-muted text-end w-100 ps-1" style={{ fontSize: '11px' }}>
=======
                                                    style={{ width: "80px" }}
                                                >
                                                    {[...Array(hotelService.services?.availableSlots || 1).keys()].map((i) => (
                                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </Form.Select>
                                                <small className="text-muted" style={{ fontSize: '11px' }}>
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                                                    (Còn {hotelService.services?.availableSlots} phòng trống)
                                                </small>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr />

<<<<<<< HEAD
                                {/* 2. Khung Đối tác quản lý */}
=======
                                {/* 2. Khung Thông tin Đối tác / Chủ khách sạn */}
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
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
<<<<<<< HEAD
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
=======
                                        <Button variant="outline-primary" size="sm" className="font-weight-bold" onClick={handleViewProvider}>
                                            Xem chi tiết
                                        </Button>
                                        <Button variant="outline-success" size="sm" className="font-weight-bold" onClick={handleChatProvider}>
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                                            Chat ngay
                                        </Button>
                                    </div>
                                </div>

                                <hr />

<<<<<<< HEAD
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
                                
=======
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
                                 
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
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