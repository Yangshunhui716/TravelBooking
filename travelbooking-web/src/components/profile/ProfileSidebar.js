import { useContext, useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import cookies from "react-cookies";
import { useNavigate } from "react-router-dom";
import { MyUserContext } from "../../configs/Context";
import { authApis, endpoints } from "../../configs/Api";
import MySpinner from "../MySpinner";

const ProfileSidebar = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const nav = useNavigate();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [formData, setFormData] = useState({
        fullname: "",
        gender: "",
        businessName: "",
        tax: "",
        address: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                fullname: user.fullname || "",
                gender: user.gender || "",
                businessName: user.businessName || "",
                tax: user.tax || "",
                address: user.address || "",
                phone: user.users.phone || "",
                email: user.users.email || "",
            });
        }else {
            return;
        }
    }, [user]);
    
    const isProvider = user.users.role === "ROLE_PROVIDER";

    const change = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const logout = () => {
        cookies.remove("token");
        dispatch({
            type: "LOGOUT"
        });
        nav("/");
    };

    const saveProfile = async () => {
        try {
            setLoading(true);
            const url = isProvider ? endpoints["provider-profile"]: endpoints["customer-profile"];
            let payload = {};

            if (isProvider) {
                payload = {
                    business_name:  formData.businessName,
                    tax: formData.tax,
                    address: formData.address,
                    phone: formData.phone,
                    email: formData.email
                };
            }
            else {
                payload = {
                    fullname: formData.fullname,
                    gender: formData.gender,
                    phone: formData.phone,
                    email: formData.email
                };
            }

            if (avatarFile && avatarFile !== user.users?.avatar) {
                const form = new FormData();
                form.append("avatar", avatarFile);
                await authApis().patch(endpoints["user-avatar"], form);
            }

            const res = await authApis().patch( url, payload);

            dispatch({
                type: "LOGIN",
                payload: {
                    ...user,
                    ...res.data
                }
            });
            setEditing(false);
            setAvatarFile(null);
            alert("Cập nhật thành công!");
        } catch (err) {
            console.log("FULL ERROR:", err);
            if (err.response) {
                console.log( "STATUS:",err.response.status);
                console.log("DATA:", err.response.data );
            }

            if (err.request) {
                console.log( "REQUEST:",  err.request
                );
            }
            alert("Cập nhật thất bại!");
        } finally {
            setLoading(false);
        }
    };
    return (
        <Card className="shadow p-4 rounded-4">
            <div className="text-center mb-3">
                <img
                    src={
                        avatarFile? URL.createObjectURL(avatarFile): user.users.avatar
                    }
                    alt="avatar"
                    width="100"
                    height="100"
                    style={{
                        objectFit: "cover",
                        borderRadius: "50%"
                    }}
                />

            </div>

            {editing && (
                <Form.Group className="mb-3">
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setAvatarFile(
                                e.target.files[0]
                            )
                        }
                    />
                </Form.Group>
            )}

            <h4 className="text-center mb-4">
                {isProvider ? formData.businessName: formData.fullname ||user.users.username}
            </h4>

            {isProvider ? (
                <>
                    <div className="mb-3">
                        <b>Tên công ty:</b>
                        {editing ? (
                            <Form.Control
                                type="text"
                                name="businessName"
                                value={formData.businessName}
                                onChange={change}
                                className="mt-2"
                            />
                        ) : (
                            <p>
                                {user?.businessName}
                            </p>
                        )}

                    </div>
                    <div className="mb-3">
                        <b>Mã số thuế:</b>
                        {editing ? (
                            <Form.Control
                                type="text"
                                name="tax"
                                value={formData.tax}
                                onChange={change}
                                className="mt-2"
                            />
                        ) : (
                            <p>{user?.tax}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <b>Địa chỉ:</b>
                        {editing ? (
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={change}
                                className="mt-2"
                            />
                        ) : (
                            <p>
                                {user?.address}
                            </p>
                        )}

                    </div>
                </>
            ) : (
                <>
                    <div className="mb-3">
                        <b>Họ tên:</b>
                        {editing ? (
                            <Form.Control
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={change}
                                className="mt-2"
                            />
                        ) : (
                            <p>
                                {user?.fullname}
                            </p>
                        )}

                    </div>
                    <div className="mb-3">
                        <b>Giới tính:</b>
                        {editing ? (
                            <Form.Select
                                name="gender"
                                value={ formData.gender}
                                onChange={change}
                                className="mt-2"
                            >
                                <option value="Male"> Nam</option>
                                <option value="Female">Nữ </option>
                            </Form.Select>
                        ) : (
                            <p> {user?.gender} </p>
                        )}
                    </div>
                </>
            )}

            <div className="mb-3">
                <b>SĐT:</b>
                {editing ? (
                    <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={change}
                        className="mt-2"
                    />
                ) : (
                    <p> {user?.users?.phone}</p>
                )}

            </div>

            <div className="mb-3">
                <b>Email:</b>
                {editing ? (
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={change}
                        className="mt-2"
                    />
                ) : (
                    <p>     {user?.users?.email} </p>
                )}
            </div>

            <div className="d-flex justify-content-between mt-4">
                {editing ? (
                    <Button
                        variant="success"
                        onClick={saveProfile}
                        disabled={loading}
                    >
                        {loading ? "Đang lưu..." : "Lưu"}
                    </Button>
                ) : (
                    <Button variant="primary" onClick={() =>setEditing(true) }>  Sửa thông tin </Button>
                )}
                {editing ? (
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setEditing(false);
                            setAvatarFile(null);
                        }}
                    >
                        Hủy
                    </Button>
                ) : (
                    <Button
                        variant="danger"
                        onClick={logout}
                    >
                        Đăng xuất
                    </Button>
                )}
            </div>
        </Card>
    );
};
export default ProfileSidebar;