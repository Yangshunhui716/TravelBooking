import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import { useReducer } from "react";

import Home from "./screens/Home/Home";
import Login from "./screens/User/Login";
import Register from "./screens/User/Register";
import TransportService from "./screens/Service/TransportService";
import HotelRoomService from "./screens/Service/HotelRoomService";
import TourService from "./screens/Service/TourService";
import { MyUserContext } from "./configs/Context";
import MyUserReducer from "./reducers/MyUserReducer";
import Profile from "./screens/User/Profile";
import BookingDetail from "./screens/Customer/BookingDetail";
import TourServiceDetail from "./screens/ServiceDetail/TourServiceDetail";
import TransportServiceDetail from "./screens/ServiceDetail/TransportServiceDetail";
import HotelRoomServiceDetail from "./screens/ServiceDetail/HotelRoomServiceDetail";
import ModifierService from "./screens/Provider/ModifierService";
import ProviderProfile from "./screens/PublicProfile/ProviderProfile";

const App = () => {
    const [user, dispatch] = useReducer(MyUserReducer, null);
    return (
        <MyUserContext.Provider value={[user, dispatch]}>
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
                    <Route path="/providers/:providerId" element={<ProviderProfile />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/modifier-service" element={<ModifierService />} />
                    <Route path="/customer/bookings/:bookingId" element={<BookingDetail />} />
                </Routes>

                <Footer />

            </BrowserRouter>
        </MyUserContext.Provider>
    );
}

export default App;