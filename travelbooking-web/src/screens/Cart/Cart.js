import { useContext, useState } from "react";
import { Alert, Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import cookies from "react-cookies";
import { Link, useNavigate } from "react-router-dom";
import { MyCartContext, MyUserContext } from "../../configs/Context";
import MySpinner from "../../components/MySpinner";
import { authApis, endpoints } from "../../configs/Api";

const Cart = () => {
    const [cart, setCart] = useState(cookies.load("cart") || null);
    const [user] = useContext(MyUserContext);
    const [loading, setLoading] = useState(false);
    const [, cartDispatch] = useContext(MyCartContext);
    const [paymentMethod, setPaymentMethod] = useState("CASH");
    const navigate = useNavigate();
    const calculateTotal = () => {
        if (!cart) return 0;
        return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handlePay = async () => {
        if(window.confirm("Bạn có chắc chắn muốn thanh toán không?")) {
            let currentCart = cookies.load("cart") || null;
            if(currentCart !== null) {
                try {
                    setLoading(true); // Bật trạng thái loading khi đang gọi API

                    // Tạo mảng booking đúng định dạng API yêu cầu từ cấu trúc cart hiện tại
                    const bookingData = Object.values(currentCart).map(item => ({
                        id: item.id,
                        unitPrice: item.price,
                        quantity: item.quantity,
                        // Nếu item không có ngày cụ thể hoặc duration thì fallback về null/0 hoặc dùng dữ liệu có sẵn
                        serviceStartDate: item.type === "hotel" 
                        ? new Date(item.checkIn).getTime() 
                        : (item.departure_time ? new Date(item.departure_time).getTime() : null),
                        serviceDuration: item.type === "hotel" ? (item.nights || 1) : 1
                    }));

                    // Đóng gói request body khớp hoàn toàn với API của bạn
                    const requestBody = {
                        payMethod: paymentMethod, // Lấy từ state paymentMethod ("CASH", "MOMO", "PAYPAL")
                        booking: bookingData
                    };

                    let res = await authApis().post(endpoints["pay"], requestBody);
                    if(res.status === 200 || res.status === 201) {
                        if(res.data){
                            navigate(res.data.payUrl); // Điều hướng đến URL thanh toán nếu API trả về
                        }else{
                            alert("Thanh toán thành công!");
                            setCart(null);
                            cookies.remove("cart");
                            cartDispatch({ type: "PAID" });
                        }
                    }
                } catch (error) {
                    console.error("Lỗi khi thanh toán:", error);
                    alert("Thanh toán thất bại, vui lòng thử lại sau!");
                } finally {
                    setLoading(false); // Tắt trạng thái loading
                }
            }
        }
    };

    const handleUpdateQuantity = (e, itemId) => {
        const val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) return;
        if (cart !== null && itemId in cart) {
            const updatedCart = { ...cart, [itemId]: { ...cart[itemId], quantity: val } };
            setCart(updatedCart);
            cookies.save("cart", updatedCart);
            cartDispatch({ type: "UPDATE" });
        }
    };
    const handleRemoveItem = (itemId) => {
        let updatedCart = { ...cart };
        delete updatedCart[itemId];
        if (Object.keys(updatedCart).length === 0) {
            updatedCart = null;
            cookies.remove("cart");
        } else {
            cookies.save("cart", updatedCart);
        }
        setCart(updatedCart);
        cartDispatch({ type: "UPDATE" });
    };
    const handleViewDetail = (item) => {
        if (item.type === "hotel") navigate(`/hotel-room-services/${item.id}`);
        else if (item.type === "transport") navigate(`/transport-services/${item.id}`);
        else navigate(`/tour-services/${item.id}`);
    };
    return (
        <Container className="my-4">
            <h3 className="fw-bold text-dark mb-4 text-center text-sm-start">Các dịch vụ đã chọn</h3>
            {(!cart || Object.keys(cart).length === 0) ? (
                <Alert variant="warning" className="text-center py-4">
                    Không có sản phẩm nào trong giỏ! <Link to="/" className="fw-bold text-decoration-none">Khám phá ngay</Link>
                </Alert>
            ) : (
                <>
                    {/* DANH SÁCH DỊCH VỤ - HỘP ĐƠN GIẢN CÓ VIỀN */}
                    <div className="mb-4">
                        {Object.values(cart).map((item) => (
                            <div key={item.id} className="p-3 border rounded-3 mb-3 shadow-sm bg-white">
                                <Row className="align-items-center g-2">
                                    {/* Cột thông tin chữ */}
                                    <Col xs={12} sm={9}>
                                        <h5 className="fw-bold mb-2 text-primary">{item.name}</h5>
                                        <div className="mb-2 text-secondary small">
                                            {item.type === "hotel" ? (
                                                <span>
                                                     Nhận phòng: <b>{item.checkIn}</b> → Trả phòng: <b>{item.checkOut}</b> 
                                               
                                                             <div className="mt-2 text-secondary extra-small">
                                                                {item.nights} đêm ({item.checkIn} → {item.checkOut})
                                                             </div>
                                             
                                                </span>
                                            ) : (
                                           
                                            <span>
                                                Ngày khởi hành: <b>{new Date(item.departure_time).toLocaleString("vi-VN")}</b>
                                            </span>
                                            )}
                                        </div>
                                        <Row className="small text-muted align-items-center">

                                            <Col xs={12} sm={4} className="mb-1 mb-sm-0">
                                                Đơn giá: <span className="text-danger fw-bold">{item.price?.toLocaleString()}đ</span>
                                            </Col>
                                            <Col xs={12} sm={4} className="mb-1 mb-sm-0 d-flex align-items-center gap-2">
                                                Số lượng:
                                                <Form.Control 
                                                    type="number" 
                                                    min="1"
                                                    value={item.quantity} 
                                                    onChange={(e) => handleUpdateQuantity(e, item.id)}
                                                    size="sm"
                                                    style={{ width: "65px" }}
                                                />
                                            </Col>
                                            <Col xs={12} sm={4}>
                                                Tổng: <span className="text-dark fw-bold">{(item.price * item.quantity)?.toLocaleString()}đ</span>
                                            </Col>
                                        </Row>
                                       
                                    </Col>

                                    {/* Cột các nút hành động */}
                                    <Col xs={12} sm={3} className="d-flex flex-sm-column gap-2 justify-content-end text-end">
                                        <Button variant="outline-secondary" size="sm" className="rounded-pill" onClick={() => handleViewDetail(item)}>
                                            Chi tiết
                                        </Button>
                                        <Button variant="outline-danger" size="sm" className="rounded-pill" onClick={() => handleRemoveItem(item.id)}>
                                            Xóa
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>

                    {/* KHUNG THANH TOÁN (BOTTOM BAR) */}
                    <div className="p-3 border rounded-3 bg-light shadow-sm">
                        <Row className="align-items-center g-3 text-center text-md-start">
                            {/* Tổng tiền */}
                            <Col xs={12} md={4}>
                                <div className="text-muted small">Tổng tiền thanh toán</div>
                                <h4 className="fw-bold text-danger m-0">{calculateTotal().toLocaleString()} VNĐ</h4>
                            </Col>

                            {/* Phương thức thanh toán */}
                            <Col xs={12} md={5} className="d-flex justify-content-center">
                                <div className="d-flex gap-1 bg-white border p-1 rounded-pill">
                                    <Button variant={paymentMethod === "CASH" ? "primary" : "white"} size="sm" className="rounded-pill px-3" onClick={() => setPaymentMethod("CASH")}>Tiền mặt</Button>
                                    <Button variant={paymentMethod === "MOMO" ? "primary" : "white"} size="sm" className="rounded-pill px-3" onClick={() => setPaymentMethod("MOMO")}>Momo</Button>
                                    <Button variant={paymentMethod === "PAYPAL" ? "primary" : "white"} size="sm" className="rounded-pill px-3" onClick={() => setPaymentMethod("PAYPAL")}>Paypal</Button>
                                </div>
                            </Col>

                            {/* Nút hành động */}
                            <Col xs={12} md={3} className="text-md-end">
                                {user === null ? (
                                    <Alert variant="warning" className="m-0 py-1 px-2 small rounded-3">
                                        Vui lòng <Link to="/login?next=/cart" className="fw-bold">Đăng nhập</Link>
                                    </Alert>
                                ) : loading ? (
                                    <MySpinner />
                                ) : (
                                    <Button variant="danger" className="w-100 rounded-pill fw-bold" onClick={handlePay}>
                                        Thanh toán
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </div>
                </>
            )}
        </Container>
    );
};

export default Cart;