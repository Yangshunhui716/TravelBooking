import { useEffect, useState } from "react";
import DisplayImage from "../../components/DisplayImage";
import { authApis, endpoints } from "../../configs/Api";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ButtonServiceGroup from "../../components/ButtonServiceGroup";
import DynamicFormFields from "../../components/DynamicFormFields";
import { useLocation, useNavigate } from "react-router-dom";
import MySpinner from "../../components/MySpinner";
import StaticStyle from "../StaticStyle";


const ModifierService = () => {
    const location = useLocation();
    const { isEditMode = false, type = "tour", existingService = null } = location.state || {};

    const [serviceType, setServiceType] = useState(type);
    const [service, setService] = useState({});
    const [payload, setPayload] = useState({});
    const [serviceImage, setServiceImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigate();

    const tourFieldsConfig = [
        { key: "name", label: "Tên tour du lịch", type: "text", disableOnEdit: true },
        { key: "price", label: "Giá (/người)", type: "number" },
        { key: "slots", label: "Số lượng", type: "number" },
        { key: "destination", label: "Địa điểm (Tỉnh / Thành phố)", type: "text", disableOnEdit: true },
        { key: "departureTime", label: "Thời gian khởi hành", type: "datetime-local" },
        { key: "durationDays", label: "Thời lượng dịch vụ (ngày)", type: "number", disableOnEdit: true },
        { key: "description", label: "Mô tả chi tiết", type: "textarea" }
    ];

    const hotelRoomFieldsConfig = [
        { key: "name", label: "Tên phòng", type: "text", disableOnEdit: true },
        { key: "price", label: "Giá (/đêm)", type: "number" },
        { key: "slots", label: "Số lượng phòng", type: "number" },
        { key: "destination", label: "Địa điểm (Tỉnh / Thành phố)", type: "text", disableOnEdit: true },
        { key: "hotelName", label: "Tên khách sạn", type: "text", disableOnEdit: true },
        { key: "address", label: "Địa chỉ khách sạn", type: "text", disableOnEdit: true },
        { key: "description", label: "Mô tả phòng, tiện ích, dịch vụ đính kèm (nếu có)", type: "textarea" }
    ];

    const transportFieldsConfig = [
        { key: "providerName", label: "Tên nhà cung cấp phương tiện", type: "text", disableOnEdit: true },
        { key: "price", label: "Giá (/vé)", type: "number" },
        { key: "departure", label: "Nơi khởi hành", type: "text", disableOnEdit: true },
        { key: "destination", label: "Nơi đến", type: "text", disableOnEdit: true },
        { key: "slots", label: "Số lượng", type: "number" },
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
            const flatServiceData = { id: existingService.id, ...existingService, ...existingService.services };

            if (service.id !== flatServiceData.id) {
                setService(flatServiceData);
            }

        }
    }, [isEditMode, existingService]);

    const createPayload = (key, value) => {
        if (key==='departureTime' || key==='endTime') {
            value = new Date(value).getTime();
        }

        setPayload(prev => ({ ...prev, [key]: value }));
        setService(prev => ({ ...prev, [key]: value }));
    };

    const saveService = async () => {
let currentConfig = [];
        if (serviceType === 'tour') currentConfig = tourFieldsConfig;
        else if (serviceType === 'hotelRoom') currentConfig = hotelRoomFieldsConfig;
        else if (serviceType === 'transport') currentConfig = transportFieldsConfig;

        if (!isEditMode && !serviceImage) {
            alert("Vui lòng tải lên ảnh dịch vụ!");
            return;
        }

        for (let field of currentConfig) {
            const isRequired = isEditMode ? !field.disableOnEdit : true;
            if (isRequired) {
                const value = service[field.key];
                if (value === null || value === undefined || value.toString().trim() === "") {
                    alert(`Vui lòng nhập đầy đủ thông tin: ${field.label}`);
                    return;
                }
            }
        }

        try {
            setLoading(true);
            let res;

            if (isEditMode) {
                if (serviceType === 'tour') {
                    res = await authApis().patch(endpoints["provider-tour-service"](service.id), payload)
                } else if (serviceType === 'hotelRoom') {
                    res = await authApis().patch(endpoints["provider-hotel-room-service"](service.id), payload)
                } else if (serviceType === 'transport') {
                    res = await authApis().patch(endpoints["provider-transport-service"](service.id), payload)
                }
            } else {
                if (serviceType === 'tour') {
                    res = await authApis().post(endpoints["provider-tour-services"], payload)
                } else if (serviceType === 'hotelRoom') {
                    res = await authApis().post(endpoints["provider-hotel-room-services"], payload)
                } else if (serviceType === 'transport') {
                    res = await authApis().post(endpoints["provider-transport-services"], payload)
                }
            }

            if (serviceImage!==null && serviceImage !== existingService?.services?.imgUrl && res.data.id) {
                const form = new FormData();
                form.append("img", serviceImage);
                await authApis().patch(endpoints["service-image"](res.data.id), form);
            }
            alert(isEditMode ? "Cập nhật dịch vụ thành công!" : "Thêm dịch vụ thành công!");
            if(!isEditMode){
                navigation("/profile");
            }
        } catch (ex) {
            console.error(ex);
            alert(isEditMode ? "Cập nhật dịch vụ thất bại!" : "Thêm dịch vụ thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4 mb-4" style={StaticStyle.baseHeight} >
            <Row>
                <Col md={4}>
                    <Card className="p-3 shadow rounded-4 border-1 mb-4">
                        <Form.Label>Ảnh dịch vụ</Form.Label>
                        <Form.Control type="file" accept="image/*"
                            required={!isEditMode}
                            onChange={(e) =>
                                setServiceImage(
                                    e.target.files[0]
                                )
                            }
                        />
                    </Card>

                    <DisplayImage imageUrl={serviceImage ? URL.createObjectURL(serviceImage) : existingService?.services?.imgUrl || null} />

                    <div className="mt-4 d-flex justify-content-center gap-3">
                        {isEditMode ? (
                            loading === true ? <MySpinner /> :
                                <>
                                    <Button variant="primary" onClick={saveService}>Xác nhận</Button>
                                    <Button variant="danger">Xóa dịch vụ</Button>
                                </>
                        ) : (
                            loading === true ? <MySpinner /> :<Button variant="primary" onClick={saveService}>Thêm dịch vụ</Button>
                        )}
                    </div>
                </Col>

                <Col md={8}>
                    <Card className="p-4 shadow rounded-4 border-1">
                        <div className="justify-content-between align-items-center mb-3">
                            {!isEditMode ? (
                                <>
                                <h3 className="fw-bold text-dark text-center text-sm-start text-uppercase mb-3">Thêm dịch vụ mới</h3>
                                <ButtonServiceGroup currentType={serviceType} onChangeType={setServiceType} />
                                </>
                            ) : (    
                                <h3 className="fw-bold text-dark text-center text-sm-start text-uppercase">Chỉnh sửa dịch vụ {serviceType==='tour' ? 'Tour du lịch' : serviceType==='hotelRoom' ? 'Phòng khách sạn' : 'Phương tiện'}</h3>
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
        </Container>
    );
};

export default ModifierService;