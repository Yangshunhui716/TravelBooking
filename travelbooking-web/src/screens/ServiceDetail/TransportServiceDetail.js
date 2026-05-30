import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DisplayImage from "../../components/DisplayImage";
import MySpinner from "../../components/MySpinner";
import Api, { endpoints } from "../../configs/Api";
import { MyUserContext } from "../../configs/Context";
import styles from "./ServiceDetailStyle"; // Sử dụng chung style hệ thống
import ReviewSection from "../../components/ReviewSection";

const TransportServiceDetail = () => {
    const { serviceId } = useParams();
    const [transportService, setTransportService] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useContext(MyUserContext);
    const nav = useNavigate();

    // Định dạng hiển thị ngày/giờ khởi hành và ngày đến
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

    // VÒNG ĐỜI TUẦN TỰ: Tải thông tin vận chuyển và đánh giá tương ứng
    useEffect(() => {
        const fetchData = async () => {
            if (!serviceId) return;
            try {
                setLoading(true);
                
                // 1. Tải chi tiết dịch vụ vận chuyển
                let resDetail = await Api.get(endpoints['transport-service-detail'](serviceId));
                setTransportService(resDetail.data);

                // 2. Tải danh sách đánh giá dựa trên serviceId
                let resReviews = await Api.get(endpoints['service-reviews'](serviceId));
                setReviews(resReviews.data);
            } catch (ex) {
                console.error("Lỗi khi tải dữ liệu chi tiết vận chuyển:", ex);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [serviceId]);

    // Xử lý khi nhấn nút Đặt vé
    const handleBooking = () => {
        if (user === null) {
            nav(`/login?next=/transport-services/${serviceId}`);
        } else {
            nav(`/customer/checkout?serviceId=${serviceId}&type=TRANSPORT`);
        }
    };

    // Xem thông tin nhà cung cấp (Nhà xe / Hãng xe)
    const handleViewProvider = () => {
        const providerId = transportService?.services?.providerId?.id;
        if (providerId) nav(`/providers/${providerId}`);
    };

    // Kích hoạt chat trực tiếp với nhà cung cấp
    const handleChatProvider = () => {
        if (user === null) {
            nav(`/login?next=/transport-services/${serviceId}`);
            return;
        }
        const providerUserId = transportService?.services?.providerId?.users?.id;
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
            {transportService && (
                <>
                    {/* KHUNG TRÊN CÙNG: Tên dịch vụ vận chuyển */}
                    <Row className="mb-4">
                        <Col>
                            <div style={styles.titleBox}>
                                <h2 className="m-0 text-dark font-weight-bold">
                                    {transportService.services?.name}
                                </h2>
                            </div>
                        </Col>
                    </Row>

                    {/* PHẦN THÂN: Chia 2 cột Trái - Phải */}
                    <Row>
                        {/* CỘT TRÁI: Hình ảnh phương tiện */}
                        <Col md={5} xs={12} className="mb-4 d-flex align-items-center justify-content-center">
                            <div style={{ ...styles.imageWrapper, width: "100%" }}>
                                <DisplayImage src={transportService.services?.imgUrl} />
                            </div>
                        </Col>

                        {/* CỘT PHẢI: Giá vé, Đối tác và Thông tin hành trình */}
                        <Col md={7} xs={12}>
                            <div style={styles.infoCard}>
                                
                                {/* 1. Khung Giá vé & Nút Đặt vé */}
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
                                    <Button variant="danger" size="lg" className="px-4 font-weight-bold" onClick={handleBooking}>
                                        Đặt vé
                                    </Button>
                                </div>

                                <hr />

                                {/* 2. Khung Thông tin Đối tác (Nhà Xe) */}
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
                                        <Button variant="outline-primary" size="sm" className="font-weight-bold" onClick={handleViewProvider}>
                                            Xem chi tiết
                                        </Button>
                                        <Button variant="outline-success" size="sm" className="font-weight-bold" onClick={handleChatProvider}>
                                            Chat ngay
                                        </Button>
                                    </div>
                                </div>

                                <hr />

                                {/* 3. Khung Thông tin chi tiết chuyến đi (Chia thành 2 cột nhỏ gọn) */}
                                <div className="mt-3">
                                    <h5 className="font-weight-bold text-dark mb-3">Thông tin hành trình</h5>
                                    <Row>
                                        {/* Cột thông tin trái */}
                                        <Col sm={6} xs={12}>
                                            <ul className="list-unstyled ps-1">
                                                <li className="mb-2">
                                                    <strong>Loại phương tiện: </strong> 
                                                    <span className="text-secondary">{transportService.transportType}</span>
                                                </li>
                                                <li className="mb-2">
                                                    <strong>Tuyến đường: </strong> 
                                                    <span className="text-secondary d-block">
                                                        {transportService.departure} &rarr; {transportService.services?.destination}
                                                    </span>
                                                    <small className="text-muted d-block mt-1">({transportService.loactionDetail})</small>
                                                </li>
                                            </ul>
                                        </Col>

                                        {/* Cột thông tin phải */}
                                        <Col sm={6} xs={12}>
                                            <ul className="list-unstyled ps-1">
                                                <li className="mb-2">
                                                    <strong>Loại vé: </strong> 
                                                    <span className="text-secondary">{transportService.ticketType}</span>
                                                </li>
                                                <li className="mb-2">
                                                    <strong>Khởi hành: </strong> 
                                                    <span className="text-secondary d-block">{formatDateTime(transportService.departureTime)}</span>
                                                </li>
                                                <li className="mb-2">
                                                    <strong>Dự kiến đến: </strong> 
                                                    <span className="text-secondary d-block">{formatDateTime(transportService.endTime)}</span>
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>

                                    {/* Phần mô tả mở rộng bên dưới */}
                                    <div className="mt-3 ps-1">
                                        <strong>Mô tả dịch vụ: </strong>
                                        <p style={styles.descriptionText} className="mt-1">
                                            {transportService.services?.description}
                                        </p>
                                    </div>
                                </div>

                                <hr />
                                
                                {/* 4. Khung nhận xét & đánh giá */}
                                <ReviewSection reviews={reviews} />

                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default TransportServiceDetail;