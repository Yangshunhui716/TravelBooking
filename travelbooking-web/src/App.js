import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import cookies from "react-cookies";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useReducer, useEffect } from "react";
import Home from "./screens/Home/Home";
import Login from "./screens/User/Login";
import Register from "./screens/User/Register";
import TransportService from "./screens/Service/TransportService";
import HotelRoomService from "./screens/Service/HotelRoomService";
import TourService from "./screens/Service/TourService";
import { MyMessageContext, MyCartContext, MyUserContext, MyCompareContext } from "./configs/Context";
import MyUserReducer from "./reducers/MyUserReducer";
import MyCompareReducer from "./reducers/MyCompareReducer";
import Profile from "./screens/User/Profile";
import BookingDetail from "./screens/Customer/BookingDetail";
import TourServiceDetail from "./screens/ServiceDetail/TourServiceDetail";
import TransportServiceDetail from "./screens/ServiceDetail/TransportServiceDetail";
import HotelRoomServiceDetail from "./screens/ServiceDetail/HotelRoomServiceDetail";
import ModifierService from "./screens/Provider/ModifierService";
import ListCustomer from "./screens/Provider/ListCustomer";
import MyCartReducer from "./reducers/MyCartReducer";
import Cart from "./screens/Cart/Cart";
import ProviderProfile from "./screens/PublicProfile/ProviderProfile";
import Statistic from "./screens/Statistic/Statistic";
import Conversations from "./screens/Conversation/Conversations";
import PaymentResult from "./screens/Payment/AnnouncementResult";
import CompareService from "./screens/CompareService/CompareService";
import MyMessageReducer from "./reducers/MyMessageReducer";
import { onValue, ref } from "firebase/database";
import { authApis, endpoints } from "./configs/Api";
import { db } from "./configs/FirebaseConfig";

const App = () => {
    const [user, dispatch] = useReducer(MyUserReducer, cookies.load("user") || null);
    const [cart, cartDispatch] = useReducer(MyCartReducer, { totalQuantity: 0 , "totalAmount": 0 });
    const savedCompareList = cookies.load("compare_list");
    const initialCompareState = {
        services: savedCompareList ? savedCompareList : []
    };
    const [compareList, compareDispatch] = useReducer(MyCompareReducer, initialCompareState);
    useEffect(() => {
        cartDispatch({ type: "UPDATE" });

    },[])
    const [unreadCount, unreadDispatch] = useReducer(MyMessageReducer, 0);
    const fetchUnreadCount = async () => {
        if (!user) return;
        try {
            const res = await authApis().get(endpoints['conversation']);
            const convData = res.data;
            let totalUnread = 0;
            const isCustomer = user?.users?.role === 'ROLE_CUSTOMER';
            convData.forEach(conv => {
                totalUnread += isCustomer ? (conv.customerUnread || 0) : (conv.providerUnread || 0);
            });
            unreadDispatch({
                type: "SET_UNREAD_COUNT",
                payload: totalUnread
            });
        } catch (e) {
            console.error("Lỗi lấy tổng tin nhắn chưa đọc:", e);
        }
    };
    useEffect(() => {
        fetchUnreadCount();
    }, [user]);
    useEffect(() => {
        if (!user) return;
        const userId = user?.users.id;
        const pingRef = ref(db, `chat_updates/${userId}`);
        const unsub = onValue(pingRef, (snap) => {
            const lastUpdate = snap.val();
            if (lastUpdate) {
                setTimeout(() => {
                    fetchUnreadCount();
                }, 400);
            }
        });
        return () => unsub();
    }, [user]);
    return (
        <MyUserContext.Provider value={[user, dispatch]}>
            <MyCartContext.Provider value={[cart, cartDispatch]}>
                <MyMessageContext.Provider value={[unreadCount, unreadDispatch]}>
                    <MyCompareContext.Provider value={[compareList, compareDispatch]}>
                        <BrowserRouter>

                        <Header />

                            <Routes>
                                
                                <Route path="*" element={<Home />} />
                                <Route path="/tour-services" element={<TourService/>} />
                                <Route path="/hotel-room-services" element={<HotelRoomService/>} />
                                <Route path="/transport-services" element={<TransportService/>} />
                                <Route path="/tour-services/:serviceId" element={<TourServiceDetail />} />
                                <Route path="/transport-services/:serviceId" element={<TransportServiceDetail />} />
                                <Route path="/hotel-room-services/:serviceId" element={<HotelRoomServiceDetail />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/compare" element={<CompareService />} />
                                <Route path="/providers/:providerId" element={<ProviderProfile />} /> {/* Thường profile nhà cung cấp ai cũng xem được */}

                                {!user && (
                                    <>
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/register" element={<Register />} />
                                    </>
                                )}

                                {user && (
                                    <>
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/conversations" element={<Conversations />} />
                                    </>
                                )}

                                {user && user.users.role==="ROLE_CUSTOMER" && (
                                    <>
                                        <Route path="/customer/bookings/:bookingId" element={<BookingDetail />} />
                                        <Route path="/pay-result/:method/:status" element={<PaymentResult />} />
                                    </>
                                )}

                                {user && user.users.role==="ROLE_PROVIDER" && (
                                    <>
                                        {user.users.isActive && <Route path="/modifier-service" element={<ModifierService />} />}
                                        <Route path="/provider/services/:idservice/customers" element={<ListCustomer />} />
                                        <Route path="/statistic" element={<Statistic />} />
                                    </>
                                )}

                            </Routes>

                        <Footer />

                    </BrowserRouter>        
                </MyCompareContext.Provider>
            </MyMessageContext.Provider>
            </MyCartContext.Provider>
        </MyUserContext.Provider>
    );
}

export default App;