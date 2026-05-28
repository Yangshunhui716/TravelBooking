import { useEffect, useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { authApis, endpoints } from "../../../configs/Api";
import BookingStyle from "./CustomerBookingsStyle";
import { useNavigate } from "react-router-dom";
import MySpinner from "../../../components/MySpinner";
const CustomerBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const loadBookings = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(
                endpoints["customer-bookings"]
            );
            console.log(res.data);
            if (Array.isArray(res.data))
                setBookings(res.data);
            else
                setBookings([]);
        } catch (ex) {
            console.error(ex);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    }
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
            {loading && (  <MySpinner /> )}
            {!loading &&  bookings.length === 0 && (  <Alert variant="info"> Chưa có booking nào! </Alert>)}
            {Array.isArray(bookings) &&
                bookings.flatMap((booking) =>
                    booking.bookingsServiceDetailCollection.map((detail) => {
                        const service = detail.serviceId;
                        return (
                            <div key={detail.id} style={BookingStyle.card}>
                                <div style={BookingStyle.header}>
                                    <div style={BookingStyle.serviceSection}>
                                        <img
                                            src={service.imgUrl}
                                            alt={service.name}
                                            style={BookingStyle.image}
                                        />
                                    <div>
                                        <div style={BookingStyle.topRow}>
                                            <h5 style={BookingStyle.title}>
                                                {service.name}
                                            </h5>
                                        <button style={BookingStyle.detailBtn} 
                                            onClick={() => navigate(`/customer/bookings/${booking.id}`) } > Xem chi tiết 
                                        </button>   
                                        </div>
                                    </div>
                                    </div>
                                    <div style={BookingStyle.date}>
                                        {formatDate(booking.createdAt)}
                                    </div>
                                </div>

                                <div style={BookingStyle.body}>
                                    <div style={BookingStyle.item}>
                                        <span style={BookingStyle.label}>Đơn giá</span>
                                        <p style={BookingStyle.value}>
                                            {formatPrice(detail.unitPrice)} đ
                                        </p>
                                    </div>

                                    <div style={BookingStyle.divider}></div>
                                    <div style={BookingStyle.item}>
                                        <span style={BookingStyle.label}>  Số lượng</span>
                                        <p style={BookingStyle.value}> {detail.quantity}</p>
                                    </div>
                                    <div style={BookingStyle.divider}></div>
                                    <div style={BookingStyle.item}>
                                        <span style={BookingStyle.label}>  Tổng cộng  </span>
                                        <p style={BookingStyle.value}>
                                            {formatPrice(detail.subtotal)} đ
                                        </p>
                                    </div>
                                </div>

                            </div>
                        );
                    })
                )
            }
        </div>
    );
}
export default CustomerBookings;

