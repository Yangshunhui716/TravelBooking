import { useEffect, useState } from "react";
import { Button, Container, Image, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MySpinner from "../../components/MySpinner";
import { authApis, endpoints } from "../../configs/Api";
import styles from "./ListCustomerStyle";

const ListCustomer = () => {
    const { idservice } = useParams();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleChat = (email) => {
        alert(`Bắt đầu cuộc trò chuyện với: ${email}`);
    };

    return (
        <Container className="mt-3">
            <h2 className="mb-4" style={styles.title}>Danh sách khách hàng đã sử dụng</h2>

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
                                    const [name, gender, phone, email, avatar] = customer;

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
                                                    onClick={() => handleChat(email)}
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