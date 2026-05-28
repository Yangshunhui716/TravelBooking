import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";
import MySpinner from "../../components/MySpinner";
import Apis, { endpoints } from "../../configs/Api";
import SortDropdown from "../../components/SortDropdown";

const TourService = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
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
    const loadTours = async () => {
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
                {
                    params: params
                }
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
                onView: () => {
                    console.log("Xem tour:", tour.id);
                }

            }));
            setTours(mappedTours);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadTours();
    }, [filters, sort]);
    // FILTER
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
            <div className="d-flex justify-content-between align-items-center mb-3">
            </div>
             {loading && <MySpinner />}
            <ServiceList
                title="Danh sách Tour"
                items={tours}
                sortCategory="slot"
                currentSort={sort}
                onSortChange={setSort}
            />
            </div>

        </div>
    );
};

export default TourService;