import { useCallback, useEffect, useState } from "react"; 
import { useNavigate, useSearchParams } from "react-router-dom"; 

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";
import Apis, { endpoints } from "../../configs/Api";
import ServiceStyle from "./ServiceStyle";
import StaticStyle from "../StaticStyle";

const HotelRoomService = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams(); 
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };

    const loadRooms = useCallback(async () => {
        try {
            setLoading(true);
            let params = { page: page };

            const destination = searchParams.get("destination");
            const checkInDate = searchParams.get("checkInDate");
            const checkOutDate = searchParams.get("checkOutDate");
            const sort = searchParams.get("sort") || "";

            if (destination) params.destination = destination;
            if (checkInDate) params.startDate = checkInDate;
            if (checkOutDate) params.endDate = checkOutDate;

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
                setRooms([]);
                setPage(0);
                return;
            }

            const mappedRooms = await Promise.all(
                res.data.map(async (room) => {
                    let availableSlots = "Đang cập nhật số lượng";
                    try {
                        const slotRes = await Apis.get(`${endpoints['hotel-room-service-detail'](room.id)}/available-slots`, {
                            params: {
                                startDate: checkInDate,
                                endDate: checkOutDate
                            }
                        });
                        availableSlots = slotRes.data;
                    } catch (error) {
                        console.error(`Lỗi lấy slot phòng ${room.id}:`, error);
                    }

                    return {
                        id: room.id,
                        title: room.services?.name, 
                        badge: room.rate,
                        image: room.services?.imgUrl,
                        price: formatPrice(room.services?.price),
                        details: [
                            `Khách sạn: ${room.hotelName}`,
                            `Địa chỉ: ${room.address}`,
                            `Số phòng hiện có: ${availableSlots} phòng`
                        ],
                        typeService: "hotel-room-services",
                        onView: () => navigate(`/hotel-room-services/${room.id}`)
                    };
                })
            );

            if (page === 1) {
                setRooms(mappedRooms); 
            } else if (page > 1) {
                setRooms(prev => [...prev, ...mappedRooms]);
            }
        } catch (err) {
            console.error("Lỗi khi tải danh sách phòng khách sạn:", err);
        } finally {
            setLoading(false);
        }
    }, [searchParams, page, navigate]);

    useEffect(() => {
        loadRooms();
    }, [loadRooms]);

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

    const handleFilter = (values) => {
        const newParams = new URLSearchParams(searchParams);
        
        if (values.destination) newParams.set("destination", values.destination);
        else newParams.delete("destination");

        if (values.checkInDate) newParams.set("checkInDate", values.checkInDate);
        else newParams.delete("checkInDate");

        if (values.checkOutDate) newParams.set("checkOutDate", values.checkOutDate);
        else newParams.delete("checkOutDate");

        setSearchParams(newParams);
        setPage(1);
    };

    const handleSortChange = (sortValue) => {
        const newParams = new URLSearchParams(searchParams);
        if (sortValue) newParams.set("sort", sortValue);
        else newParams.delete("sort");
        setSearchParams(newParams);
        setPage(1);
    };

    return (
        <div className="d-flex pe-4 ps-4 gap-4" style={StaticStyle.baseHeight}>
            <div className="pt-4" style={ServiceStyle.dynamicFilter}>
                <DynamicFilter config={hotelConfig}
                    onFilterSubmit={handleFilter}/>
            </div>
            <div className="flex-grow-1 mb-5">
                <div className="mb-3"></div>
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