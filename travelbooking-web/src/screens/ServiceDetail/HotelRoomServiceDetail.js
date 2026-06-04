import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DisplayImage from "../../components/DisplayImage";
import MySpinner from "../../components/MySpinner";
import Api, { endpoints } from "../../configs/Api";
import { MyUserContext, MyCartContext } from "../../configs/Context";
import ServiceDetailStyle from "./ServiceDetailStyle"; 
import StaticStyle from "../StaticStyle";
import ReviewSection from "../../components/ReviewSection";
import { authApis } from "../../configs/Api";
import cookies from "react-cookies";

const HotelRoomServiceDetail = () => {
    const { serviceId } = useParams();
    const [hotelService, setHotelService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user] = useContext(MyUserContext);
    const [, dispatch] = useContext(MyCartContext);
    const nav = useNavigate();
    const [reviews, setReviews] = useState([]);

    const getDefaultDates = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`; 
        };
        return {
            today: formatDate(today),
            tomorrow: formatDate(tomorrow)
        };
    };
    const defaultDates = getDefaultDates();
    const [checkInDate, setCheckInDate] = useState(defaultDates.today);
    const [checkOutDate, setCheckOutDate] = useState(defaultDates.tomorrow);
    const [roomCount, setRoomCount] = useState(1);
    const [availableSlots, setAvailableSlots] = useState(0);


    const loadHotelDetail = async () => {
        try {
            setLoading(true);
            let res = await Api.get(endpoints['hotel-room-service-detail'](serviceId));
            setHotelService(res.data); 
        } catch (ex) {
            console.error("Lỗi khi tải chi tiết dịch vụ khách sạn:", ex);
        } finally {
            setLoading(false);
        }
    };

    const loadAvailableSlotsOnly = async () => {
        try {
            let res = await Api.get(`${endpoints['hotel-room-service-detail'](serviceId)}/available-slots`, {
                params: {
                    startDate: checkInDate,
                    endDate: checkOutDate
                }
            });
            setAvailableSlots(res.data);
            
            setRoomCount(1);
        } catch (ex) {
            console.error("Lỗi check phòng trống:", ex);
        }
    };

    const loadReviews = async () => {
        try {
            const id = hotelService?.services?.id;
            if (id) {
                let res = await Api.get(endpoints['service-reviews'](id));
                setReviews(res.data);
            }
        } catch (ex) {
            console.error("Lỗi khi fetch danh sách reviews:", ex);
        }
    };

    const order = (service) => {
        if (!checkInDate || !checkOutDate) {
            alert("Vui lòng chọn đầy đủ ngày nhận và trả phòng!");
            return;
        }
        const date1 = new Date(checkInDate);
        const date2 = new Date(checkOutDate);
        if (date2 <= date1) {
            alert("Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày!");
            return;
        }

        const differenceInTime = date2.getTime() - date1.getTime();
        const calculatedNights = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        const formatDateOnly = (dateObj) => {
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        let cart = cookies.load("cart") || null;
        if (cart === null) {
            cart = {};
        }
        cart[service.services?.id] = {
            id: service.services?.id,
            name: service.services?.name,
            price: service.services?.price, 
            imgUrl: service.services?.imgUrl,
            checkIn: formatDateOnly(date1), 
            checkOut: formatDateOnly(date2), 
            nights: calculatedNights, 
            type: "hotel",
            quantity: roomCount, 
            durationDays: calculatedNights
        }; 

        cookies.save("cart", cart);
        dispatch({
            type: "UPDATE"
        });
        alert("Đã thêm vào giỏ hàng thành công!");
    };
    
    useEffect(() => {
        if (serviceId) {
            loadHotelDetail();
        }
    }, [serviceId]);

    useEffect(() => {
        if (serviceId && checkInDate && checkOutDate) {
            loadAvailableSlotsOnly();
        }
    }, [checkInDate, checkOutDate]);

    useEffect(() => {
        if (hotelService) {
            loadReviews();
        }
    }, [hotelService]);

    const handleViewProvider = () => {
        const providerId = hotelService.services?.providerId?.id;
        if (providerId) nav(`/providers/${providerId}`);
    };

    const handleChatProvider = async () => {
        if (user === null) {
            nav(`/login?next=/hotel-room-services/${serviceId}`);
            return;
        }
        const providerUserId = hotelService.services?.providerId?.users?.id;
        if (providerUserId) {
            let conversation = await authApis().post(endpoints["conversation-create"](providerUserId));
            nav("/conversations", { state: { conversationId: conversation.data.id } });
        }
    };

    const handlePostReview = async (comment, rating) => {
        try {
            const id = hotelService?.services?.id;
            if (!id) {
                alert("Không tìm thấy thông tin dịch vụ để đánh giá!");
                return;
            }

            let res = await authApis().post(
                endpoints['customer-create-review'](id), 
                {
                    comment: comment,
                    rating: String(rating)
                }
            );

            alert("Đánh giá thành công!");
            setReviews([res.data, ...reviews]); 
        } catch (ex) {
            console.error("Lỗi chi tiết từ hệ thống:", ex);

            if (ex.response && ex.response.data) {
                alert(`Lỗi: ${ex.response.data.message || "Hệ thống từ chối quyền đánh giá!"}`);
            } else {
                alert("Đã xảy ra lỗi khi kết nối hoặc gửi đánh giá lên Server.");
            }
        }
    };
    
    if (loading) {
        return (
            <div className="d-flex justify-content-center my-5" style={StaticStyle.baseHeight}>
                <MySpinner />
            </div>
        );
    }

    return (
        <div style={StaticStyle.baseHeight}>
            {hotelService && (
            <>
                <div style={ServiceDetailStyle.titleBox} className=" m-4">
                    <h2 className="text-dark font-weight-bold">
                        {hotelService.services?.name}
                    </h2>
                </div>

                <Row className="m-3 d-flex justify-content-center">
                    <Col md={5} xs={12} style={ServiceDetailStyle.sticky}>
                        <div style={{ ...ServiceDetailStyle.imageWrapper, width: "100%" }}>
                            <DisplayImage src={hotelService.services?.imgUrl} />
                        </div>

                        <div style={ServiceDetailStyle.infoCard} className="d-flex justify-content-between my-4 py-4">
                            <div className="d-flex align-items-center">
                                <Image 
                                    src={hotelService.services?.providerId?.users?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                    style={ServiceDetailStyle.providerAvatar} 
                                    alt="Provider Avatar"
                                />
                                <div className="ms-3">
                                    <h6 className="m-0 font-weight-bold text-primary">
                                        {hotelService.services?.providerId?.businessName}
                                    </h6>
                                    <p className="m-0 text-muted small mt-1">
                                        Trụ sở: {hotelService.services?.providerId?.address}
                                    </p>
                                    <p className="m-0 text-muted small">
                                        Liên hệ: {hotelService.services?.providerId?.users?.phone}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="d-flex flex-column gap-2">
                                <Button variant="primary" size="sm" 
                                    className="font-weight-bold"
                                    onClick={handleViewProvider}
                                >
                                    Xem chi tiết
                                </Button>
                                {user.users.role === "ROLE_CUSTOMER" &&
                                <Button variant="success" size="sm" 
                                    className="font-weight-bold"
                                    onClick={handleChatProvider}
                                >
                                    Chat ngay
                                </Button>}
                            </div>
                        </div>
                    </Col>

                    <Col md={7} xs={12}>
                        <div style={ServiceDetailStyle.infoCard}>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <span className="text-muted d-block small">Giá từ</span>
                                    <h3 style={ServiceDetailStyle.priceText}>
                                        {hotelService.services?.price?.toLocaleString()} VNĐ <small className="fs-6 text-muted fw-normal">/ đêm</small>
                                    </h3>
                                </div>
                                {(user === null || user?.users?.role !== "ROLE_PROVIDER") && (
                                    <Button variant="danger" size="lg" 
                                        className="px-4 font-weight-bold mt-2" 
                                        onClick={() => order(hotelService)}
                                    >
                                        Đặt
                                    </Button>
                                )}
                            </div>

                            <Row className="g-2 mb-3 p-2 bg-light rounded-3 align-items-center">
                                <Col sm={4} xs={6}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold text-secondary mb-1">Ngày nhận phòng</Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            size="sm"
                                            value={checkInDate}
                                            onChange={(e) => setCheckInDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={4} xs={6}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold text-secondary mb-1">Ngày trả phòng</Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            size="sm"
                                            value={checkOutDate}
                                            onChange={(e) => setCheckOutDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={4} xs={12}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold text-secondary mb-1">Số lượng phòng</Form.Label>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <Form.Select 
                                                size="sm"
                                                value={roomCount}
                                                onChange={(e) => setRoomCount(Number(e.target.value))}
                                                style={{ width: "70%" }}
                                            >
                                                {[...Array(Math.max(1, availableSlots)).keys()].map((i) => (
                                                    <option key={i + 1} value={i + 1}>{i + 1} phòng</option>
                                                ))}
                                            </Form.Select>
                                            <small className="text-muted text-end w-100 ps-1">
                                                (Còn {availableSlots} phòng trống)
                                            </small>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr/>

                            <div className="mt-3">
                                <h5 className="font-weight-bold text-dark mb-3">
                                    Thông tin chi tiết dịch vụ
                                </h5>
                                
                                <div className="ps-1 mb-2">
                                    <strong>Tên khách sạn: </strong>
                                    <span className="text-secondary">{hotelService.hotelName}</span>
                                </div>
                                
                                <div className="ps-1 mb-2">
                                    <strong>Địa chỉ: </strong>
                                    <span className="text-secondary">{hotelService.address}</span>
                                </div>

                                <div className="ps-1">
                                    <strong>Mô tả phòng ốc: </strong>
                                    <p style={ServiceDetailStyle.descriptionText} className="mt-1">
                                        {hotelService.services?.description}
                                    </p>
                                </div>
                            </div>
                            
                            <hr />
                            
                            <ReviewSection reviews={reviews} 
                                onAddReview={handlePostReview} 
                                user={user} 
                            />

                        </div>
                    </Col>
                </Row>
            </>
            )}
        </div>
    );
};

export default HotelRoomServiceDetail;