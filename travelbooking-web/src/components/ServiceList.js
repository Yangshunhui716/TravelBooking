import { Card, Col, Row } from "react-bootstrap";
import ServiceCard from "./ServiceCard";
import SortDropdown from "./SortDropdown";
import ButtonServiceGroup from "./ButtonServiceGroup";
import { Button } from "react-bootstrap";
import ComponentStyle from "./ComponentStyle";

const ServiceList = ({ title, items, sortCategory, currentSort, onSortChange, page, loading, onLoadMore}) => {
    return (
        <div>
            <div className="d-flex align-items-center justify-content-between pe-2 ps-2" 
            style={ComponentStyle.stickyTitle}>
                <h3 className="text-uppercase fw-bold"> {title} </h3>
                <div className="ms-2 mb-auto">
                    {sortCategory ? <SortDropdown sortCategory={sortCategory} currentSort={currentSort} 
                    onSortChange={onSortChange}/> : <ButtonServiceGroup currentType={currentSort} 
                    onChangeType={onSortChange}></ButtonServiceGroup>}
                </div>
            </div>
            
            <Card className="p-2 h-100 shadow rounded-4 overflow-hidden border-0">
            <Row xs={1} md={2} lg={4} className="g-3">
                {items.map((item) => (
                    <Col key={item.id}>
                        <ServiceCard data={item} />
                    </Col>
                ))}
            </Row>
            </Card>

            {page > 0 && onLoadMore && (
                <div className="text-center mt-4">
                    <Button variant="success" onClick={onLoadMore} 
                    disabled={loading} className="px-4 py-2 fw-bold">
                        {loading ? "Đang tải..." : "Xem thêm..."}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ServiceList;