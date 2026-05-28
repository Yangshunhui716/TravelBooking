import { useEffect, useState } from "react";

import { Card, Button, Spinner } from "react-bootstrap";

import { authApis, endpoints } from "../../../configs/Api";
const ProviderServices = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadServices = async () => {

        try {

            setLoading(true);

            let res = await authApis().get(
                endpoints["provider-services"]
            );

            setServices(res.data);

        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }
     useEffect(() => {
        loadServices();
    }, []);

    return (
        <Card className="shadow rounded-4 p-4">

            <div className="d-flex justify-content-between mb-4">

                <h3>
                    Danh sách dịch vụ
                </h3>

                <Button>
                    Thêm dịch vụ mới
                </Button>

            </div>

            {loading && <Spinner animation="border" />}

            {services.map(s => (

                <Card
                    key={s.id}
                    className="p-3 mb-3"
                >

                    <div className="d-flex justify-content-between">

                        <div>
                            <h5>{s.name}</h5>
                            <p>Giá: {s.price}</p>
                            <p>Trạng thái: {s.status}</p>
                        </div>

                        <div>
                            <Button
                                variant="info"
                                className="me-2"
                            >
                                DS khách hàng
                            </Button>

                            <Button variant="primary">
                                Xem chi tiết
                            </Button>
                        </div>

                    </div>

                </Card>

            ))}

        </Card>
    );
}

export default ProviderServices;