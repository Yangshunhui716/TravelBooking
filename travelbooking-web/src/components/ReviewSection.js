import React from "react";
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
            ) : (
                <div className="d-flex flex-column gap-3">
                    {reviews.map((review) => (
                        <Card key={review.id} className="border-0 bg-light p-3 rounded-3 shadow-sm">
                            <div className="d-flex align-items-start">
                                <Image
                                    src={review.customerId?.users?.avatar}
                                    roundedCircle
                                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                    alt="User Avatar"
                                />
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