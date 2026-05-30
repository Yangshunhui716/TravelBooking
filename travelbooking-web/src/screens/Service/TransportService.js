import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import hook điều hướng

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";
import MySpinner from "../../components/MySpinner";
import Apis, { endpoints } from "../../configs/Api";

const TransportService = () => {
    const [transports, setTransports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("");
    
    const navigate = useNavigate(); // Khởi tạo điều hướng

    // Format tiền tệ
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };

    // Format ngày khởi hành
    const formatDate = (timestamp) => {
        if (!timestamp) return "";
        return new Date(timestamp).toLocaleDateString("vi-VN");
    };

    // Format giờ khởi hành
    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        return new Date(timestamp).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    // Bọc hàm loadTransports bằng useCallback để tối ưu hóa hiệu năng và dependency
    const loadTransports = useCallback(async () => {
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
                { params: params }
            );

            // ================= MAP API -> CARD DATA =================
            const mappedTransports = res.data.map((transport) => ({
                id: transport.id,
                title: transport.services?.name, // Tên nhà xe (Ví dụ: Nhà xe Phương Trang)
                badge: transport.transportType === "BUS" ? "Xe khách" : 
                       transport.transportType === "PLANE" ? "Máy bay" : "Tàu hỏa",
                image: transport.services?.imgUrl,
                price: formatPrice(transport.services?.price),
                details: [
                    // Sửa lại theo đúng trường JSON thực tế: transport.departure và transport.services?.destination
                    `Tuyến: ${transport.departure} → ${transport.services?.destination || ""}`,
                    `Chi tiết: ${transport.loactionDetail || "Chưa cập nhật"}`,
                    `Khởi hành: ${formatTime(transport.departureTime)} - ${formatDate(transport.departureTime)}`,
                    `Số chỗ còn: ${transport.services?.availableSlots || 0} chỗ`
                ],
                // Hàm điều hướng chính xác sang trang chi tiết phương tiện vận chuyển
                onView: () => navigate(`/transport-services/${transport.id}`)
            }));

            setTransports(mappedTransports);
        } catch (err) {
            console.error("Lỗi khi tải danh sách phương tiện:", err);
        } finally {
            setLoading(false);
        }
    }, [filters, sort, navigate]);

    // Gọi lại API khi filter hoặc sort thay đổi mà không lo bị loop vô hạn
    useEffect(() => {
        loadTransports();
    }, [loadTransports]);

    // CẤU HÌNH BỘ LỌC (FILTER CONFIG)
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
        setFilters(values);
    };

    return (
        <div className="d-flex p-4 gap-4">
            {/* COMPONENT BỘ LỌC */}
            <DynamicFilter
                config={transportConfig}
                onFilterSubmit={handleFilter}
            />

            {/* COMPONENT DANH SÁCH */}
            <div className="flex-grow-1">
                {loading && <MySpinner />}
                
                <ServiceList
                    title="Danh sách Phương tiện"
                    items={transports}
                    sortCategory="slot"
                    currentSort={sort}
                    onSortChange={setSort}
                />
                 {loading && <MySpinner />}
            </div>
        </div>
    );
};

export default TransportService;