import { Badge, Button, Card } from "react-bootstrap";

const ServiceCard = ({ data }) => {

    return (
        <Card className="h-100 shadow-sm rounded-4 overflow-hidden border-0">

            <div
                style={{
                    height: "200px",
                    backgroundImage: `url(${data.image || "https://via.placeholder.com/300"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative"
                }}
            >

                {data.badge && (
                    <Badge
                        bg="success"
                        className="position-absolute px-3 py-2 rounded-pill"
                        style={{
                            top: 12,
                            right: 12
                        }}
                    >
                        {data.badge}
                    </Badge>
                )}

            </div>

            <Card.Body className="d-flex flex-column">

                <Card.Title className="fw-bold fs-5">
                    {data.title}
                </Card.Title>

                <div className="text-muted mb-3">

                    {data.details?.map((item, index) => (
                        <div key={index} className="mb-1">
                            {item}
                        </div>
                    ))}

                </div>

                <div className="mt-auto d-flex justify-content-between align-items-center">

                    <span className="fw-bold text-danger fs-5">
                        {data.price}
                    </span>

                    <Button
                        variant="outline-primary"
                        className="rounded-pill px-3"
                        onClick={data.onView}
                    >
                        Xem
                    </Button>

                </div>

            </Card.Body>

        </Card>
    );
};

export default ServiceCard;