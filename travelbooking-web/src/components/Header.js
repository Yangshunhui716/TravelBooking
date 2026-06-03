import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Button, Badge } from "react-bootstrap";
import { useContext } from "react";
import { MyUserContext, MyCartContext, MyCompareContext } from "../configs/Context";

const Header = () => {
    const [user] = useContext(MyUserContext);
    const [cart,] = useContext(MyCartContext);
    const [compareList] = useContext(MyCompareContext);
    const userRole = user?.users?.role;
    
    return (
        <Navbar
            expand="lg"
            className="shadow-sm py-3"
            style={{
                background: "linear-gradient(to right, #0ea5e9, #0284c7)",
            }}
        >

            <Navbar.Brand
                as={Link}
                to="/"
                style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "30px",
                    letterSpacing: "1px",
                    marginLeft:"30px",
                }}
            >
                AH TravelBooking
            </Navbar.Brand>

            <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ backgroundColor: "white" }}
            />

            <Navbar.Collapse id="basic-navbar-nav">

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

                    <Nav.Link as={Link} to="/compare" style={styles.navLink}>
                        So sánh dịch vụ  {compareList.services.length > 0 && (
                            <Badge className="bg-danger">
                                {compareList.services.length}
                            </Badge>
                        )}
                    </Nav.Link>

                </Nav>

                <div className="d-flex align-items-center">
                    {user === null ? (
                        <>
                            <Link
                                to="/cart"
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    marginRight: "15px",
                                    textDecoration: "none",
                                }}
                            >
                                 &#128722; Giỏ hàng <Badge className="bg-danger">{cart?.totalQuantity || 0}</Badge>
                            </Link>
                            
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
                                    border: "none",
                                    marginRight: "20px"
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
                                    textDecoration: "none",
                                    fontSize: "18px",
                                    marginRight: "20px"
                                }}
                            >
                                Xin chào, {user.fullname || user.businessName || user.users?.username}
                            </Link>
                            {userRole === "ROLE_PROVIDER" && (
                                <Link
                                    to="/statistic"
                                    style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        marginRight: "15px",
                                        textDecoration: "none",
                                    }}
                                >
                                     &#128202;Thống kê
                                </Link>
                            )}
                            {userRole !== "ROLE_PROVIDER" && (
                                <Link
                                    to="/cart"
                                    style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        marginRight: "15px",
                                        textDecoration: "none",
                                    }}
                                >
                                     &#128722; Giỏ hàng <Badge className="bg-danger">{cart?.totalQuantity || 0}</Badge>
                                </Link>
                            )}

                            <Link
                                to="/conversations"
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    marginRight: "15px",
                                    textDecoration: "none",
                                }}
                            >
                                💬 Tin nhắn
                            </Link>
                        </>
                    )}
                </div>

            </Navbar.Collapse>

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