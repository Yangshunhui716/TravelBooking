import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { authApis, endpoints } from "../../configs/Api";
import BookingStyle from "./CustomerBookingsStyle";
import { useNavigate } from "react-router-dom";
import MySpinner from "../../components/MySpinner";

const CustomerBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loadBookings = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(endpoints["customer-bookings"]);
            console.log(res.data);
            if (Array.isArray(res.data)) setBookings(res.data);
            else setBookings([]);
        } catch (ex) {
            console.error(ex);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const formatPrice = (price) => {
        return price.toLocaleString("vi-VN");
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("vi-VN");
    };

    return (
        <div style={BookingStyle.container}>
            <h2 style={BookingStyle.pageTitle}>Lịch sử booking</h2>
            
            {loading && <MySpinner />}
            
            {!loading && bookings.length === 0 && (
                <Alert variant="info">Chưa có booking nào!</Alert>
            )}

            {/* Duyệt qua từng đơn Booking tổng */}
            {Array.isArray(bookings) &&
                bookings.map((booking) => {
                    return (
                        <div key={booking.id} style={BookingStyle.card}>
                            {/* Cấu trúc Header đã loại bỏ hoàn toàn thẻ img */}
                            <div style={BookingStyle.header}>
                                <div style={{ ...BookingStyle.serviceSection, width: "100%" }}>
                                    <div style={{ width: "100%" }}>
                                        <div style={BookingStyle.topRow}>
                                            {/* CHỈ HIỂN THỊ MỖI BOOKING ID */}
                                            <h5 style={BookingStyle.title}>
                                                Booking #{booking.id}
                                            </h5>
                                            <button 
                                                style={BookingStyle.detailBtn} 
                                                onClick={() => navigate(`/customer/bookings/${booking.id}`)}
                                            > 
                                                Xem chi tiết 
                                            </button>   
                                        </div>
                                    </div>
                                </div>
                                <div style={BookingStyle.date}>
                                    {formatDate(booking.createdAt)}
                                </div>
                            </div>

                            {/* Giữ nguyên cấu trúc Body hiển thị các trạng thái song song ban đầu */}
                            <div style={BookingStyle.body}>
                                <div style={BookingStyle.item}>
                                    <span style={BookingStyle.label}>Trạng thái</span>
                                    <p style={{ ...BookingStyle.value, fontWeight: "bold", color: booking.bookingStatus === "CONFIRMED" ? "green" : "orange" }}>
                                        {booking.bookingStatus}
                                    </p>
                                </div>

                                <div style={BookingStyle.divider}></div>
                                
                                <div style={BookingStyle.item}>
                                    <span style={BookingStyle.label}>Thanh toán</span>
                                    <p style={{ ...BookingStyle.value, fontWeight: "bold", color: booking.paymentStatus === "PAID" ? "green" : "red" }}>
                                        {booking.paymentStatus}
                                    </p>
                                </div>
                                
                                <div style={BookingStyle.divider}></div>
                                
                                <div style={BookingStyle.item}>
                                    <span style={BookingStyle.label}>Tổng cộng</span>
                                    <p style={{ ...BookingStyle.value, fontWeight: "bold", color: "#dc3545" }}>
                                        {formatPrice(booking.totalAmount)} đ
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default CustomerBookings;