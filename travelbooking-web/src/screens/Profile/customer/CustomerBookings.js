import { useEffect, useState } from "react";

import { Card, Spinner, Alert } from "react-bootstrap";

import { authApis, endpoints } from "../../../configs/Api";

const CustomerBookings = () => {

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(false);

    const loadBookings = async () => {

        try {

            setLoading(true);

            let res = await authApis().get(
                endpoints["customer-bookings"]
            );

            console.log(res.data);

            if (Array.isArray(res.data))
                setBookings(res.data);
            else
                setBookings([]);

        } catch (ex) {

            console.error(ex);

            setBookings([]);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {
        loadBookings();
    }, []);

    return (
        <Card className="shadow rounded-4 p-4">

            <h3 className="mb-4">
                Lịch sử booking
            </h3>

            {loading && (
                <Spinner animation="border" />
            )}

            {!loading &&
                bookings.length === 0 && (
                    <Alert variant="info">
                        Chưa có booking nào!
                    </Alert>
                )
            }

            {Array.isArray(bookings) &&
                bookings.map(b => (

                    <Card
                        key={b.id}
                        className="p-3 mb-3"
                    >

                        <h5>
                            Booking #{b.id}
                        </h5>

                        <p>
                            Tổng tiền:
                            {" "}
                            {b.totalAmount}
                        </p>

                        <p>
                            Trạng thái:
                            {" "}
                            {b.bookingStatus}
                        </p>

                        <p>
                            Thanh toán:
                            {" "}
                            {b.paymentStatus}
                        </p>

                    </Card>
                ))
            }

        </Card>
    );
}

export default CustomerBookings;