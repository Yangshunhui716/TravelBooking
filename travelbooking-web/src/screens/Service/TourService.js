import { useCallback, useEffect, useState } from "react"; 
import { useNavigate, useSearchParams } from "react-router-dom";

import DynamicFilter from "../../components/DynamicFilter";
import ServiceList from "../../components/ServiceList";
import Apis, { endpoints } from "../../configs/Api";
import ServiceStyle from "./ServiceStyle";
import StaticStyle from "../StaticStyle";

const TourService = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams(); 
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };
    

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString("vi-VN");
    };

    const loadTours = useCallback( async () => {
        try {
            setLoading(true);
            let params = { page: page };
            
            const destination = searchParams.get("destination");
            const departureDate = searchParams.get("departureDate");
            const sort = searchParams.get("sort") || "";
            
            if (destination) params.destination = destination;
            if (departureDate) params.departureTime = departureDate;
                
            switch (sort) {
                case "price_asc":   params.price = "asc"; break;
                case "price_desc":  params.price = "desc"; break;
                case "slot_asc":    params.slot = "asc"; break;
                case "slot_desc":   params.slot = "desc"; break;
                default: break;
            }

            let res = await Apis.get(
                endpoints['tour-services'],
                { params: params }
            );

            if (res.data.length === 0) {
                setPage(0); 
                return;
            }
            
            const mappedTours = res.data.map((tour) => ({
                id: tour.id,
                title: tour.services?.name,
                badge: `${tour.durationDays} ngày`,
                image: tour.services?.imgUrl,
                price: formatPrice(tour.services?.price),
                details: [
                    `Điểm đến: ${tour.services?.destination}`,
                    `Ngày khởi hành: ${formatDate(tour.departureTime)}`,
                    `Số lượng: ${tour.services?.availableSlots} / ${tour.services?.slots}`
                ],
                typeService: "tour-services",
                onView: () => navigate(`/tour-services/${tour.id}`)
            }));
            
            if (page === 1) {
                setTours(mappedTours); 
            } else if (page > 1) {
                setTours(prev => [...prev, ...mappedTours]); 
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    },[searchParams, page, navigate]);

    useEffect(() => {
        loadTours();
    }, [loadTours]); 

    const handleLoadMore = () => {
        if (page > 0 && !loading) {
            setPage(page + 1);
        }
    };

    const tourConfig = [
        { key: "destination", label: "Điểm đến", type: "text" },
        { key: "departureDate", label: "Ngày khởi hành", type: "date" }
    ];
    
    const handleFilter = (values) => {
        const newParams = new URLSearchParams(searchParams);
        if (values.destination) newParams.set("destination", values.destination);
        else newParams.delete("destination");

        if (values.departureDate) newParams.set("departureDate", values.departureDate);
        else newParams.delete("departureDate");
        
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
                <DynamicFilter config={tourConfig}
                    onFilterSubmit={handleFilter}/>
            </div>

            <div className="flex-grow-1 mb-5">
                <div className="mb-3"></div>
                <ServiceList
                    title="Danh sách Tour"
                    items={tours}
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

export default TourService;