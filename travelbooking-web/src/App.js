import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./screens/Home/Home";
import Login from "./screens/User/Login";
import Register from "./screens/User/Register";
import TransportService from "./screens/Service/TransportService";
import HotelRoomService from "./screens/Service/HotelRoomService";
import TourService from "./screens/Service/TourService";

const App = () => {

    return (
        <BrowserRouter>

            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tour-service" element={<TourService/>} />
                <Route path="/hotel-room-service" element={<HotelRoomService/>} />
                <Route path="/transport-service" element={<TransportService/>} />
            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App;