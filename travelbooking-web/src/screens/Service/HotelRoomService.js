import React, { useEffect, useState } from "react"; 
import { useNavigate, useSearchParams } from "react-router-dom"; 

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";
import MySpinner from "../../components/MySpinner";
import Apis, { endpoints } from "../../configs/Api";

const HotelRoomService = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams(); 
    const [page, setPage] = useState(1); // Thêm state quản lý số trang tương tự Tour và Transport
    const navigate = useNavigate();

    // Định dạng hiển thị giá tiền lẻ VNĐ
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };

    const loadRooms = async () => {
        try {
            setLoading(true);
            let params = { page: page }; // Gửi kèm số trang lên API hệ thống

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

            if (res.data.length === 0) {
                setPage(0); // Đánh dấu hết dữ liệu để ẩn nút Xem thêm
                return;
            }

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

            // Xử lý nạp dữ liệu chuẩn theo page tương thích cấu trúc của thầy
            if (page === 1) {
                setRooms(mappedRooms); // Trang đầu hoặc lọc mới thì thay thế mảng
            } else if (page > 1) {
                setRooms(prev => [...prev, ...mappedRooms]); // Các trang sau thì cộng dồn dữ liệu tiếp vào
            }
        } catch (err) {
            console.error("Lỗi khi tải danh sách phòng khách sạn:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (page > 0) {
            loadRooms();
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

    const hotelConfig = [
        { key: "destination", label: "Địa điểm", type: "text" },
        { key: "checkInDate", label: "Ngày nhận phòng", type: "date" },
        { key: "checkOutDate", label: "Ngày trả phòng", type: "date" }
    ];

    // Đẩy các giá trị nhận được từ form lọc ghim lên thanh URL
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

    // Đẩy giá trị sort lên thanh URL khi người dùng thay đổi dropdown sắp xếp
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
                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-3"></div>
                    {loading && rooms.length === 0 && <MySpinner />}
                    <ServiceList
                        title="Danh sách Phòng khách sạn"
                        items={rooms}
                        sortCategory="rating"
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

export default HotelRoomService;