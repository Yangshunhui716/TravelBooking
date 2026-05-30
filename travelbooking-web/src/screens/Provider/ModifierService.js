import { useEffect, useState } from "react";
import DisplayImage from "../../components/DisplayImage";
import { authApis, endpoints } from "../../configs/Api";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import ButtonServiceGroup from "../../components/ButtonServiceGroup";
import DynamicFormFields from "../../components/DynamicFormFields";
import { useLocation } from "react-router-dom";


const ModifierService = () => {
    const location = useLocation();
    const { isEditMode = false, type = "tour", existingService = null } = location.state || {};

    const [serviceType, setServiceType] = useState(type);
    const [service, setService] = useState({});
    const [payload, setPayload] = useState({});
    const [serviceImage, setServiceImage] = useState();
    const [loading, setLoading] = useState(false);

    const tourFieldsConfig = [
        { key: "name", label: "Tên tour du lịch", type: "text", disableOnEdit: true },
        { key: "price", label: "Giá (/người)", type: "number" },
        { key: "slots", label: "Số lượng", type: "number" },
        { key: "destination", label: "Địa điểm (Tỉnh / Thành phố)", type: "text", disableOnEdit: true },
        { key: "departureTime", label: "Thời gian khởi hành", type: "datetime-local" },
        { key: "durationDays", label: "Thời lượng dịch vụ (ngày)", type: "number", disableOnEdit: true },
        { key: "description", label: "Mô tả", type: "textarea" }
    ];

    const hotelRoomFieldsConfig = [
        { key: "name", label: "Tên phòng", type: "text", disableOnEdit: true },
        { key: "price", label: "Giá (/đêm)", type: "number" },
        { key: "slots", label: "Số lượng phòng", type: "number" },
        { key: "destination", label: "Địa điểm (Tỉnh / Thành phố)", type: "text", disableOnEdit: true },
        { key: "hotelName", label: "Tên khách sạn", type: "text", disableOnEdit: true },
        { key: "address", label: "Địa chỉ khách sạn", type: "text", disableOnEdit: true },
        { key: "description", label: "Mô tả", type: "textarea", disableOnEdit: true }
    ];

    const transportFieldsConfig = [
        { key: "providerName", label: "Tên nhà cung cấp phương tiện", type: "text", disableOnEdit: true },
        { key: "price", label: "Giá (/vé)", type: "number" },
        { key: "slots", label: "Số lượng", type: "number" },
        { key: "departure", label: "Nơi khởi hành", type: "text", disableOnEdit: true },
        { key: "destination", label: "Nơi đến", type: "text", disableOnEdit: true },
        { key: "locationDetail", label: "Địa điểm chi tiết", type: "text" },
        { key: "departureTime", label: "Thời gian khởi hành dự kiến", type: "datetime-local", disableOnEdit: true },
        { key: "endTime", label: "Thời gian đến dự kiến", type: "datetime-local", disableOnEdit: true },
        { key: "ticketType", label: "Loại vé", type: "text", disableOnEdit: true },
        {
            key: "transportType", label: "Loại phương tiện", type: "select", disableOnEdit: true,
            options: [
                { label: "Xe khách", value: "bus" },
                { label: "Máy bay", value: "plane" },
                { label: "Tàu hỏa", value: "train" }
            ]
        },
        { key: "description", label: "Mô tả", type: "textarea" }
    ];

    useEffect(() => {
        if (isEditMode && existingService) {
            const flatServiceData = {
                id: existingService.id,
                ...existingService.services
            };

            if (service.id !== flatServiceData.id) {
                setService(flatServiceData);
            }

        }

        const imageUrl = existingService?.services?.imgUrl;
        if (imageUrl && imageUrl !== serviceImage) {
            setServiceImage(existingService.services.imgUrl);
        }
    }, [isEditMode, existingService]);

    const createPayload = (key, value) => {
        setPayload(prev => ({ ...prev, [key]: value }));
        setService(prev => ({ ...prev, [key]: value }));
    };

    const saveService = () => {
        try {
            setLoading(true);
            if (isEditMode) {
                if (serviceType === 'tour') {
                    authApis().patch(endpoints["provider-tour-service"](service.id), payload)
                } else if (serviceType === 'hotelRoom') {
                    authApis().patch(endpoints["provider-hotel-room-service"](service.id), payload)
                } else if (serviceType === 'transport') {
                    authApis().patch(endpoints["provider-transport-service"](service.id), payload)
                }
            } else {
                if (serviceType === 'tour') {
                    authApis().post(endpoints["provider-tour-services"], payload)
                } else if (serviceType === 'hotelRoom') {
                    authApis().post(endpoints["provider-hotel-room-services"], payload)
                } else if (serviceType === 'transport') {
                    authApis().post(endpoints["provider-transport-services"], payload)
                }
            }
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <Row>
                <Col md={4}>
                    <Card className="p-3 shadow-sm rounded-4">
                        <Form.Label>Ảnh dịch vụ</Form.Label>
                        <Form.Control type="file" accept="image/*" />
                    </Card>

                    <DisplayImage imageUrl={serviceImage} />

                    <div className="mt-4 d-flex justify-content-start gap-3">
                        {isEditMode ? (
                            <>
                                <Button variant="primary" onClick={saveService}>Xác nhận</Button>
                                <Button variant="danger">Xóa dịch vụ</Button>
                            </>
                        ) : (
                            <Button variant="primary" onClick={saveService}>Thêm dịch vụ</Button>
                        )}
                    </div>
                </Col>

                <Col md={8}>
                    <Card className="p-4 shadow-sm rounded-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            {!isEditMode ? (
                                <ButtonServiceGroup currentType={serviceType} onChangeType={setServiceType} />
                            ) : (
                                <h4>Chỉnh sửa dịch vụ {serviceType.toUpperCase()}</h4>
                            )}
                        </div>

                        <Form>
                            {serviceType === 'tour' && <DynamicFormFields config={tourFieldsConfig} data={service} onChange={createPayload} isEditMode={isEditMode} />}
                            {serviceType === 'hotelRoom' && <DynamicFormFields config={hotelRoomFieldsConfig} data={service} onChange={createPayload} isEditMode={isEditMode} />}
                            {serviceType === 'transport' && <DynamicFormFields config={transportFieldsConfig} data={service} onChange={createPayload} isEditMode={isEditMode} />}
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ModifierService;