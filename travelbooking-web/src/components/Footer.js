import ComponentStyle from "./ComponentStyle";

const Footer = () => {
    return (
        <footer style={ComponentStyle.footer}>
            <div className="container text-center">
                <h3 className="fw-bold mb-4">AH TravelBooking</h3>
                <p>Khám phá thế giới cùng những chuyến đi tuyệt vời.</p>
                <p> © 2026 AH TravelBooking. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;