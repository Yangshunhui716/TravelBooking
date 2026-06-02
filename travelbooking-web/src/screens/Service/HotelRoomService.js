import React, { useEffect, useState } from "react"; // Xóa bỏ useCallback cho nhẹ code
import { useNavigate, useSearchParams } from "react-router-dom"; // Thêm useSearchParams đồng bộ theo thầy

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";
import MySpinner from "../../components/MySpinner";
import Apis, { endpoints } from "../../configs/Api";

const HotelRoomService = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams(); // Đọc/ghi bộ lọc thẳng lên URL
    
    const navigate = useNavigate();

    // Định dạng hiển thị giá tiền lẻ VNĐ
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };

    // 1. Hàm async thường giống hệt thầy (không bọc useCallback)
    const loadRooms = async () => {
        try {
            setLoading(true);
            let params = {};

            // Đọc trực tiếp các tham số lọc từ URL xuống
            const destination = searchParams.get("destination");
            const checkInDate = searchParams.get("checkInDate");
            const checkOutDate = searchParams.get("checkOutDate");
            const sort = searchParams.get("sort") || "";

            // Đóng gói tham số gửi lên Backend API đúng với cấu trúc map cũ của bạn
            if (destination) params.destination = destination;
            if (checkInDate) params.startDate = checkInDate;
            if (checkOutDate) params.endDate = checkOutDate;

            // Xử lý Sort
            switch (sort) {
                case "price_asc":   params.price = "asc"; break;
                case "price_desc":  params.price = "desc"; break;
                case "rating_asc":  params.rate = "asc"; break;
                case "rating_desc": params.rate = "desc"; break;
                default: break;
            }

            let res = await Apis.get(
                endpoints['hotel-room-services'],
                { params: params }
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
                    `Số phòng còn: ${room.services?.availableSlots || 0} phòng`
                ],
                onView: () => navigate(`/hotel-room-services/${room.id}`)
            }));

            setRooms(mappedRooms);
        } catch (err) {
            console.error("Lỗi khi tải danh sách phòng khách sạn:", err);
        } finally {
            setLoading(false);
        }
    };

    // 2. useEffect CHỈ lắng nghe searchParams (URL thay đổi thì tự động load lại dữ liệu)
    // Cắt bỏ hoàn toàn 'loadRooms' khỏi mảng lắng nghe giống hệt phong cách của thầy
    useEffect(() => {
        loadRooms();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    // CẤU HÌNH BỘ LỌC TÌM KIẾM PHÒNG (FILTER CONFIG)
    const hotelConfig = [
        { key: "destination", label: "Địa điểm", type: "text" },
        { key: "checkInDate", label: "Ngày nhận phòng", type: "date" },
        { key: "checkOutDate", label: "Ngày trả phòng", type: "date" }
    ];

    // 3. Đẩy các giá trị nhận được từ form lọc ghim lên thanh URL
    const handleFilter = (values) => {
        const newParams = new URLSearchParams(searchParams);
        
        if (values.destination) newParams.set("destination", values.destination);
        else newParams.delete("destination");

        if (values.checkInDate) newParams.set("checkInDate", values.checkInDate);
        else newParams.delete("checkInDate");

        if (values.checkOutDate) newParams.set("checkOutDate", values.checkOutDate);
        else newParams.delete("checkOutDate");

        setSearchParams(newParams);
    };

    // 4. Đẩy giá trị sort lên thanh URL khi người dùng thay đổi dropdown
    const handleSortChange = (sortValue) => {
        const newParams = new URLSearchParams(searchParams);
        if (sortValue) newParams.set("sort", sortValue);
        else newParams.delete("sort");
        setSearchParams(newParams);
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
                    sortCategory="rating" 
                    currentSort={searchParams.get("sort") || ""} // Đọc trực tiếp từ URL để giữ trạng thái active ở dropdown
                    onSortChange={handleSortChange}
                />
            </div>
        </div>
    );
};

export default HotelRoomService;