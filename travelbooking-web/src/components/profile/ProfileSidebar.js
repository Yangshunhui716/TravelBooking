import { useContext } from "react";

import { Card, Button } from "react-bootstrap";

import cookies from "react-cookies";

import { useNavigate } from "react-router-dom";

import { MyUserContext } from "../../configs/Context";

const ProfileSidebar = () => {

    const [user, dispatch] = useContext(MyUserContext);

    const nav = useNavigate();

    if (user === null)
        return null;

    const logout = () => {

        cookies.remove("token");

        dispatch({
            type: "LOGOUT"
        });

        nav("/");
    }

    return (
        <Card className="shadow p-4 rounded-4">

            <div className="text-center mb-3">
                <img
                    src={user?.users?.avatar}
                    alt="avatar"
                    width="100"
                />
            </div>

            <h4 className="text-center mb-4">

                {user?.fullname ||
                    user?.businessName ||
                    user?.users?.username}

            </h4>

            {user?.fullname && (
                <>
                    <p>
                        <b>Họ tên:</b> {user?.fullname}
                    </p>

                    <p>
                        <b>Giới tính:</b> {user?.gender}
                    </p>
                </>
            )}

            {user?.businessName && (
                <>
                    <p>
                        <b>Tên công ty:</b> {user?.businessName}
                    </p>

                    <p>
                        <b>Mã số thuế:</b> {user?.tax}
                    </p>

                    <p>
                        <b>Địa chỉ:</b> {user?.address}
                    </p>
                </>
            )}

            <p>
                <b>SĐT:</b> {user?.users?.phone}
            </p>

            <p>
                <b>Email:</b> {user?.users?.email}
            </p>

            <div className="d-flex justify-content-between mt-3">

                <Button variant="primary">
                    Sửa thông tin
                </Button>

                <Button
                    variant="danger"
                    onClick={logout}
                >
                    Đăng xuất
                </Button>

            </div>

        </Card>
    );
}

export default ProfileSidebar;