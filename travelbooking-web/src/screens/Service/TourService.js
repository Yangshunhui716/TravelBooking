import React, { useEffect, useState, useCallback } from "react"; // 1. Thêm useCallback ở đây
import { useNavigate } from "react-router-dom";

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";
import MySpinner from "../../components/MySpinner";
import Apis, { endpoints } from "../../configs/Api";
// Xóa bớt import Spinner và SortDropdown thừa tại đây

const TourService = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("");
    
    const navigate = useNavigate();

    // format tiền
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };
    
    // format ngày
    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString("vi-VN");
    };

    // 2. Bọc hàm loadTours trong useCallback để tối ưu dependency
    const loadTours = useCallback(async () => {
        try {
            setLoading(true);
            let params = {};
            
            // FILTER
            if (filters.destination)
                params.destination = filters.destination;
            if (filters.departureDate)
                params.departureTime = filters.departureDate;
                
            // SORT
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
                endpoints['tour-services'],
                { params: params }
            );
            
            // MAP API -> CARD DATA
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
    }, [filters, sort, navigate]); // Hàm sẽ chỉ đổi khi filters, sort hoặc navigate thay đổi

    // 3. Thêm loadTours vào mảng dependency một cách an toàn
    useEffect(() => {
        loadTours();
    }, [loadTours]);

    // CONFIG CHO FILTER
    const tourConfig = [
        {
            key: "destination",
            label: "Điểm đến",
            type: "text"
        },
        {
            key: "departureDate",
            label: "Ngày khởi hành",
            type: "date"
        }
    ];

    const handleFilter = (values) => {
        setFilters(values);
    };

    return (
        <div className="d-flex p-4 gap-4">
            {/* FILTER */}
            <DynamicFilter
                config={tourConfig}
                onFilterSubmit={handleFilter}
            />
            
            {/* LIST */}
            <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-3"></div>
                
<<<<<<< HEAD
                {loading && <MySpinner />}
=======
               
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
                
                <ServiceList
                    title="Danh sách Tour"
                    items={tours}
                    sortCategory="slot"
                    currentSort={sort}
                    onSortChange={setSort}
<<<<<<< HEAD
                />
=======
                /> {loading && <MySpinner />}
>>>>>>> 7b11bc724eb58226cddc55d18276d10a249f14bb
            </div>
        </div>
    );
};

export default TourService;