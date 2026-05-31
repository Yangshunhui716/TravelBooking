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
import { MyCartContext, MyUserContext } from "./configs/Context";
import MyUserReducer from "./reducers/MyUserReducer";
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

const App = () => {
    const [user, dispatch] = useReducer(MyUserReducer, cookies.load("user") || null);
    const [cart, cartDispatch] = useReducer(MyCartReducer, { totalQuantity: 0 , "totalAmount": 0 });
    useEffect(() => {
        cartDispatch({ type: "UPDATE" });

    }) // ko reset lại
    return (
        <MyUserContext.Provider value={[user, dispatch]}>
            <MyCartContext.Provider value={[cart, cartDispatch]}>
                <BrowserRouter>

                    <Header />

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/tour-services" element={<TourService/>} />
                            <Route path="/hotel-room-services" element={<HotelRoomService/>} />
                            <Route path="/transport-services" element={<TransportService/>} />
                            <Route path="/tour-services/:serviceId" element={<TourServiceDetail />} />
                            <Route path="/transport-services/:serviceId" element={<TransportServiceDetail />} />
                            <Route path="/hotel-room-services/:serviceId" element={<HotelRoomServiceDetail />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/modifier-service" element={<ModifierService />} />
                            <Route path="/customer/bookings/:bookingId" element={<BookingDetail />} />
                            <Route path="/provider/services/:idservice/customers" element={<ListCustomer />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/providers/:providerId" element={<ProviderProfile />} />

                        </Routes>

                    <Footer />

                </BrowserRouter>
            </MyCartContext.Provider>
        </MyUserContext.Provider>
    );
}

export default App;