import React from "react";
<<<<<<< HEAD
import { Card, Image } from "react-bootstrap";

const ReviewSection = ({ reviews = [] }) => {
    
    // Hàm hiển thị số sao vàng
    const renderStars = (rating) => {
        const stars = [];
        const validRating = Math.min(Math.max(parseInt(rating) || 0, 0), 5);
        
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span 
                    key={i} 
                    className={`me-1 ${i <= validRating ? "text-warning" : "text-muted"}`}
                    style={{ fontSize: "1.1rem" }}
                >
                    {i <= validRating ? "★" : "☆"}
                </span>
            );
        }
        return stars;
    };

    // Hàm đổi timestamp thành ngày giờ Việt Nam
    const formatReviewDate = (timestamp) => {
        if (!timestamp) return "";
        return new Date(timestamp).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="mt-4 pt-2">
            <h5 className="font-weight-bold text-dark mb-3">
                Đánh giá từ khách hàng ({reviews.length})
            </h5>
            
            {reviews.length === 0 ? (
                <p className="text-muted small ps-1">Chưa có đánh giá nào cho dịch vụ này.</p>
=======
import { Card, Image, Alert } from "react-bootstrap";
import moment from "moment";
import 'moment/locale/vi'; // Kích hoạt hiển thị ngôn ngữ Tiếng Việt cho moment

const ReviewSection = ({ reviews = [] }) => {
    // Thay thế hàm vẽ icon bằng hiển thị text chữ đơn giản (Ví dụ: "5 sao")
    const renderRatingText = (starCount) => {
        const rating = parseInt(starCount) || 0;
        // Giới hạn điểm rating từ 0 đến 5 để tránh lỗi dữ liệu lạ từ API
        const validRating = Math.min(Math.max(rating, 0), 5); 
        return (
            <span className="text-warning font-weight-bold bg-warning-subtle px-2 py-1 rounded small">
                {validRating} sao
            </span>
        );
    };
    return (
        <div className="mt-4 pt-2">
            {/* TIÊU ĐỀ SECTION */}
            <div className="mb-3">
                <h5 className="font-weight-bold text-dark m-0">
                    Đánh giá từ khách hàng ({reviews.length})
                </h5>
            </div>

            {/* THÔNG BÁO TẠM THỜI */}
            <Alert variant="info" className="small py-2 mb-4">
                Tính năng gửi đánh giá mới đang được phát triển.
            </Alert>
            <hr className="text-muted my-4" />
        
            {/* DANH SÁCH REVIEW HIỆN CÓ */}
            {reviews.length === 0 ? (
                <p className="text-muted small ps-1">
                    Chưa có đánh giá nào cho dịch vụ này. Hãy là người đầu tiên nhận xét!
                </p>
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
            ) : (
                <div className="d-flex flex-column gap-3">
                    {reviews.map((review) => (
                        <Card key={review.id} className="border-0 bg-light p-3 rounded-3 shadow-sm">
                            <div className="d-flex align-items-start">
<<<<<<< HEAD
                                {/* Ảnh đại diện - Không sợ lỗi crash vì customerId luôn có users */}
                                <Image
                                    src={review.customerId.users?.avatar || "https://via.placeholder.com/40"}
=======
                                <Image
                                    src={review.customerId?.users?.avatar}
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                                    roundedCircle
                                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                    alt="User Avatar"
                                />
<<<<<<< HEAD
                                
                                <div className="ms-3 flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        {/* Tên khách hàng hiển thị trực tiếp từ DB */}
                                        <h6 className="m-0 font-weight-bold text-dark">
                                            {review.customerId.fullname}
                                        </h6>
                                        <small className="text-muted style={{ fontSize: '0.8rem' }}">
                                            {formatReviewDate(review.createdAt)}
                                        </small>
                                    </div>
                                    
                                    <div className="my-1">
                                        {renderStars(review.rating)}
                                    </div>
                                    
=======
                                <div className="ms-3 flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="m-0 font-weight-bold text-dark">
                                            {review.customerId?.fullname}
                                        </h6>
                                        {/* Áp dụng chuẩn moment hiển thị thời gian linh hoạt */}
                                        <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                                            {moment(review.createdAt).fromNow()}
                                        </small>
                                    </div>
                                
                                    {/* Khu vực hiển thị text điểm số (Ví dụ: 5 sao) */}
                                    <div className="my-1">
                                        {renderRatingText(review.rating)}
                                    </div>
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
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
    );
};

export default ReviewSection;