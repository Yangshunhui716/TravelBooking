import { useEffect, useState } from "react";
import {  Alert, Container} from "react-bootstrap";
import { useParams} from "react-router-dom";
import { authApis, endpoints} from "../../configs/Api";
import DetailStyle from "./BookingDetailStyle";
import MySpinner from "../../components/MySpinner";
import StaticStyle from "../StaticStyle";

const BookingDetail = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const loadBooking = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(  `${endpoints["customer-bookings-detail"](bookingId)}` );
            setBooking(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadBooking();
    }, []);
    const formatPrice = (price) => {
        return Number(price || 0).toLocaleString("vi-VN");
    };
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("vi-VN");
    };

    if (!booking)
    return (
        <Container style={StaticStyle.baseHeight}>
            <Alert variant="danger">
                Không tìm thấy booking!
            </Alert>
        </Container>
    );
    
    return (
        <Container style={StaticStyle.baseHeight} className="mt-4 mb-4">
            {loading && <MySpinner />}

            <h3 className="fw-bold text-dark text-center text-sm-start text-uppercase mb-3">Chi tiết booking #{booking.id} </h3>
            <div style={DetailStyle.infoBox}>
                <div style={DetailStyle.row}>
                    <span>Trạng thái:</span>
                    <strong>
                        {booking.bookingStatus}
                    </strong>
                </div>

                <div style={DetailStyle.row}>
                    <span>Thanh toán:</span>
                    <strong> {booking.paymentStatus}</strong>
                </div>

                <div style={DetailStyle.row}>
                    <span>Phương thức:</span>
                    <strong>
                         {booking.paymentMethod}
                    </strong>
                </div>

                <div style={DetailStyle.row}>
                    <span>Ngày đặt:</span>
                    <strong>
                        {formatDate(booking.createdAt)}
                    </strong>
                </div>
            </div>

            <h5 className="fw-bold text-dark text-center text-sm-start text-uppercase mb-3">Dịch vụ đã đặt </h5>
            <div className="mb-4 overflow-auto" style={{ height: '20rem' }}>
            {booking.bookingsServiceDetailCollection.map(detail => {
                const service = detail.serviceId;
                return (
                    <div
                        key={detail.id}
                        style={DetailStyle.card}
                    >
                        <img
                            src={service.imgUrl}
                            alt={service.name}
                            style={DetailStyle.image}
                        />
                        <div style={DetailStyle.content}>
                            <h4 style={DetailStyle.serviceName}>
                                {service.name}
                            </h4>
                            <p> Địa điểm: {service.destination} </p>
                            <div style={DetailStyle.priceRow}>
                                <span>  Đơn giá:{" "}
                                    <strong>
                                        {formatPrice(detail.unitPrice)} đ
                                    </strong>
                                </span>
                                <span>
                                    SL: {" "}
                                    <strong>  {detail.quantity} </strong>
                                </span>

                                <span>
                                    Tổng: {" "}
                                    <strong>  {formatPrice(detail.subtotal)} đ</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
            </div>

            <div style={DetailStyle.totalBox}>
                Tổng thanh toán: {" "}
                <strong> {formatPrice(booking.totalAmount)} đ</strong>
            </div>
        </Container>
    );
}

export default BookingDetail;