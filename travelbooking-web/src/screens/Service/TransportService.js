import { useEffect, useState } from "react"; 
import { useNavigate, useSearchParams } from "react-router-dom"; 

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";
import Apis, { endpoints } from "../../configs/Api";
import ServiceStyle from "./ServiceStyle";
import StaticStyle from "../StaticStyle";

const TransportService = () => {
    const [transports, setTransports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams(); 
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };


    const formatDate = (timestamp) => {
        if (!timestamp) return "";
        return new Date(timestamp).toLocaleDateString("vi-VN");
    };


    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        return new Date(timestamp).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const loadTransports = async () => {
        try {
            setLoading(true);
            let params = { page: page };

            const departure = searchParams.get("departure");
            const destination = searchParams.get("destination");
            const departureDate = searchParams.get("departureDate");
            const transportType = searchParams.get("transportType");
            const sort = searchParams.get("sort") || "";

            if (departure) params.departure = departure;
            if (destination) params.destination = destination;
            if (departureDate) params.departureTime = departureDate;
            if (transportType) params.transportType = transportType;

            switch (sort) {
                case "price_asc":   params.price = "asc"; break;
                case "price_desc":  params.price = "desc"; break;
                case "slot_asc":    params.slot = "asc"; break;
                case "slot_desc":   params.slot = "desc"; break;
                default: break;
            }

            let res = await Apis.get(
                endpoints['transport-services'],
                { params: params }
            );

            if (res.data.length === 0) {
                alert("Không tìm thấy thêm dịch vụ phù hợp với yêu cầu!")
                setPage(0);
                return;
            }

            const mappedTransports = res.data.map((transport) => ({
                id: transport.id,
                title: transport.services?.name, 
                badge: transport.transportType === "BUS" ? "Xe khách" : 
                       transport.transportType === "PLANE" ? "Máy bay" : "Tàu hỏa",
                image: transport.services?.imgUrl,
                price: formatPrice(transport.services?.price),
                details: [
                    `Tuyến: ${transport.departure} → ${transport.services?.destination || ""}`,
                    `Chi tiết: ${transport.loactionDetail || "Chưa cập nhật"}`,
                    `Khởi hành: ${formatTime(transport.departureTime)} - ${formatDate(transport.departureTime)}`,
                    `Số chỗ: ${transport.services?.availableSlots || 0} / ${transport.services?.slots || 0} chỗ`
                ],
                typeService: "transport-services",
                onView: () => navigate(`/transport-services/${transport.id}`)
            }));

            if (page === 1) {
                setTransports(mappedTransports);
            } else if (page > 1) {
                setTransports(prev => [...prev, ...mappedTransports]);
            }
        } catch (err) {
            console.error("Lỗi khi tải danh sách phương tiện:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(page>0){
            loadTransports();
        }
    },[searchParams, page]);

    const handleLoadMore = () => {
        if (page > 0 && !loading) {
            setPage(page + 1);
        }
    };

    const transportConfig = [
        { key: "departure", label: "Điểm khởi hành", type: "text" },
        { key: "destination", label: "Điểm đến", type: "text" },
        { key: "departureDate", label: "Ngày khởi hành", type: "date" },
        {
            key: "transportType",
            label: "Loại phương tiện",
            type: "select",
            options: [
                { label: "Xe khách", value: "BUS" },
                { label: "Máy bay", value: "PLANE" },
                { label: "Tàu hỏa", value: "TRAIN" }
            ]
        }
    ];

    const handleFilter = (values) => {
        const newParams = new URLSearchParams(searchParams);
        
        if (values.departure) newParams.set("departure", values.departure);
        else newParams.delete("departure");

        if (values.destination) newParams.set("destination", values.destination);
        else newParams.delete("destination");

        if (values.departureDate) newParams.set("departureDate", values.departureDate);
        else newParams.delete("departureDate");

        if (values.transportType) newParams.set("transportType", values.transportType);
        else newParams.delete("transportType");

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
                <DynamicFilter config={transportConfig}
                    onFilterSubmit={handleFilter}/>
            </div>

            <div className="flex-grow-1 mb-5">
                <div className="mb-3"></div>
                <ServiceList
                    title="Danh sách Phương tiện"
                    items={transports}
                    sortCategory="slot"
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

export default TransportService;