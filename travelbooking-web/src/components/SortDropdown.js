import { Form } from "react-bootstrap";

const SortDropdown = ({ sortCategory, currentSort, onSortChange }) => {
    return (
        <div className="d-flex justify-content-end mb-3">
            <div className="d-flex align-items-center">
                <Form.Label htmlFor="sortSelect" className="me-2 fw-bold text-nowrap mb-0">
                    Sắp xếp:
                </Form.Label>
                
                <Form.Select 
                    id="sortSelect"
                    size="sm"
                    value={currentSort || ''} 
                    onChange={(e) => onSortChange(e.target.value)}
                    style={{ minWidth: '220px', borderRadius: '8px', cursor: 'pointer' }}
                >
                    <option value="">-- Mặc định --</option>

                    {/* Tiêu chí Giá: Luôn hiển thị ở cả 3 page */}
                    <option value="price_asc">Giá từ thấp đến cao</option>
                    <option value="price_desc">Giá từ cao đến thấp</option>

                    {/* Tiêu chí Slot (Độ phổ biến): Chỉ hiện khi truyền prop sortCategory="slot" */}
                    {sortCategory === 'slot' && (
                        <>
                            <option value="slot_asc">Độ phổ biến từ thấp đến cao</option>
                            <option value="slot_desc">Độ phổ biến từ cao đến thấp</option>
                        </>
                    )}

                    {/* Tiêu chí Đánh giá: Chỉ hiện khi truyền prop sortCategory="rating" */}
                    {sortCategory === 'rating' && (
                        <>
                            <option value="rating_asc">Đánh giá từ thấp đến cao</option>
                            <option value="rating_desc">Đánh giá từ cao đến thấp</option>
                        </>
                    )}
                </Form.Select>
            </div>
        </div>
    );
};

export default SortDropdown;