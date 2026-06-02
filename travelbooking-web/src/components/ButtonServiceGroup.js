import { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const ButtonServiceGroup = ({ currentType, onChangeType }) => {
    const [activeType, setActiveType] = useState(currentType || 'tour');

    const handleButtonClick = (type) => {
        setActiveType(type);
        onChangeType(type);
    };

    return (
        <ButtonGroup aria-label="Basic example" className="d-flex">
            <Button className="flex-fill" variant={activeType === 'tour' ? 'primary' : 'secondary'} 
            onClick={() => handleButtonClick('tour')}>
                Tour
            </Button>
            <Button className="flex-fill" variant={activeType === 'hotelRoom' ? 'primary' : 'secondary'} 
            onClick={() => handleButtonClick('hotelRoom')}>
                Phòng khách sạn
            </Button>
            <Button className="flex-fill" variant={activeType === 'transport' ? 'primary' : 'secondary'} 
            onClick={() => handleButtonClick('transport')}>
                Phương tiện
            </Button>
        </ButtonGroup>
    );
}

export default ButtonServiceGroup;