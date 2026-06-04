import { useContext } from "react";
import { MyCompareContext } from "../../configs/Context";
import { Link } from "react-router-dom";
import StaticStyle from "../StaticStyle";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";

const CompareService = () => {
    const [compareList, compareDispatch] = useContext(MyCompareContext);

    const handleRemove = (id) => {
        compareDispatch({ type: 'REMOVE_SERVICE', payload: id });
    };

    

    return (
        <div className="container mt-5 mb-5" style={StaticStyle.baseHeight}>
            {(compareList.services.length === 0) ? 
            (<div className="container text-center mt-5" style={StaticStyle.baseHeight}>
                <Alert variant="warning">
                    <h3 className="text-muted mt-3">Danh sách so sánh trống</h3>
                    <p className="text-muted">Thêm dịch vụ vào danh sách so sánh để xem chi tiết! <Link to="/" className="fw-bold text-decoration-none">Khám phá ngay</Link></p>
                </Alert>
            </div>) :
            (
            <>
            <h3 className="fw-bold text-dark mb-4 text-center text-sm-start text-uppercase">So sánh dịch vụ ({compareList.services.length}/3)</h3>
            <Row md={3}>
                {compareList.services.map((service) => (
                    <Col key={service.id} >
                        <Card className="h-100 shadow-sm position-relative border rounded-4 shadow-sm">
                            <Card.Body className="d-flex flex-column">
                                <div
                                    style={{
                                        height: "200px",
                                        backgroundImage: `url(${service.image || "https://via.placeholder.com/300"})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        position: "relative"
                                    }}
                                />

                                <Card.Title className="mt-3 fw-bold">{service.name}</Card.Title>

                                <hr />
                                
                                <div className="flex-grow-1">
                                    <Card.Text className="mb-2">
                                        <strong>Chi tiết:</strong> <br/>
                                        <span dangerouslySetInnerHTML={{ __html: service.description }}></span>
                                    </Card.Text>

                                    <hr />

                                    <Card.Text>
                                        <strong>Giá:</strong> <span className="fw-bold text-danger fs-5 me-2">{service.price}</span>
                                    </Card.Text>
                                </div>

                                <div className="d-flex gap-3">
                                    <Link to={`/${service.typeService}/${service.id}`}
                                    className="btn btn-primary mt-4 w-100 rounded-pill"
                                    >
                                        Xem chi tiết
                                    </Link>

                                    <Button onClick={() => handleRemove(service.id)}
                                        className="mt-4 w-100 rounded-pill" 
                                        variant="outline-primary"
                                    >
                                        Bỏ so sánh
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            </>)}
        </div>
    );
};

export default CompareService;