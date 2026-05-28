import { useRef, useState } from "react";
import { Alert,Button,Col, Form, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./UserStyle";
import Apis from "../../configs/Api";

const Register = () => {
    const nav = useNavigate();
    const avatar = useRef();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [user, setUser] = useState({
        role: "ROLE_CUSTOMER"
    });

    const setState = (value, field) => {
        setUser({ ...user, [field]: value});
    }
    const validate = () => {
        if (!user.username || user.username.length < 4) {
            setErr("Tên đăng nhập phải từ 4 ký tự!");
            return false;
        }
        if (!user.password || user.password.length < 6) {
            setErr("Mật khẩu phải từ 6 ký tự!");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!user.email || !emailRegex.test(user.email)) {
            setErr("Email không hợp lệ!");
            return false;
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!user.phone || !phoneRegex.test(user.phone)) {
            setErr("Số điện thoại phải gồm đúng 10 số!");
            return false;
        }
        if (user.role === "ROLE_CUSTOMER") {
            if (!user.fullname ||
                user.fullname.length < 2) {
                setErr("Họ và tên không hợp lệ!");
                return false;
            }
            if (!user.gender) {
                setErr("Vui lòng chọn giới tính!");
                return false;
            }
        }
        if (user.role === "ROLE_PROVIDER") {
            if (!user.tax || user.tax.length < 10) {
                setErr("Mã số thuế không hợp lệ!");
                return false;
            }
            if (!user.businessName) {
                setErr("Vui lòng nhập tên doanh nghiệp!");
                return false;
            }
            if (!user.address) {
                setErr("Vui lòng nhập địa chỉ!");
                return false;
            }
        }
        if (avatar.current.files.length > 0) {
            const file = avatar.current.files[0];
            if (file.size > 5 * 1024 * 1024) {
                setErr("Ảnh tối đa 5MB!");
                return false;
            }
        }
        return true;
    }
    const register = async (e) => {
        e.preventDefault();
        if (validate() === true) {
            try {
                setLoading(true);
                setErr("");
                const form = new FormData();
                for (let key in user) {
                    form.append(key, user[key]);
                }
                if (avatar.current.files.length > 0) {
                    form.append( "avatar",avatar.current.files[0] );
                }
                const res = await Apis.post( "/auth/register", form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                if (res.status === 200 ||
                    res.status === 201) {
                    alert("Đăng ký thành công!");
                    nav("/login");
                }
            } catch (ex) {
                console.error(ex);
                if (ex.response && ex.response.data) {
                    setErr(ex.response.data);
                } else {
                    setErr("Đăng ký thất bại!");
                }
            } finally {
                setLoading(false);
            }
        }
    }
    return (
        <div style={styles.container}>
            <h1 style={styles.title}> Đăng ký tài khoản </h1>
            {err && (
                <Alert variant="danger"> {err}</Alert>
            )}
            <Form onSubmit={register}>
                {/* USERNAME */}
                <Form.Group className="mb-3">
                    <Form.Label> Tên đăng nhập </Form.Label>
                    <Form.Control type="text" required  minLength={4} placeholder="Nhập username..."  value={user.username || ""}
                        onChange={(e) => setState( e.target.value,"username" )}
                    />
                </Form.Group>
                {/* PASSWORD */}
                <Form.Group className="mb-3">
                    <Form.Label> Mật khẩu   </Form.Label>
                    <Form.Control    type="password"    required   minLength={6}    placeholder="Nhập password..."    value={user.password || ""}
                        onChange={(e) =>setState( e.target.value, "password" )}
                    />
                </Form.Group>
                <Row>
                    {/* PHONE */}
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>  Số điện thoại </Form.Label>
                            <Form.Control  type="tel"    required    pattern="[0-9]{10}"  maxLength={10}     placeholder="Nhập số điện thoại..."       value={user.phone || ""}
                                onChange={(e) => setState(  e.target.value.replace(/\D/g, ""), "phone" )}
                            />
                        </Form.Group>
                    </Col>
                    {/* EMAIL */}
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label> Email  </Form.Label>
                            <Form.Control  type="email" required  placeholder="Nhập email..."  value={user.email || ""}
                                onChange={(e) =>setState( e.target.value, "email" )}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {/* ROLE */}
                <Form.Group className="mb-3">
                    <Form.Label> Vai trò  </Form.Label>
                    <Form.Select  value={user.role}
                        onChange={(e) => setState( e.target.value, "role" )}
                    >
                        <option value="ROLE_CUSTOMER"> Khách hàng </option>
                        <option value="ROLE_PROVIDER">   Nhà cung cấp  </option>
                    </Form.Select>
                </Form.Group>
                {/* CUSTOMER */}
                {user.role === "ROLE_CUSTOMER" && (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label> Họ và tên     </Form.Label>
                            <Form.Control type="text"    required  placeholder="Nhập họ và tên..."     value={user.fullname || ""}
                                onChange={(e) =>setState(e.target.value, "fullname" ) }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label> Giới tính</Form.Label>
                            <Form.Select required value={user.gender || ""} onChange={(e) => setState(  e.target.value,  "gender")}
                            >
                                <option value="">  Chọn giới tính  </option>
                                <option value="MALE"> Nam  </option>
                                <option value="FEMALE"> Nữ </option>
                            </Form.Select>
                        </Form.Group>
                    </>
                )}
                {/* PROVIDER */}
                {user.role === "ROLE_PROVIDER" && (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>  Mã số thuế  </Form.Label>
                            <Form.Control  type="text"    required   placeholder="Nhập mã số thuế..."      value={user.tax || ""}
                                onChange={(e) =>setState( e.target.value, "tax")}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>  Tên nhà cung cấp </Form.Label>
                            <Form.Control  type="text" required placeholder="Nhập tên doanh nghiệp..."  value={user.businessName || ""}
                                onChange={(e) =>setState( e.target.value, "businessName" )}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>  Địa chỉ  </Form.Label>
                            <Form.Control type="text" required   placeholder="Nhập địa chỉ..."      value={user.address || ""}
                                onChange={(e) => setState(  e.target.value, "address")
                                }
                            />
                        </Form.Group>
                    </>
                )}
                {/* AVATAR */}
                <Form.Group className="mb-4">
                    <Form.Label>  Ảnh đại diện </Form.Label>
                    <Form.Control type="file" accept=".jpg,.jpeg,.png" ref={avatar}   />
                </Form.Group>
                {/* BUTTON */}
                <Button  type="submit" variant="info" disabled={loading} style={styles.button} >
                    {loading  ? "Đang đăng ký...": "Đăng ký"}
                </Button>
            </Form>
        </div>
    );
}
export default Register;