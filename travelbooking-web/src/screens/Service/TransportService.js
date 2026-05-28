import React, { useEffect, useState } from "react";

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";
import MySpinner from "../../components/MySpinner";

import Apis, { endpoints } from "../../configs/Api";
const TransportService = () => {
    const [transports, setTransports] = useState([]);
    const [loading, setLoading] = useState(false);
    // FILTER + SORT
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("");
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
            let params = {};
            // ================= FILTER =================
            if (filters.departureLocation)
                params.departureLocation = filters.departureLocation;
            if (filters.destination)
                params.destination = filters.destination;
            if (filters.departureDate)
                params.departureTime = filters.departureDate;
            if (filters.transportType)
                params.transportType = filters.transportType;
            // ================= SORT =================
            switch (sort) {
                case "price_asc":
                    params.price = "asc";
                    break;
                case "price_desc":
                    params.price = "desc";
                    break;
                case "slot_asc":
                    params.slot = "asc";
                    break;
                case "slot_desc":
                    params.slot = "desc";
                    break;
                default:
                    break;
            }
            let res = await Apis.get(
                endpoints['transport-services'],
                {
                    params: params
                }
            );
            console.log("PARAMS:", params);
            console.log("DATA:", res.data);
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
                    `Điểm đến: ${transport.services?.destination}`,
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
    }, [filters, sort]);

    // FILTER CONFIG
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
    // FILTER
    const handleFilter = (values) => {
        setFilters(values);
    };
    return (

        <div className="d-flex p-4 gap-4">
            {/* FILTER */}
            <DynamicFilter
                config={transportConfig}
                onFilterSubmit={handleFilter}
            />
            {/* LIST */}
            <div className="flex-grow-1">
                 {loading && <MySpinner />}
                <ServiceList
                    title="Danh sách Phương tiện"
                    items={transports}
                    sortCategory="slot"
                    currentSort={sort}
                    onSortChange={setSort}
                />
            </div>
        </div>
    );
};

export default TransportService;