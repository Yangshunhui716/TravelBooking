import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./screens/Home/Home";
import Login from "./screens/User/Login";
import Register from "./screens/User/Register";

function App() {

    return (
        <BrowserRouter>

            <Header />

            <div className="container mt-4 mb-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>

            <Footer />

        </BrowserRouter>
    );
}

export default App;