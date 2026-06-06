import { Link } from "react-router-dom";
import { Nav, Navbar, Button, Badge } from "react-bootstrap";
import { useContext } from "react";
import { MyUserContext, MyCartContext, MyCompareContext, MyMessageContext } from "../configs/Context";
import ComponentStyle from "./ComponentStyle";

const Header = () => {
    const [user] = useContext(MyUserContext);
    const [cart,] = useContext(MyCartContext);
    const [compareList] = useContext(MyCompareContext);
    const userRole = user?.users?.role;
    const [unreadCount] = useContext(MyMessageContext);

    return (
        <Navbar expand="lg" className="py-3" style={ComponentStyle.navbar}>
            <Navbar.Brand as={Link} to="/" style={ComponentStyle.navbarBrand}>
                AH TravelBooking
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" style={ComponentStyle.navbarToggle} />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link as={Link} to="/" style={ComponentStyle.navLink}>
                        Trang chủ
                    </Nav.Link>

                    <Nav.Link as={Link} to="/tour-services" style={ComponentStyle.navLink}>
                        Tour du lịch
                    </Nav.Link>

                    <Nav.Link as={Link} to="/hotel-room-services" style={ComponentStyle.navLink}>
                        Phòng khách sạn
                    </Nav.Link>

                    <Nav.Link as={Link} to="/transport-services" style={ComponentStyle.navLink}>
                        Phương tiện
                    </Nav.Link>

                    <Nav.Link as={Link} to="/compare" style={ComponentStyle.navLink}>
                        So sánh dịch vụ {compareList.services.length > 0 && (
                            <Badge className="bg-danger">
                                {compareList.services.length}
                            </Badge>
                        )}
                    </Nav.Link>
                </Nav>

                <div className="d-flex align-items-center">
                {user === null ? (
                    <>
                        <Link to="/cart" style={ComponentStyle.navLink}>
                            &#128722; Giỏ hàng <Badge className="bg-danger">{cart?.totalQuantity || 0}</Badge>
                        </Link>

                        <Button as={Link} to="/login" variant="light"
                            className="me-2 px-4 rounded-pill fw-bold">
                            Đăng nhập
                        </Button>

                        <Button as={Link} to="/register"
                            className="px-4 rounded-pill fw-bold"
                            style={ComponentStyle.registerButton}>
                            Đăng ký
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/profile" style={ComponentStyle.navLink}>
                            &#9660; Xin chào, {user.fullname || user.businessName || user.users?.username}
                        </Link>
                        {userRole === "ROLE_PROVIDER" && (
                            <Link to="/statistic" style={ComponentStyle.navLink}>
                                &#128202;Thống kê
                            </Link>
                        )}
                        {userRole !== "ROLE_PROVIDER" && (
                            <Link to="/cart" style={ComponentStyle.navLink}>
                                &#128722; Giỏ hàng <Badge className="bg-danger">{cart?.totalQuantity || 0}</Badge>
                            </Link>
                        )}
                        <Link to="/conversations" style={ComponentStyle.navLink}>
                            💬 Tin nhắn <Badge className="bg-danger">{unreadCount>99 ? '99+' : unreadCount}</Badge>
                        </Link>
                    </>
                )}
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;