import { Badge, Button, Card } from "react-bootstrap";
import { useContext } from "react";
import { MyCompareContext } from "../configs/Context";
import ComponentStyle from "./ComponentStyle";

const ServiceCard = ({ data }) => {
    const [, compareDispatch] = useContext(MyCompareContext);

    const handleAddCompare = () => {
        const servicePayload = {
            id: data.id,
            name: data.title,
            description: data.details.join("<br/>"), 
            price: data.price,
            image: data.image,
            typeService: data.typeService
        };
        compareDispatch({ type: 'ADD_SERVICE', payload: servicePayload });
    };

    return (
        <Card className="h-100 shadow-sm rounded-4 overflow-hidden border-2">
            <div
                style={{
                    height: "200px",
                    backgroundImage: `url(${data.image || "https://via.placeholder.com/300"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative"
                }}
            />

            {data.badge && (
                <Badge bg="success" style={ComponentStyle.badgeCard}
                className="position-absolute px-3 py-2 rounded-pill">
                    {data.badge}
                </Badge>
            )}

            <Card.Body className="d-flex flex-column" >
                <Card.Title className="fw-bold">
                    {data.title}
                </Card.Title>

                <div className="text-muted mt-2 mb-2">
                    {data.details?.map((item, index) => (
                        <div key={index} className="mb-1">
                            {item}
                        </div>
                    ))}
                </div>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                    {data.details && <Button variant="outline-secondary"
                        className="rounded-pill"
                        onClick={handleAddCompare}
                    >
                        + So sánh
                    </Button>}
                    
                    <span className="fw-bold text-danger fs-5 me-2">
                        {data.price}
                    </span>
                </div>

                <Button variant="primary" onClick={data.onView}
                    className="rounded-pill mt-3"
                >
                    Xem chi tiết
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ServiceCard;