import { Col, Form, Row } from "react-bootstrap";

const DynamicFormFields = ({ config, data, onChange, isEditMode }) => {

    const formatForInput = (type, value) => {
        if (!value) return "";
        if (type === "datetime-local") {
            const dateObj = new Date(value);
            const y = dateObj.getFullYear();
            const m = String(dateObj.getMonth() + 1).padStart(2, '0');
            const d = String(dateObj.getDate()).padStart(2, '0');
            const h = String(dateObj.getHours()).padStart(2, '0');
            const min = String(dateObj.getMinutes()).padStart(2, '0');
            return `${y}-${m}-${d}T${h}:${min}`;
        }
        return value;
    };

    return (
        <Row>
            {config.map((field) => {
                const isDisabled = field.disabled || (isEditMode && field.disableOnEdit);
                return (
                    <Col md={field.type === 'textarea' ? 12 : 6} key={field.key} className="mb-3">
                        <Form.Group controlId={field.key}>
                            <Form.Label className="fw-medium">{field.label}</Form.Label>
                            {field.type === 'select' ? (
                                <Form.Select value={data[field.key] || ""} disabled={isDisabled}
                                    onChange={(c) => onChange(field.key, c.target.value)}
                                >
                                    <option value="">--- Chọn {field.label.toLowerCase()} ---</option>
                                    {field.options?.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </Form.Select>
                            ) : field.type === 'textarea' ? (
                                <Form.Control as="textarea" rows={4} disabled={isDisabled}
                                    placeholder={`Nhập ${field.label.toLowerCase()}...`}
                                    value={data[field.key] || ""}
                                    onChange={(e) => onChange(field.key, e.target.value)} 
                                />
                            ) : (
                                <Form.Control type={field.type} disabled={isDisabled}
                                    placeholder={`Nhập ${field.label.toLowerCase()}...`}
                                    value={formatForInput(field.type, data[field.key])}
                                    onChange={(c) => onChange(field.key, c.target.value)}
                                />
                            )}
                        </Form.Group>
                    </Col>
                );
            })}
        </Row>
    );
};

export default DynamicFormFields;