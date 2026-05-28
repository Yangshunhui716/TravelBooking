import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";

import Apis, { endpoints } from "../../configs/Api";

const TourService = () => {

    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);

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

            let res = await Apis.get(endpoints['tour-services']);

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
    }, []);

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
                    config={tourConfig}
                    onFilterSubmit={handleFilter}
                />

            {/* LIST */}
            <div className="flex-grow-1">

                <ServiceList
                    title="Danh sách Tour"
                    items={tours}
                    sortCategory="slot" 
                />

            </div>

        </div>
    );
};

export default TourService;