import { Form } from "react-bootstrap";

const SortDropdown = ({ sortCategory, currentSort, onSortChange }) => {
    return (
        <div className="d-flex align-items-center">
            <Form.Label htmlFor="sortSelect" className="me-2 fw-bold text-nowrap mb-1">
                Sắp xếp:
            </Form.Label>
            <Form.Select id="sortSelect" size="sm"
                value={currentSort || ''} onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="">-- Mặc định --</option>
                <option value="price_asc">Giá từ thấp đến cao</option>
                <option value="price_desc">Giá từ cao đến thấp</option>

                {sortCategory === 'slot' && (
                    <>
                        <option value="slot_asc">Độ phổ biến từ thấp đến cao</option>
                        <option value="slot_desc">Độ phổ biến từ cao đến thấp</option>
                    </>
                )}

                {sortCategory === 'rating' && (
                    <>
                        <option value="rating_asc">Đánh giá từ thấp đến cao</option>
                        <option value="rating_desc">Đánh giá từ cao đến thấp</option>
                    </>
                )}
            </Form.Select>
        </div>
    );
};

export default SortDropdown;