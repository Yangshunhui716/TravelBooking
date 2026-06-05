import { useEffect, useState } from "react";
import {  Alert, Button, ButtonGroup, Container} from "react-bootstrap";
import { useNavigate, useParams} from "react-router-dom";
import { authApis, endpoints} from "../../configs/Api";
import DetailStyle from "./BookingDetailStyle";
import MySpinner from "../../components/MySpinner";
import StaticStyle from "../StaticStyle";

const BookingDetail = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState();
    const navigate = useNavigate();

    const loadBooking = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(  `${endpoints["customer-bookings-detail"](bookingId)}` );
            setBooking(res.data);
            setPaymentMethod(res.data.paymentMethod);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBooking();
    }, [bookingId]);

    const formatPrice = (price) => {
        return Number(price || 0).toLocaleString("vi-VN");
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("vi-VN");
    };

    const handlePay = async () => {
        if(window.confirm("Bạn có chắc chắn muốn thanh toán không?")) {
            try{
                setLoading(true);
                let res = await authApis().post(endpoints["re-pay"](bookingId), 
                {
                    payMethod: paymentMethod,
                });
                if(res.status === 200 || res.status === 201) {
                    if(res.data){
                        navigate(res.data.payUrl);
                    }else{
                        alert("Đã đặt đơn thành công!");
                        navigate("/profile");
                    } 
                }
            } catch (error) {
                console.error("Lỗi khi thanh toán:", error);
                alert("Thanh toán thất bại, vui lòng thử lại sau!");
            } finally {
                setLoading(false);
            }
        }
    };

    if (!booking)
    return (
        <Container className="mt-4" style={StaticStyle.baseHeight}>
            <Alert variant="danger">
                Không tìm thấy booking!
            </Alert>
        </Container>
    );
    
    return (
        <Container style={StaticStyle.baseHeight} className="mt-4 mb-4">
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

            {loading && <MySpinner />}

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

            <div className="d-flex align-items-center justify-content-between">
            <div style={DetailStyle.totalBox}>
                Tổng thanh toán: {" "}
                <strong> {formatPrice(booking.totalAmount)} đ</strong>
            </div>
            
            {booking.paymentStatus=="UNPAID" && booking.bookingStatus!="CONFIRM" &&
            <>
                <ButtonGroup className="d-flex border p-1 rounded-pill">
                    <Button variant={paymentMethod === "CASH" ? "primary" : "white"} className="rounded-pill" onClick={() => setPaymentMethod("CASH")}>Cash</Button>
                    <Button variant={paymentMethod === "MOMO" ? "primary" : "white"} className="rounded-pill" onClick={() => setPaymentMethod("MOMO")}>Momo</Button>
                    <Button variant={paymentMethod === "PAYPAL" ? "primary" : "white"} className="rounded-pill" onClick={() => setPaymentMethod("PAYPAL")}>Paypal</Button>
                    <Button variant="danger" className="w-100 rounded-pill fw-bold" onClick={handlePay}>
                        Re-pay
                    </Button>
                </ButtonGroup>
            </>    
            }
            </div>
        </Container>
    );
}

export default BookingDetail;