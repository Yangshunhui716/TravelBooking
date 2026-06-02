import React, { useEffect, useState } from "react"; 
import { useNavigate, useSearchParams } from "react-router-dom"; 

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";
import MySpinner from "../../components/MySpinner";
import Apis, { endpoints } from "../../configs/Api";

const TransportService = () => {
    const [transports, setTransports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams(); 
    const [page, setPage] = useState(1); // Thêm state quản lý số trang giống Tour
    const navigate = useNavigate();

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

    const loadTransports = async () => {
        try {
            setLoading(true);
            let params = { page: page }; // Gửi kèm số trang lên Back-end

            // Đọc trực tiếp các tham số lọc từ URL xuống
            const departureLocation = searchParams.get("departureLocation");
            const destination = searchParams.get("destination");
            const departureDate = searchParams.get("departureDate");
            const transportType = searchParams.get("transportType");
            const sort = searchParams.get("sort") || "";

            // Đóng gói gửi lên Backend API nếu tồn tại trên URL
            if (departureLocation) params.departureLocation = departureLocation;
            if (destination) params.destination = destination;
            if (departureDate) params.departureTime = departureDate;
            if (transportType) params.transportType = transportType;

            // Xử lý Sort
            switch (sort) {
                case "price_asc":   params.price = "asc"; break;
                case "price_desc":  params.price = "desc"; break;
                case "slot_asc":    params.slot = "asc"; break;
                case "slot_desc":   params.slot = "desc"; break;
                default: break;
            }

            let res = await Apis.get(
                endpoints['transport-services'],
                { params: params }
            );

            if (res.data.length === 0) {
                setPage(0); // Đánh dấu hết dữ liệu để ẩn nút Xem thêm
                return;
            }

            // MAP API -> CARD DATA
            const mappedTransports = res.data.map((transport) => ({
                id: transport.id,
                title: transport.services?.name, 
                badge: transport.transportType === "BUS" ? "Xe khách" : 
                       transport.transportType === "PLANE" ? "Máy bay" : "Tàu hỏa",
                image: transport.services?.imgUrl,
                price: formatPrice(transport.services?.price),
                details: [
                    `Tuyến: ${transport.departure} → ${transport.services?.destination || ""}`,
                    `Chi tiết: ${transport.loactionDetail || "Chưa cập nhật"}`,
                    `Khởi hành: ${formatTime(transport.departureTime)} - ${formatDate(transport.departureTime)}`,
                    `Số chỗ còn: ${transport.services?.availableSlots || 0} chỗ`
                ],
                onView: () => navigate(`/transport-services/${transport.id}`)
            }));

            // Xử lý nạp dữ liệu chuẩn theo page giống Tour và giống thầy
            if (page === 1) {
                setTransports(mappedTransports); // Trang đầu hoặc lọc mới thì thay thế hoàn toàn
            } else if (page > 1) {
                setTransports(prev => [...prev, ...mappedTransports]); // Các trang sau thì cộng dồn mảng
            }
        } catch (err) {
            console.error("Lỗi khi tải danh sách phương tiện:", err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (page > 0) {
            loadTransports();
        }
    }, [searchParams, page]); 

    useEffect(() => {
        setPage(1);
    }, [searchParams]);


    const handleLoadMore = () => {
        if (page > 0 && !loading) {
            setPage(page + 1);
        }
    };

    // CẤU HÌNH BỘ LỌC (FILTER CONFIG)
    const transportConfig = [
        { key: "departureLocation", label: "Điểm khởi hành", type: "text" },
        { key: "destination", label: "Điểm đến", type: "text" },
        { key: "departureDate", label: "Ngày khởi hành", type: "date" },
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

    // Đẩy các tham số lọc lên URL khi nhấn nút Submit bộ lọc
    const handleFilter = (values) => {
        const newParams = new URLSearchParams(searchParams);
        
        if (values.departureLocation) newParams.set("departureLocation", values.departureLocation);
        else newParams.delete("departureLocation");

        if (values.destination) newParams.set("destination", values.destination);
        else newParams.delete("destination");

        if (values.departureDate) newParams.set("departureDate", values.departureDate);
        else newParams.delete("departureDate");

        if (values.transportType) newParams.set("transportType", values.transportType);
        else newParams.delete("transportType");

        setSearchParams(newParams);
    };

    // Đẩy tham số sắp xếp lên URL khi bấm đổi Sort dropdown
    const handleSortChange = (sortValue) => {
        const newParams = new URLSearchParams(searchParams);
        if (sortValue) newParams.set("sort", sortValue);
        else newParams.delete("sort");
        setSearchParams(newParams);
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
                    <div className="d-flex justify-content-between align-items-center mb-3"></div>
                    {loading && transports.length === 0 && <MySpinner />}
                    <ServiceList
                        title="Danh sách Phương tiện"
                        items={transports}
                        sortCategory="slot"
                        currentSort={searchParams.get("sort") || ""}
                        onSortChange={handleSortChange}
                        page={page}
                        loading={loading}
                        onLoadMore={handleLoadMore}
                    />
                </div>
        </div>
    );
};

export default TransportService;