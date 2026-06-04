import { useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
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
        <div style={BookingStyle.container} className="mt-3">
            <h3 className="fw-bold text-dark text-center text-sm-start text-uppercase mb-3">Lịch sử đặt dịch vụ</h3>
            
            <Card className="p-3 shadow rounded-4 border-0">
            {loading && <MySpinner />}
            
            {!loading && bookings.length === 0 && (
                <Alert variant="info">Chưa có booking nào!</Alert>
            )}

            {Array.isArray(bookings) &&
                bookings.map((booking) => {
                    return (
                        <Card className="p-4 shadow rounded-4 border-1 mb-3" key={booking.id}>
                            <div style={BookingStyle.header}>
                                <div style={{ ...BookingStyle.serviceSection, width: "100%" }}>
                                    <div style={{ width: "100%" }}>
                                        <div style={BookingStyle.topRow}>
                                            <h5 style={BookingStyle.title}>
                                                Booking #{booking.id}
                                            </h5>
                                            <Button variant="primary" size="sm"
                                                onClick={() => navigate(`/customer/bookings/${booking.id}`)}
                                            > 
                                                Xem chi tiết 
                                            </Button>   
                                        </div>
                                    </div>
                                </div>
                                <div style={BookingStyle.date}>
                                    {formatDate(booking.createdAt)}
                                </div>
                            </div>
 
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
                        </Card>
                    );
                })
            }
            </Card>
        </div>
    );
};

export default CustomerBookings;