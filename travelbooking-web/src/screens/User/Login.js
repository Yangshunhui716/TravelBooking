import { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import cookies from "react-cookies";
import Apis, { authApis, endpoints } from "../../configs/Api";
import { MyUserContext } from "../../configs/Context";
import MySpinner from "../../components/MySpinner";
import styles from "./UserStyle";
import { auth } from "../../configs/FirebaseConfig";
import { signInWithCustomToken } from "firebase/auth";

const Login = () => {

    const fields = [{
        field: "username",
        title: "Tên đăng nhập",
        type: "text"
    }, {
        field: "password",
        title: "Mật khẩu",
        type: "password"
    }];

    const [user, setUser] = useState({});
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    const [, dispatch] = useContext(MyUserContext);
    const [q] = useSearchParams();
    const validate = () => {

        for (let f of fields) {
            if (!(f.field in user) || !user[f.field]) {
                setErr(`Vui lòng nhập ${f.title}!`);
                return false;
            }
        }

        return true;
    }

    const login = async (e) => {
        e.preventDefault();

        if (validate() === true) {

            try {
                setLoading(true);
                setErr("");

                // LOGIN
                let res = await Apis.post(endpoints["login"], {
                    ...user
                });

                // SAVE TOKEN
                cookies.save("token", res.data.token);

                let u = null;

                try {

                    // CUSTOMER
                    u = await authApis().get(
                        endpoints["customer-profile"]
                    );

                } catch (err) {

                    try {

                        // PROVIDER
                        u = await authApis().get(
                            endpoints["provider-profile"]
                        );

                    } catch (ex) {
                        console.error(ex);
                    }
                }
                cookies.save("user", u.data);

                dispatch({
                    "type": "LOGIN",
                    "payload": u.data
                });

                let firebaseToken = await authApis().get(endpoints["firebase-token"]);
                try {
                    await signInWithCustomToken(auth, firebaseToken.data);
                    cookies.save("firebase-token", firebaseToken.data);
                } catch (error) {
                    console.error("Lỗi khi đăng nhập Firebase:", error);
                }
                
                let next = q.get("next");
                if (next) nav(next);
                else nav("/");

            } catch (ex) {

                console.error(ex);

                setErr("Sai tài khoản hoặc mật khẩu!");

            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div style={styles.container}>

            <h1 style={styles.title}>
                ĐĂNG NHẬP
            </h1>

            {err && (
                <Alert variant="danger">
                    {err}
                </Alert>
            )}

            <Form onSubmit={login}>

                {fields.map(f => (
                    <Form.Group
                        key={f.field}
                        className="mb-3"
                    >

                        <Form.Label>
                            {f.title}
                        </Form.Label>

                        <Form.Control
                            type={f.type}
                            placeholder={f.title}
                            value={user[f.field] || ""}
                            onChange={(e) => setUser({
                                ...user,
                                [f.field]: e.target.value
                            })}
                        />

                    </Form.Group>
                ))}

                <Form.Group className="mb-3" controlId="button">
                    {loading === true ? <MySpinner />:<Button variant="success" type="submit">Đăng nhập</Button>}
                </Form.Group>

            </Form>

        </div>
    );
}

export default Login;