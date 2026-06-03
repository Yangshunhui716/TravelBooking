const Footer = () => {
    return (
        <footer
            style={{
                background: "#0f172a",
                color: "white",
                padding: "50px 0",
                marginTop: "60px"
            }}
        >
            <div className="container text-center">

                <h3
                    style={{
                        fontWeight: "bold",
                        marginBottom: "15px"
                    }}
                >
                    AH TravelBooking
                </h3>

                <p style={{ color: "#cbd5e1" }}>
                    Khám phá thế giới cùng những chuyến đi tuyệt vời.
                </p>

                <p style={{ color: "#94a3b8" }}>
                    © 2026 AH TravelBooking. All Rights Reserved.
                </p>

            </div>
        </footer>
    );
}

export default Footer;