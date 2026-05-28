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
                     <Route path="/profile" element={<Profile />} />
                    <Route path="/tour-services" element={<TourService/>} />
                    <Route path="/hotel-room-services" element={<HotelRoomService/>} />
                    <Route path="/transport-services" element={<TransportService/>} />
                </Routes>
                <Footer />

            </BrowserRouter>
        </MyUserContext.Provider>
    );
}

export default App;