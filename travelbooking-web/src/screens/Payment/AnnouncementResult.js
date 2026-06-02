import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MySpinner from "../../components/MySpinner";
import { authApis, endpoints } from "../../configs/Api";

const PaymentResult = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { status, method } = useParams(); 
    const [resultStatus, setResultStatus] = useState(status);
    const [loading, setLoading] = useState(true);

    const processPayment = async () => {
        if (method === "paypal") {
            let token = searchParams.get("token");
            if (token) {
                try {
                    let request = endpoints["handle-paypal"] + `?token=${token}`;
                    await authApis().post(request);
                } catch (error) {
                    console.error("Lỗi xử lý token PayPal:", error);
                }
            }
        } else if (method === "momo") {
            let resultCode = searchParams.get("resultCode");
            if (resultCode === "0") {
                setResultStatus("success");
            } else {
                setResultStatus("cancel");
            }
        }
        
        setLoading(false);
    };

    useEffect(() => {
        processPayment();
    }, [method, searchParams]);

    useEffect(() => {
        if (!loading) {
            const timerId = setTimeout(() => {
                navigate("/profile");
            }, 5000);
            return () => clearTimeout(timerId);
        }
    }, [loading, resultStatus, navigate]);

    if (loading) {
        return (
            <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
                <MySpinner />
                <p className="mt-3 text-muted">Đang xử lý giao dịch, vui lòng đợi...</p>
            </Container>
        );
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <Card className="shadow-lg border-0 rounded-4" style={{ maxWidth: "500px", width: "100%" }}>
                <Card.Header className={`text-center py-4 border-0 rounded-top-4 ${resultStatus === "success" ? "bg-success text-white" : "bg-danger text-white"}`}>
                    <div className="mb-2">
                        {resultStatus === "success" ? (
                            <i className="bi bi-check-circle-fill" style={{ fontSize: "4rem" }}></i>
                        ) : (
                            <i className="bi bi-x-circle-fill" style={{ fontSize: "4rem" }}></i>
                        )}
                    </div>
                    <h3 className="fw-bold mb-0">
                        {resultStatus === "success" ? "Thanh toán thành công!" : "Thanh toán thất bại"}
                    </h3>
                </Card.Header>

                <Card.Body className="p-4">
                    <p className="text-center text-muted mb-4">
                        {resultStatus === "success"
                            ? "Cảm ơn bạn đã sử dụng dịch vụ của AH Travel Booking. Đơn hàng của bạn đã được xử lý thành công."
                            : "Giao dịch của bạn đã bị hủy hoặc xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại."}
                    </p>

                    <p className="text-center text-muted mt-3" style={{ fontSize: "0.85rem" }}>
                        Trang web sẽ tự động chuyển hướng sau 5 giây...
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PaymentResult;