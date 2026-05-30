import { Col, Form, Row } from "react-bootstrap";

const DynamicFormFields = ({ config, data, onChange, isEditMode }) => {
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
                                    value={data[field.key] || ""}
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