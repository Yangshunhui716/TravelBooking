import { Carousel, Card, Row, Col, Button, Container } from "react-bootstrap";
import styles from "./HomeStyle";

const Home = () => {
    return (
        <>

            {/* ===== CAROUSEL ===== */}
            <Carousel fade>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                        alt="Beach"
                        style={styles.carouselImage}
                    />

                    <Carousel.Caption style={styles.carouselContent}>
                        <h1 style={styles.carouselTitle}>
                            Khám phá thế giới cùng AH TravelBooking
                        </h1>

                        <p style={styles.carouselText}>
                            Trải nghiệm những chuyến đi tuyệt vời và đáng nhớ.
                        </p>

                        <Button
                            variant="info"
                            size="lg"
                            style={styles.carouselButton}
                        >
                            Khám phá ngay
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images.unsplash.com/photo-1493558103817-58b2924bce98"
                        alt="Travel"
                        style={styles.carouselImage}
                    />

                    <Carousel.Caption style={styles.carouselContent}>
                        <h1 style={styles.carouselTitle}>
                            Đặt tour, khách sạn và phương tiện dễ dàng
                        </h1>

                        <p style={styles.carouselText}>
                            Hàng trăm dịch vụ chất lượng với giá tốt nhất.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>

            <Container>
                {/* ===== GIỚI THIỆU ===== */}
                <div style={styles.introSection}>

                    <h1 style={styles.sectionTitle}>
                        Chào mừng đến với AH TravelBooking
                    </h1>

                    <p style={styles.introText}>
                        AH TravelBooking là nền tảng đặt tour du lịch, khách sạn và
                        phương tiện di chuyển hiện đại, giúp bạn dễ dàng lên kế hoạch
                        cho mọi chuyến đi chỉ trong vài phút.
                    </p>

                    <p style={styles.introText}>
                        Chúng tôi mang đến hàng trăm tour du lịch hấp dẫn trong và ngoài nước,
                        hệ thống khách sạn chất lượng cùng nhiều lựa chọn phương tiện di chuyển
                        tiện lợi với mức giá cạnh tranh.
                    </p>

                    <p style={styles.introText}>
                        Dù bạn đang tìm kiếm một kỳ nghỉ thư giãn bên bãi biển,
                        một chuyến phiêu lưu khám phá thiên nhiên hay hành trình
                        công tác thuận tiện, AH TravelBooking luôn sẵn sàng đồng hành
                        để mang đến trải nghiệm du lịch an toàn, nhanh chóng và đáng nhớ.
                    </p>

                    <p style={styles.introText}>
                        Với giao diện thân thiện, thao tác đơn giản và dịch vụ hỗ trợ tận tâm,
                        chúng tôi giúp việc đặt tour, khách sạn và phương tiện trở nên
                        dễ dàng hơn bao giờ hết.
                    </p>

                </div>

                {/* ===== DỊCH VỤ ===== */}
                <div style={styles.serviceSection}>

                    <h1 style={styles.sectionTitle}>
                        Dịch vụ của chúng tôi
                    </h1>

                    <Row className="mt-5 g-4">

                        {/* TOUR */}
                        <Col md={4}>
                            <Card style={styles.card}>

                                <Card.Img
                                    variant="top"
                                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
                                    style={styles.cardImage}
                                />

                                <Card.Body>
                                    <Card.Title style={styles.cardTitle}>
                                        Tour du lịch
                                    </Card.Title>

                                    <Card.Text style={styles.cardText}>
                                        Khám phá hàng trăm tour du lịch hấp dẫn
                                        trong và ngoài nước với lịch trình đa dạng.
                                    </Card.Text>

                                    <Button variant="info">
                                        Xem thêm
                                    </Button>
                                </Card.Body>

                            </Card>
                        </Col>

                        {/* HOTEL */}
                        <Col md={4}>
                            <Card style={styles.card}>

                                <Card.Img
                                    variant="top"
                                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                                    style={styles.cardImage}
                                />

                                <Card.Body>
                                    <Card.Title style={styles.cardTitle}>
                                        Khách sạn
                                    </Card.Title>

                                    <Card.Text style={styles.cardText}>
                                        Đặt phòng khách sạn tiện nghi, sang trọng
                                        với mức giá phù hợp cho mọi nhu cầu.
                                    </Card.Text>

                                    <Button variant="info">
                                        Xem thêm
                                    </Button>
                                </Card.Body>

                            </Card>
                        </Col>

                        {/* VEHICLE */}
                        <Col md={4}>
                            <Card style={styles.card}>

                                <Card.Img
                                    variant="top"
                                    src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee"
                                    style={styles.cardImage}
                                />

                                <Card.Body>
                                    <Card.Title style={styles.cardTitle}>
                                        Phương tiện di chuyển
                                    </Card.Title>

                                    <Card.Text style={styles.cardText}>
                                        Đặt vé máy bay, xe khách và nhiều phương tiện
                                        khác nhanh chóng và tiện lợi.
                                    </Card.Text>

                                    <Button variant="info">
                                        Xem thêm
                                    </Button>
                                </Card.Body>

                            </Card>
                        </Col>

                    </Row>

                </div>

                {/* ===== WHY CHOOSE US ===== */}
                <div style={styles.whySection}>

                    <h1 style={styles.sectionTitle}>
                        Tại sao chọn AH TravelBooking?
                    </h1>

                    <Row className="mt-5 g-4">

                        <Col md={3}>
                            <div style={styles.whyCard}>
                                <h3>💰 Giá tốt</h3>

                                <p>
                                    Nhiều ưu đãi hấp dẫn và giá cả cạnh tranh.
                                </p>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div style={styles.whyCard}>
                                <h3>⚡ Đặt nhanh</h3>

                                <p>
                                    Chỉ vài thao tác đơn giản để hoàn tất đặt dịch vụ.
                                </p>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div style={styles.whyCard}>
                                <h3>🔒 An toàn</h3>

                                <p>
                                    Thanh toán bảo mật và thông tin được bảo vệ.
                                </p>
                            </div>
                        </Col>

                        <Col md={3}>
                            <div style={styles.whyCard}>
                                <h3>📞 Hỗ trợ 24/7</h3>

                                <p>
                                    Đội ngũ hỗ trợ luôn sẵn sàng đồng hành cùng bạn.
                                </p>
                            </div>
                        </Col>

                    </Row>

                </div>
            </Container>
        </>
    );
}

export default Home;