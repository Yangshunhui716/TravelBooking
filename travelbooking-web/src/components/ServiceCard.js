import { Badge, Button, Card } from "react-bootstrap";

const ServiceCard = ({ data }) => {
  return (
    // h-100 giúp các card trong cùng 1 hàng có chiều cao bằng nhau
    <Card className="h-100 shadow-sm border-secondary rounded-4 overflow-hidden">
      
      {/* Vùng hình ảnh (Màu xanh dương như wireframe) */}
      <div 
        style={{ 
          height: '160px', 
          backgroundColor: '#93C5FD', 
          position: 'relative' 
        }}
      >
        {/* Badge xanh lá nằm ở góc trên phải */}
        <Badge 
          bg="success" 
          className="position-absolute rounded-pill px-3 py-2"
          style={{ top: '12px', right: '12px' }}
        >
          {data.badgeText}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column">
        {/* Tiêu đề */}
        <Card.Title className="fs-6 fw-bold mb-3">
          {data.title}
        </Card.Title>

        {/* Cụm thông tin chi tiết */}
        <div className="mb-3 text-muted" style={{ fontSize: '0.85rem' }}>
          {data.details.map((detailLine, index) => (
            <div key={index} className="mb-1">
              {detailLine}
            </div>
          ))}
        </div>

        {/* Phần Giá và nút Xem (đẩy xuống đáy card nhờ mt-auto) */}
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold" style={{ fontSize: '0.9rem' }}>
            Giá: <span className="text-danger">{data.price}</span>
          </span>
          <Button variant="outline-primary" size="sm" className="px-3 rounded-pill">
            Xem
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;