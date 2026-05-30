import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DisplayImage from "../../components/DisplayImage";
import MySpinner from "../../components/MySpinner";
import Api, { endpoints } from "../../configs/Api";
import { MyUserContext } from "../../configs/Context";
<<<<<<< HEAD
import styles from "./ServiceDetailStyle"; // Import style dùng chung
import ReviewSection from "../../components/ReviewSection";
const TourServiceDetail = () => {
    const { serviceId } = useParams();
    const [tourService, setTourService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user] = useContext(MyUserContext);
    const nav = useNavigate();
    const [reviews, setReviews] = useState([]);

    // Gọi API lấy dữ liệu chi tiết Tour từ backend
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

    useEffect(() => {
        if (serviceId) {
            loadTourDetail();
        }
    }, [serviceId]);

    // Xử lý khi nhấn nút Đặt dịch vụ
    const handleBooking = () => {
        if (user === null) {
            // Lưu vị trí trang chi tiết để sau khi đăng nhập tự động quay lại đây
            nav(`/login?next=/tour-services/${serviceId}`);
        } else {
            // Điều hướng sang trang đặt tour/thanh toán tùy theo logic dự án của bạn
            nav(`/customer/checkout?serviceId=${serviceId}`);
        }
    };
    // Xử lý xem chi tiết nhà cung cấp (Provider)
    const handleViewProvider = () => {
        const providerId = tourService.services?.providerId?.id;
        if (providerId) {
            // Điều hướng đến trang thông tin nhà cung cấp (bạn thay đổi route theo dự án của mình)
            nav(`/providers/${providerId}`);
        }
    };

    // Xử lý kích hoạt Chat với nhà cung cấp
    const handleChatProvider = () => {
        if (user === null) {
            // Bắt buộc đăng nhập mới được chat
            nav(`/login?next=/tour-services/${serviceId}`);
            return;
        }
        
        const providerUserId = tourService.services?.providerId?.users?.id;
        if (providerUserId) {
            // Thường logic chat sẽ cần ID tài khoản người dùng của nhà cung cấp để mở phòng chat
            nav(`/chat?withUser=${providerUserId}`);
        }
    };
=======
import styles from "./ServiceDetailStyle"; 
import ReviewSection from "../../components/ReviewSection";

const TourServiceDetail = () => {
    const { serviceId } = useParams();
    const [tourService, setTourService] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useContext(MyUserContext);
    const nav = useNavigate();

    // VÒNG ĐỜI TUẦN TỰ: Tự động tải cả chi tiết tour và nhận xét tương ứng khi ID thay đổi
    useEffect(() => {
        const fetchData = async () => {
            if (!serviceId) return;
            try {
                setLoading(true);
                
                // 1. Tải thông tin chi tiết dịch vụ tour
                let resDetail = await Api.get(endpoints['tour-service-detail'](serviceId));
                setTourService(resDetail.data);

                // 2. Tải danh sách đánh giá của tour này
                let resReviews = await Api.get(endpoints['service-reviews'](serviceId));
                setReviews(resReviews.data);
            } catch (ex) {
                console.error("Lỗi khi tải dữ liệu chi tiết tour:", ex);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [serviceId]);

    // Xử lý khi nhấn nút Đặt tour
    const handleBooking = () => {
        if (user === null) {
            nav(`/login?next=/tour-services/${serviceId}`);
        } else {
            nav(`/customer/checkout?serviceId=${serviceId}`);
        }
    };

    // Xem thông tin chi tiết nhà cung cấp (Đối tác)
    const handleViewProvider = () => {
        const providerId = tourService?.services?.providerId?.id;
        if (providerId) nav(`/providers/${providerId}`);
    };

    // Chat trực tiếp với nhà cung cấp tour
    const handleChatProvider = () => {
        if (user === null) {
            nav(`/login?next=/tour-services/${serviceId}`);
            return;
        }
        const providerUserId = tourService?.services?.providerId?.users?.id;
        if (providerUserId) nav(`/chat?withUser=${providerUserId}`);
    };

>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
    if (loading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <MySpinner />
            </div>
        );
    }

    return (
        <Container className="mt-4 mb-5">
            {tourService && (
                <>
<<<<<<< HEAD
                    {/* KHUNG TRÊN CÙNG: Tên Tour */}
=======
                    {/* KHUNG TRÊN CÙNG: Tên Tour hành trình */}
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                    <Row className="mb-4">
                        <Col>
                            <div style={styles.titleBox}>
                                <h2 className="m-0 text-dark font-weight-bold">
                                    {tourService.services?.name}
                                </h2>
                            </div>
                        </Col>
                    </Row>

                    {/* PHẦN THÂN: Chia 2 cột Trái - Phải */}
                    <Row>
<<<<<<< HEAD
                        {/* CỘT TRÁI: Hình ảnh dịch vụ */}
                        <Col md={5} xs={12} className="mb-4">
                            <div style={styles.imageWrapper}>
                                <DisplayImage 
                                    src={tourService.services?.imgUrl} 
                                    className="img-fluid rounded" 
                                />
                            </div>
                        </Col>

                        {/* CỘT PHẢI: Giá cả, Nhà cung cấp, Thông tin chi tiết */}
                        <Col md={7} xs={12}>
                            <div style={styles.infoCard}>
                                
                                {/* 1. Khung Giá cả & Nút Đặt */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <span className="text-muted d-block small">Giá từ</span>
                                        <h3 style={styles.priceText}>
                                            {tourService.services?.price?.toLocaleString()} VNĐ
                                        </h3>
                                        <small className="text-secondary">
                                            Còn trống: {tourService.services?.availableSlots} / {tourService.services?.slots} chỗ
                                        </small>
                                    </div>
                                    <Button 
                                        variant="danger" 
                                        size="lg" 
                                        className="px-4 font-weight-bold" 
                                        onClick={handleBooking}
                                    >
                                        Đặt
=======
                        {/* CỘT TRÁI: Hình ảnh phong cảnh / điểm đến của tour */}
                        <Col md={5} xs={12} className="mb-4 d-flex align-items-center justify-content-center">
                            <div style={{ ...styles.imageWrapper, width: "100%" }}>
                                <DisplayImage src={tourService.services?.imgUrl} />
                            </div>
                        </Col>

                        {/* CỘT PHẢI: Giá cả, Nhà cung cấp và Thông tin lộ trình */}
                        <Col md={7} xs={12}>
                            <div style={styles.infoCard}>
                                
                                {/* 1. Khung Giá cả & Nút Đặt dịch vụ */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <span className="text-muted d-block small">Giá từ</span>
                                        <h3 style={styles.priceText} className="m-0">
                                            {tourService.services?.price?.toLocaleString()} VNĐ
                                        </h3>
                                        <small className="text-secondary d-block mt-1">
                                            Còn trống: {tourService.services?.availableSlots} / {tourService.services?.slots} chỗ
                                        </small>
                                    </div>
                                    <Button variant="danger" size="lg" className="px-4 font-weight-bold" onClick={handleBooking}>
                                        Đặt ngay
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                                    </Button>
                                </div>

                                <hr />
<<<<<<< HEAD

                                {/* 2. Khung Thông tin Nhà Cung Cấp */}
=======
                                
                                {/* 2. Khung Thông tin Đối tác / Công ty lữ hành */}
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                                <div className="d-flex justify-content-between align-items-center my-3 py-2">
                                    <div className="d-flex align-items-center">
                                        <Image 
                                            src={tourService.services?.providerId?.users?.avatar || "https://via.placeholder.com/50"} 
                                            style={styles.providerAvatar} 
                                            alt="Provider Avatar"
                                        />
                                        <div className="ms-3">
                                            <h6 className="m-0 font-weight-bold text-primary">
                                                {tourService.services?.providerId?.businessName}
                                            </h6>
                                            <p className="m-0 text-muted small mt-1">
                                                Địa chỉ: {tourService.services?.providerId?.address}
                                            </p>
                                            <p className="m-0 text-muted small">
<<<<<<< HEAD
                                                Số điện thoại: {tourService.services?.providerId?.users?.phone}
=======
                                                Liên hệ: {tourService.services?.providerId?.users?.phone}
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                                            </p>
                                        </div>
                                    </div>
                                    
<<<<<<< HEAD
                                    {/* Tách biệt hoàn toàn thành 2 nút gọi 2 logic khác nhau */}
                                    <div className="d-flex flex-column gap-2">
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm" 
                                            className="font-weight-bold btn-sm"
                                            onClick={handleViewProvider}
                                        >
                                            Xem chi tiết
                                        </Button>
                                        <Button 
                                            variant="outline-success" 
                                            size="sm" 
                                            className="font-weight-bold btn-sm"
                                            onClick={handleChatProvider}
                                        >
=======
                                    <div className="d-flex flex-column gap-2">
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
                                {/* 3. Khung Thông tin chi tiết dịch vụ */}
                                <div className="mt-3">
                                    <h5 className="font-weight-bold text-dark mb-3">
                                        Thông tin chi tiết dịch vụ
                                    </h5>
=======
                                {/* 3. Khung Thông tin hành trình chi tiết */}
                                <div className="mt-3">
                                    <h5 className="font-weight-bold text-dark mb-3">Thông tin chi tiết chuyến đi</h5>
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                                    
                                    <ul className="list-unstyled ps-1">
                                        <li className="mb-2">
                                            <strong>Điểm đến: </strong> 
                                            <span className="text-secondary">{tourService.services?.destination}</span>
                                        </li>
                                        <li className="mb-2">
                                            <strong>Thời lượng tour: </strong> 
                                            <span className="text-secondary">{tourService.durationDays} ngày</span>
                                        </li>
                                        <li className="mb-2">
<<<<<<< HEAD
                                            <strong>Mô tả: </strong>
=======
                                            <strong>Mô tả lộ trình: </strong>
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                                            <p style={styles.descriptionText} className="mt-1">
                                                {tourService.services?.description}
                                            </p>
                                        </li>
                                    </ul>
                                </div>
<<<<<<< HEAD
=======
                                 
                                <hr />
                                
                                {/* 4. Tích hợp danh sách đánh giá từ du khách */}
                                <ReviewSection reviews={reviews} />
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb

                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default TourServiceDetail;