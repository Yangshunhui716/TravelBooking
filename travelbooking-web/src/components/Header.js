import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Button, Badge } from "react-bootstrap";

import { useContext } from "react";

import cookies from "react-cookies";

import { MyUserContext, MyCartContext } from "../configs/Context";

const Header = () => {

    const [user, dispatch] = useContext(MyUserContext);

    const logout = () => {

        cookies.remove("token");

        dispatch({
            type: "LOGOUT"
        });
    }
    const [cart,] = useContext(MyCartContext);

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

                    {/* MENU */}
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
                            to="/tour-services"
                            style={styles.navLink}
                        >
                            Tour
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/hotel-room-services"
                            style={styles.navLink}
                        >
                            Phòng khách sạn
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/transport-services"
                            style={styles.navLink}
                        >
                            Phương tiện
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/cart"
                            style={styles.navLink}
                        >
                            Giỏ hàng <Badge variant="danger" className="bg-danger">{cart?.totalQuantity || 0}</Badge>
                        </Nav.Link>

                    </Nav>

                    {/* RIGHT SIDE */}
                    <div className="d-flex align-items-center">

                        {user === null ? (
                            <>
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
                            </>
                        ) : (
                            <>
                                    <Link
                                        to="/profile"
                                        style={{
                                            color: "white",
                                            fontWeight: "bold",
                                            marginRight: "15px",
                                            textDecoration: "none",
                                            fontSize: "18px"
                                        }}
                                    >
                                        Xin chào, {
                                            user.fullname ||
                                            user.businessName ||
                                            user.users?.username
                                        }
                                    </Link>


                            </>
                        )}

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