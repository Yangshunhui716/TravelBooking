import React from "react";
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
            ) : (
                <div className="d-flex flex-column gap-3">
                    {reviews.map((review) => (
                        <Card key={review.id} className="border-0 bg-light p-3 rounded-3 shadow-sm">
                            <div className="d-flex align-items-start">
                                {/* Ảnh đại diện - Không sợ lỗi crash vì customerId luôn có users */}
                                <Image
                                    src={review.customerId.users?.avatar || "https://via.placeholder.com/40"}
                                    roundedCircle
                                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                    alt="User Avatar"
                                />
                                
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