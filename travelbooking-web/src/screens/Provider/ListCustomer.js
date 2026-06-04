import { useEffect, useState } from "react";
import { Button, Container, Image, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MySpinner from "../../components/MySpinner";
import { authApis, endpoints } from "../../configs/Api";
import styles from "./ListCustomerStyle";
import StaticStyle from "../StaticStyle";

const ListCustomer = () => {
    const { idservice } = useParams();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const loadCustomers = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(endpoints['provider-customers'](idservice));
            setCustomers(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (idservice) {
            loadCustomers();
        }
    }, [idservice]);

    const handleChat =  async (id) => {
        if (id) {
            let conversation = await authApis().post(endpoints["conversation-create"](id));
            nav("/conversations", { state: { conversationId: conversation.data.id } });
        }
    };

    return (
        <Container className="mt-5" style={StaticStyle.baseHeight}>
            <h3 className="fw-bold text-dark mb-4 text-center text-sm-start text-uppercase">Danh sách khách hàng đã đặt dịch vụ</h3>

            {loading && <MySpinner />}

            {!loading && (
                <div style={styles.tableResponsive}>
                    <Table bordered hover style={styles.table}>
                        <thead>
                            <tr className="text-center align-middle">
                                <th style={styles.thWidthSm}>STT</th>
                                <th>Ảnh khách hàng</th>
                                <th>Tên khách hàng</th>
                                <th>Giới tính</th>
                                <th>SĐT</th>
                                <th>Email</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length > 0 ? (
                                customers.map((customer, index) => {
                                    const [id, name, gender, phone, email, avatar] = customer;
                                    return (
                                        <tr key={index} className="align-middle">
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">
                                                <Image 
                                                    src={avatar} 
                                                    style={styles.avatar} 
                                                    roundedCircle 
                                                    fallback="https://via.placeholder.com/50"
                                                />
                                            </td>
                                            <td>{name}</td>
                                            <td className="text-center">{gender}</td>
                                            <td className="text-center">{phone}</td>
                                            <td>{email}</td>
                                            <td className="text-center">
                                                <Button 
                                                    variant="outline-dark" 
                                                    size="sm"
                                                    onClick={() => handleChat(id)}
                                                >
                                                    Chat
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted py-4">
                                        Chưa có khách hàng nào sử dụng dịch vụ này.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
};

export default ListCustomer;