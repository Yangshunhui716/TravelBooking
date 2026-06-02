import React, { useState } from "react";
import { Card, Image, Form, Button, Collapse, Alert } from "react-bootstrap";
import moment from "moment";
import "moment/locale/vi"; // Import ngôn ngữ tiếng Việt cho moment

// Cấu hình moment sử dụng tiếng Việt mặc định cho toàn bộ component này
moment.locale("vi");

const ReviewSection = ({ reviews = [], onAddReview, user }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5); // Mặc định là 5 sao khi mở form
    const [showReviews, setShowReviews] = useState(false);

    // Xử lý khi bấm nút "Gửi đánh giá"
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            alert("Vui lòng nhập nội dung đánh giá của bạn!");
            return;
        }

        if (onAddReview) {
            await onAddReview(comment, rating);
            setComment("");
            setRating(5); 
            setShowReviews(true); 
        }
    };

    // Hàm xử lý thời gian bằng moment
    const formatReviewDate = (timestamp) => {
        if (!timestamp) return "";
        
        // Cách 1: Hiển thị dạng "X phút trước", "Một ngày trước" (Khuyên dùng cho phần bình luận)
        return moment(timestamp).fromNow();

        // Cách 2: Nếu bạn vẫn muốn hiển thị ngày giờ cụ thể dạng "31/05/2026 11:30", hãy bỏ comment dòng dưới:
        // return moment(timestamp).format("DD/MM/YYYY HH:mm");
    };

    return (
        <div className="mt-4 pt-2">
            <h5 className="font-weight-bold text-dark mb-3">
                Đánh giá từ khách hàng ({reviews.length})
            </h5>

            {/* TRƯỜNG HỢP 1: Chưa đăng nhập */}
            {user === null ? (
                <Alert variant="warning" className="py-2 px-3">
                    Bạn cần đăng nhập để thực hiện đánh giá cho dịch vụ này.
                </Alert>
            ) : /* TRƯỜNG HỢP 2: Là Nhà cung cấp -> Chặn không cho bình luận */
            user?.users?.role === "ROLE_PROVIDER" ? (
                <Alert variant="danger" className="py-2 px-3">
                    Tài khoản Nhà cung cấp (Provider) không có quyền đánh giá dịch vụ.
                </Alert>
            ) : (
                /* TRƯỜNG HỢP 3: Khách hàng hợp lệ (ROLE_CUSTOMER) -> Hiện ô nhập đánh giá */
                <Card className="border-0 bg-white p-3 rounded-3 shadow-sm mb-4" style={{ border: "1px solid #eee" }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="m-0 me-3 small fw-bold text-secondary">
                                Mức độ hài lòng:
                            </Form.Label>
                            <Form.Select 
                                size="sm" 
                                value={rating} 
                                onChange={(e) => setRating(Number(e.target.value))}
                                style={{ width: "130px" }}
                            >
                                <option value={5}>5 sao (Rất tốt)</option>
                                <option value={4}>4 sao (Tốt)</option>
                                <option value={3}>3 sao (Bình thường)</option>
                                <option value={2}>2 sao (Kém)</option>
                                <option value={1}>1 sao (Rất kém)</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Chia sẻ trải nghiệm thực tế của bạn về dịch vụ này nhé..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                style={{ fontSize: "0.9rem", resize: "none" }}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button type="submit" variant="primary" size="sm" className="px-4 fw-bold">
                                Gửi đánh giá
                            </Button>
                        </div>
                    </Form>
                </Card>
            )}

            {/* --- NÚT BẤM XỔ XUỐNG DANH SÁCH ĐÁNH GIÁ --- */}
            <div className="d-grid gap-2 mb-3">
                <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    className="fw-bold d-flex justify-content-between align-items-center px-3"
                    onClick={() => setShowReviews(!showReviews)}
                    aria-controls="collapse-reviews-list"
                    aria-expanded={showReviews}
                >
                    <span>{showReviews ? "▲ Thu gọn danh sách" : "▼ Xem tất cả đánh giá"}</span>
                    <span className="badge bg-secondary text-white">{reviews.length}</span>
                </Button>
            </div>

            {/* --- DANH SÁCH REVIEW ĐƯỢC BỌC TRONG COLLAPSE ĐỂ XỔ XUỐNG --- */}
            <Collapse in={showReviews}>
                <div id="collapse-reviews-list">
                    {reviews.length === 0 ? (
                        <p className="text-muted small ps-1">Chưa có đánh giá nào cho dịch vụ này.</p>
                    ) : (
                        <div className="d-flex flex-column gap-3 pt-2">
                            {reviews.map((review) => (
                                <Card key={review.id} className="border-0 bg-light p-3 rounded-3 shadow-sm">
                                    <div className="d-flex align-items-start">
                                        <Image
                                            src={review.customerId?.users?.avatar || "https://via.placeholder.com/40"}
                                            roundedCircle
                                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                            alt="User Avatar"
                                        />
                                        
                                        <div className="ms-3 flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="m-0 font-weight-bold text-dark">
                                                    {review.customerId?.fullname}
                                                </h6>
                                                <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                                                    {formatReviewDate(review.createdAt)}
                                                </small>
                                            </div>
                                            
                                            <div className="my-1">
                                                <span className="badge bg-warning text-dark fw-bold" style={{ fontSize: "0.8rem" }}>
                                                    {review.rating} sao
                                                </span>
                                            </div>
                                            
                                            <p className="m-0 text-secondary small mt-1" style={{ whiteSpace: "pre-line" }}>
                                                {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </Collapse>
        </div>
    );
};

export default ReviewSection;