import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DisplayImage from "../../components/DisplayImage";
import MySpinner from "../../components/MySpinner";
import Api, { authApis, endpoints } from "../../configs/Api"; // Import thêm authApis để xử lý Token bảo mật
import { MyUserContext, MyCartContext } from "../../configs/Context";
import styles from "./ServiceDetailStyle"; // Import style dùng chung
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
    // 1. API lấy dữ liệu chi tiết Tour từ backend
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

    // 2. API lấy danh sách bình luận dựa trên ID dịch vụ cốt lõi (coreServiceId)
    const loadReviews = async () => {
        try {
            const coreServiceId = tourService?.services?.id;
            if (coreServiceId) {
                // Gọi endpoint công khai lấy tất cả review thuộc dịch vụ này
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
                departure_time: service.departureTime, // Đồng bộ key chính xác để Cart.js hiển thị được ngay
                type: "tour",
                quantity: 1
            }; 
        } 
        cookies.save("cart", cart);
        dispatch({
            type: "UPDATE"
        });
        alert("Đã thêm vé tour vào giỏ hàng thành công!");
    };
    

    // VÒNG ĐỜI 1: Tải chi tiết tour mỗi khi mã ID trên URL thay đổi
    useEffect(() => {
        if (serviceId) {
            loadTourDetail();
        }
    }, [serviceId]);

    // VÒNG ĐỜI 2: Chỉ fetch review ngay sau khi dữ liệu Tour đã đổ về thành công
    useEffect(() => {
        if (tourService) {
            loadReviews();
        }
    }, [tourService]);

    // Xử lý gửi đánh giá mới lên phân vùng bảo mật (/secure/) của Backend
    const handlePostReview = async (comment, rating) => {
        try {
            const coreServiceId = tourService?.services?.id;
            if (!coreServiceId) {
                alert("Không tìm thấy mã dịch vụ!");
                return;
            }

            // Dùng authApis() để đính kèm Token Bearer tự động từ cookie lên Header
            let res = await authApis().post(
                endpoints['customer-create-review'](coreServiceId), 
                {
                    comment: comment,
                    rating: String(rating)
                }
            );

            alert("Đánh giá tour thành công!");
            setReviews([res.data, ...reviews]); // Chèn bình luận mới nhất lên đầu danh sách hiển thị
        } catch (ex) {
            console.error("Lỗi chi tiết khi gửi review tour:", ex);
            if (ex.response && ex.response.data) {
                alert(`Lỗi: ${ex.response.data.message || "Hệ thống từ chối quyền đánh giá!"}`);
            } else {
                alert("Đã xảy ra lỗi khi gửi đánh giá. Vui lòng kiểm tra lại quyền đăng nhập!");
            }
        }
    };


    // Xử lý xem chi tiết nhà cung cấp (Provider)
    const handleViewProvider = () => {
        const providerId = tourService.services?.providerId?.id;
        if (providerId) {
            nav(`/providers/${providerId}`);
        }
    };

    // Xử lý kích hoạt Chat với nhà cung cấp
    const handleChatProvider = () => {
        if (user === null) {
            nav(`/login?next=/tour-services/${serviceId}`);
            return;
        }
        
        const providerUserId = tourService.services?.providerId?.users?.id;
        if (providerUserId) {
            nav(`/chat?withUser=${providerUserId}`);
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
            {tourService && (
                <>
                    {/* KHUNG TRÊN CÙNG: Tên Tour */}
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
                                    {(user === null || user?.users?.role !== "ROLE_PROVIDER") && (
                                        <Button 
                                            variant="danger" 
                                            size="lg" 
                                            className="px-4 font-weight-bold mt-2" 
                                            onClick={() => order(tourService)}
                                        >
                                            Đặt
                                        </Button>
                                    )}
                                </div>

                                <hr />

                                {/* 2. Khung Thông tin Nhà Cung Cấp */}
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
                                                Số điện thoại: {tourService.services?.providerId?.users?.phone}
                                            </p>
                                        </div>
                                    </div>
                                    
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
                                            Chat ngay
                                        </Button>
                                    </div>
                                </div>

                                <hr />

                                {/* 3. Khung Thông tin chi tiết dịch vụ */}
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
                                            <p style={styles.descriptionText} className="mt-1">
                                                {tourService.services?.description}
                                            </p>
                                        </li>
                                    </ul>
                                </div>

                                <hr />

                                {/* 4. TÍCH HỢP HỆ THỐNG ĐÁNH GIÁ (Xổ xuống tự động khi viết xong) */}
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

export default TourServiceDetail;