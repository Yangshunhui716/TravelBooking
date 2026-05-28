import { Col, Row } from "react-bootstrap";
import ServiceCard from "./ServiceCard";
import SortDropdown from "./SortDropdown";

const ServiceList = ({ title, items, sortCategory, currentSort, onSortChange}) => {
  return (
    <div className="service-list-container">
      {/* Tiêu đề danh sách */}
      <h3 className="mb-4 text-uppercase fs-4 fw-bold text-secondary">
        {title}
      </h3>
      <SortDropdown
          sortCategory={sortCategory}
          currentSort={currentSort}
          onSortChange={onSortChange}
      />


      {/* Hệ thống Grid: 
        - xs={1}: Màn hình điện thoại hiện 1 cột
        - md={2}: Màn hình tablet hiện 2 cột
        - lg={4}: Màn hình lớn (laptop/PC) hiện 4 cột
        - g-4: Tạo khoảng cách (gap) đều đặn giữa các cột và hàng
      */}
      <Row xs={1} md={2} lg={4} className="g-4">
        {items.map((item) => (
          <Col key={item.id}>
            <ServiceCard data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServiceList;