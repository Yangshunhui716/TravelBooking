import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";

import Apis, { endpoints } from "../../configs/Api";

const HotelRoomService = () => {

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    // format tiền
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };

    const loadRooms = async () => {

        try {

            setLoading(true);

            let res = await Apis.get(endpoints['hotel-room-services']);

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
    }, []);

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
                config={hotelConfig}
                onFilterSubmit={handleFilter}
            />

            {/* LIST */}
            <div className="flex-grow-1">

                <ServiceList
                    title="Danh sách Phòng khách sạn"
                    items={rooms}
                />

            </div>

        </div>
    );
};

export default HotelRoomService;