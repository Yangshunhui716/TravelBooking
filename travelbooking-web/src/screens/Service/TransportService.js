import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";

import Apis, { endpoints } from "../../configs/Api";

const TransportService = () => {

    const [transports, setTransports] = useState([]);
    const [loading, setLoading] = useState(false);

    // format tiền
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };

    // format ngày
    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString("vi-VN");
    };

    // format giờ
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const loadTransports = async () => {

        try {

            setLoading(true);

            let res = await Apis.get(endpoints['transport-services']);

            // MAP API -> CARD DATA
            const mappedTransports = res.data.map((transport) => ({

                id: transport.id,

                title: transport.services?.name,

                badge: transport.transportType,

                image: transport.services?.imgUrl,

                price: formatPrice(transport.services?.price),

                details: [
                    `Tuyến: ${transport.departureLocation} → ${transport.endLoaction}`,
                    `Khởi hành: ${formatDate(transport.departureTime)} ${formatTime(transport.departureTime)}`,
                    `Số chỗ còn: ${transport.services?.availableSlots}`
                ],

                onView: () => {
                    console.log("Xem phương tiện:", transport.id);
                }

            }));

            setTransports(mappedTransports);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        loadTransports();
    }, []);

    // FILTER
    const transportConfig = [
        {
            key: "departureLocation",
            label: "Điểm khởi hành",
            type: "text"
        },
        {
            key: "destination",
            label: "Điểm đến",
            type: "text"
        },
        {
            key: "departureDate",
            label: "Ngày khởi hành",
            type: "date"
        },
        {
            key: "transportType",
            label: "Loại phương tiện",
            type: "select",
            options: [
                { label: "Xe khách", value: "BUS" },
                { label: "Máy bay", value: "PLANE" },
                { label: "Tàu hỏa", value: "TRAIN" }
            ]
        }
    ];

    const handleFilter = (values) => {
        console.log(values);
    };

    if (loading)
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        );

    return (

        <div className="d-flex p-4 gap-4">

            {/* FILTER */}
            <DynamicFilter
                config={transportConfig}
                onFilterSubmit={handleFilter}
            />

            {/* LIST */}
            <div className="flex-grow-1">

                <ServiceList
                    title="Danh sách Phương tiện"
                    items={transports}
                    sortCategory="slot" 
                />

            </div>

        </div>
    );
};

export default TransportService;