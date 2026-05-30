import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import hook điều hướng

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";
import MySpinner from "../../components/MySpinner";
import Apis, { endpoints } from "../../configs/Api";

const HotelRoomService = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("");
    
    const navigate = useNavigate(); // Khởi tạo điều hướng

    // Định dạng hiển thị giá tiền lẻ VNĐ
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };

    // Bọc logic tải phòng trong useCallback để tối ưu hóa mảng dependency
    const loadRooms = useCallback(async () => {
        try {
            setLoading(true);
            let params = {};

            // ================= FILTER =================
            if (filters.destination)
                params.destination = filters.destination;
            if (filters.checkInDate)
                params.startDate = filters.checkInDate;
            if (filters.checkOutDate)
                params.endDate = filters.checkOutDate;

            // ================= SORT =================
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
                { params: params }
            );

            // ================= MAP API -> CARD DATA =================
            const mappedRooms = res.data.map((room) => ({
                id: room.id,
                title: room.services?.name, // Tên loại phòng (Ví dụ: Phòng Deluxe Ocean View)
                badge: "Khách sạn",
                image: room.services?.imgUrl,
                price: formatPrice(room.services?.price),
                details: [
                    `Khách sạn: ${room.hotelName}`,
                    `Địa chỉ: ${room.address}`,
                    `Số phòng còn: ${room.services?.availableSlots || 0} phòng`
                ],
                // Hành động điều hướng trực tiếp khi người dùng click xem chi tiết card phòng
                onView: () => navigate(`/hotel-room-services/${room.id}`)
            }));

            setRooms(mappedRooms);
        } catch (err) {
            console.error("Lỗi khi tải danh sách phòng khách sạn:", err);
        } finally {
            setLoading(false);
        }
    }, [filters, sort, navigate]);

    // Lắng nghe thay đổi của bộ lọc và bộ sắp xếp để tự động nạp lại dữ liệu an toàn
    useEffect(() => {
        loadRooms();
    }, [loadRooms]);

    // CẤU HÌNH BỘ LỌC TÌM KIẾM PHÒNG (FILTER CONFIG)
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
            {/* BỘ LỌC ĐỘNG TÌM KIẾM PHÒNG */}
            <DynamicFilter
                config={hotelConfig}
                onFilterSubmit={handleFilter}
            />

            {/* DANH SÁCH HIỂN THỊ PHÒNG KHÁCH SẠN */}
            <div className="flex-grow-1">
                {loading && <MySpinner />}
                
                <ServiceList
                    title="Danh sách Phòng khách sạn"
                    items={rooms}
                    sortCategory="rating" // Đồng bộ hiển thị menu sort theo Rating/Đánh giá khách sạn
                    currentSort={sort}
                    onSortChange={setSort}
                />
            </div>
        </div>
    );
};

export default HotelRoomService;