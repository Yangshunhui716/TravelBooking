import React, { useEffect, useState } from "react"; // Xóa bỏ hoàn toàn useCallback cho nhẹ máy
import { useNavigate, useSearchParams } from "react-router-dom";

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";
import MySpinner from "../../components/MySpinner";
import Apis, { endpoints } from "../../configs/Api";

const TourService = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams(); // Giống biến 'q' của thầy
    const navigate = useNavigate();

    // format tiền
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };
    
    // format ngày
    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString("vi-VN");
    };

    // 1. Viết hàm async thường giống hệt thầy (không bọc useCallback)
    const loadTours = async () => {
        try {
            setLoading(true);
            let params = {};
            
            // Đọc tham số trực tiếp từ URL xuống giống cách thầy làm với cateId, kw
            const destination = searchParams.get("destination");
            const departureDate = searchParams.get("departureDate");
            const sort = searchParams.get("sort") || "";
            
            if (destination) params.destination = destination;
            if (departureDate) params.departureTime = departureDate;
                
            switch (sort) {
                case "price_asc":   params.price = "asc"; break;
                case "price_desc":  params.price = "desc"; break;
                case "slot_asc":    params.slot = "asc"; break;
                case "slot_desc":   params.slot = "desc"; break;
                default: break;
            }

            let res = await Apis.get(
                endpoints['tour-services'],
                { params: params }
            );
            
            const mappedTours = res.data.map((tour) => ({
                id: tour.id,
                title: tour.services?.name,
                badge: `${tour.durationDays} ngày`,
                image: tour.services?.imgUrl,
                price: formatPrice(tour.services?.price),
                details: [
                    `Điểm đến: ${tour.services?.destination}`,
                    `Khởi hành: ${formatDate(tour.departureTime)}`,
                    `Số chỗ: ${tour.services?.availableSlots}`
                ],
                onView: () => navigate(`/tour-services/${tour.id}`)
            }));
            
            setTours(mappedTours);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // 2. useEffect CHỈ lắng nghe searchParams (URL thay đổi thì load lại dữ liệu)
    // Tuyệt đối không bỏ 'loadTours' vào mảng này giống hệt thầy của bạn
    useEffect(() => {
        loadTours();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]); 

    // CONFIG CHO FILTER
    const tourConfig = [
        { key: "destination", label: "Điểm đến", type: "text" },
        { key: "departureDate", label: "Ngày khởi hành", type: "date" }
    ];

    const handleFilter = (values) => {
        const newParams = new URLSearchParams(searchParams);
        if (values.destination) newParams.set("destination", values.destination);
        else newParams.delete("destination");

        if (values.departureDate) newParams.set("departureDate", values.departureDate);
        else newParams.delete("departureDate");

        setSearchParams(newParams);
    };

    const handleSortChange = (sortValue) => {
        const newParams = new URLSearchParams(searchParams);
        if (sortValue) newParams.set("sort", sortValue);
        else newParams.delete("sort");
        setSearchParams(newParams);
    };

    return (
        <div className="d-flex p-4 gap-4">
            <DynamicFilter
                config={tourConfig}
                onFilterSubmit={handleFilter}
            />
            
            <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-3"></div>
                
                {loading && <MySpinner />}
                
                <ServiceList
                    title="Danh sách Tour"
                    items={tours}
                    sortCategory="slot"
                    currentSort={searchParams.get("sort") || ""}
                    onSortChange={handleSortChange}
                />
            </div>
        </div>
    );
};

export default TourService;