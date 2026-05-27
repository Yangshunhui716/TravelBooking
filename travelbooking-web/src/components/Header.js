import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar
            expand="lg"
            className="shadow-sm py-3"
            style={{
                background: "linear-gradient(to right, #0ea5e9, #0284c7)",
            }}
        >
            <Container>

                {/* Logo */}
                <Navbar.Brand
                    as={Link}
                    to="/"
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "30px",
                        letterSpacing: "1px"
                    }}
                >
                    ✈ AH TravelBooking
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    style={{ backgroundColor: "white" }}
                />

                <Navbar.Collapse id="basic-navbar-nav">

                    {/* Menu */}
                    <Nav className="mx-auto">

                        <Nav.Link
                            as={Link}
                            to="/"
                            style={styles.navLink}
                        >
                            Trang chủ
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/tour-service"
                            style={styles.navLink}
                        >
                            Tour
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/hotel-room-service"
                            style={styles.navLink}
                        >
                            Phòng khách sạn
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/transport-service"
                            style={styles.navLink}
                        >
                            Phương tiện
                        </Nav.Link>

                    </Nav>

                    {/* Buttons */}
                    <div className="d-flex">

                        <Button
                            as={Link}
                            to="/login"
                            variant="light"
                            className="me-2 px-4 rounded-pill fw-bold"
                        >
                            Đăng nhập
                        </Button>

                        <Button
                            as={Link}
                            to="/register"
                            className="px-4 rounded-pill fw-bold"
                            style={{
                                backgroundColor: "#f97316",
                                border: "none"
                            }}
                        >
                            Đăng ký
                        </Button>

                    </div>

                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

const styles = {
    navLink: {
        color: "white",
        fontWeight: "500",
        marginRight: "15px",
        fontSize: "17px"
    }
}

export default Header;