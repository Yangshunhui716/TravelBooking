import { Col, Row } from "react-bootstrap";
import ServiceCard from "./ServiceCard";
import SortDropdown from "./SortDropdown";
import ButtonServiceGroup from "./ButtonServiceGroup";
import { Button } from "react-bootstrap";

const ServiceList = ({ title, items, sortCategory, currentSort, onSortChange, page, loading, onLoadMore}) => {
    return (
    <div className="service-list-container">
        <h3 className="mb-4 text-uppercase fs-4 fw-bold text-secondary">
            {title}
        </h3>
        {sortCategory ? 
            <SortDropdown
                sortCategory={sortCategory}
                currentSort={currentSort}
                onSortChange={onSortChange}
            />
        : <ButtonServiceGroup currentType={currentSort} onChangeType={onSortChange} className="w-100"></ButtonServiceGroup>}

        <Row xs={1} md={2} lg={4} className="g-4">
            {items.map((item) => (
                <Col key={item.id}>
                    <ServiceCard data={item} />
                </Col>
            ))}
        </Row>
        {page > 0 && onLoadMore && (
            <div className="text-center mt-4 mb-3">
                <Button 
                    variant="success" 
                    onClick={onLoadMore} 
                    disabled={loading}
                    className="px-4 py-2 fw-bold"
                    >
                    {loading ? "Đang tải..." : "Xem thêm..."}
                </Button>
            </div>
        )}
    </div>
    );
};

export default ServiceList;