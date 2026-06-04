import { useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";

const DynamicFormFields = ({ config, data, onChange, isEditMode }) => {
    const initialDataRef = useRef({});

    useEffect(() => {
        if (Object.keys(initialDataRef.current).length === 0 && data && Object.keys(data).length > 0) {
            initialDataRef.current = { ...data };
        }
    }, [data]);

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

    const getMinDate = (type) => {
        if (type !== "date" && type !== "datetime-local") return undefined;
        const now = new Date();
        const tzOffset = now.getTimezoneOffset() * 60000;
        const localISOTime = new Date(Date.now() - tzOffset).toISOString();
        if (type === "date") {
            return localISOTime.split('T')[0];
        }
        if (type === "datetime-local") {
            return localISOTime.slice(0, 16);
        }
    };

    return (
        <Row>
            {config.map((field) => {
                const isDisabled = field.disabled || (isEditMode && field.disableOnEdit);
                const isRequired = isEditMode ? !field.disableOnEdit : true;
                let minProp = undefined;

                if (field.type === "number") {
                    minProp = (isEditMode && initialDataRef.current[field.key] !== undefined)
                                ? initialDataRef.current[field.key] : "0";
                } else if (field.type === "date" || field.type === "datetime-local") {
                    minProp = getMinDate(field.type);
                }

                return (
                    <Col md={field.type === 'textarea' ? 12 : 6} key={field.key} className="mb-3">
                        <Form.Group controlId={field.key}>
                            <Form.Label className="fw-medium">
                                {field.label} {isRequired && <span className="text-danger">*</span>}
                            </Form.Label>
                            
                            {field.type === 'select' ? (
                                <Form.Select 
                                    value={data[field.key] || ""} 
                                    disabled={isDisabled}
                                    required={isRequired}
                                    onChange={(c) => onChange(field.key, c.target.value)}
                                >
                                    <option value="">--- Chọn {field.label.toLowerCase()} ---</option>
                                    {field.options?.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </Form.Select>
                            ) : field.type === 'textarea' ? (
                                <Form.Control 
                                    as="textarea" 
                                    rows={4} 
                                    disabled={isDisabled}
                                    required={isRequired}
                                    placeholder={`Nhập ${field.label.toLowerCase()}...`}
                                    value={data[field.key] || ""}
                                    onChange={(e) => onChange(field.key, e.target.value)} 
                                />
                            ) : (
                                <Form.Control 
                                    type={field.type} 
                                    disabled={isDisabled}
                                    required={isRequired}
                                    min={minProp}
                                    placeholder={`Nhập ${field.label.toLowerCase()}...`}
                                    value={formatForInput(field.type, data[field.key])}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        if ((field.type === "datetime-local" || field.type === "date") && minProp) {
                                            if (newValue < minProp) {
                                                alert("Không thể chọn thời gian quá khứ!");
                                                onChange(field.key, minProp); 
                                                return;
                                            }
                                        }
                                        if (field.type === "number" && minProp !== undefined) {
                                            if (Number(newValue) < Number(minProp)) {
                                                alert(`Số lượng không được nhỏ hơn giá trị gốc (${minProp})`);
                                                onChange(field.key, minProp);
                                                return;
                                            }
                                        }
                                        onChange(field.key, newValue);
                                    }}
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