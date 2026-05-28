import React, { useEffect, useState } from "react";

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";
import MySpinner from "../../components/MySpinner";

import Apis, { endpoints } from "../../configs/Api";
const HotelRoomService = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("");
    // format tiền
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };
    const loadRooms = async () => {
        try {
            setLoading(true);
            let params = {};
            // FILTER
            if (filters.destination)
                  params.destination = filters.destination;
            if (filters.checkInDate)
                params.startDate = filters.checkInDate;
            if (filters.checkOutDate)
                params.endDate = filters.checkOutDate;
            // SORT
            switch (sort) {
                case "price_asc":
                    params.price = "asc";
                    break;
                case "price_desc":
                    params.price = "desc";
                    break;
                case "rating_asc":
                    params.rate = "asc";
                    break;
                case "rating_desc":
                    params.rate = "desc";
                    break;
                default:
                    break;
            }
            let res = await Apis.get(
                endpoints['hotel-room-services'],
                {
                    params: params
                }
            );
            // MAP API -> CARD DATA
            const mappedRooms = res.data.map((room) => ({
                id: room.id,
                title: room.services?.name,
                badge: "Khách sạn",
                image: room.services?.imgUrl,
                price: formatPrice(room.services?.price),
                details: [
                    `Khách sạn: ${room.hotelName}`,
                    `Địa chỉ: ${room.address}`,
                    `Số phòng còn: ${room.services?.availableSlots}`
                ],
                onView: () => {
                    console.log("Xem phòng:", room.id);
                }

            }));
            setRooms(mappedRooms);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadRooms();
    }, [filters, sort]);
    // FILTER
    const hotelConfig = [
        {
            key: "destination",
            label: "Địa điểm",
            type: "text"
        },
        {
            key: "checkInDate",
            label: "Ngày nhận phòng",
            type: "date"
        },
        {
            key: "checkOutDate",
            label: "Ngày trả phòng",
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
                config={hotelConfig}
                onFilterSubmit={handleFilter}
            />
            {/* LIST */}
            <div className="flex-grow-1">
                    {loading && <MySpinner />}
                <ServiceList
                    title="Danh sách Phòng khách sạn"
                    items={rooms}
                    sortCategory="rating"
                    currentSort={sort}
                    onSortChange={setSort}
                />

            </div>

        </div>
    );
};

export default HotelRoomService;