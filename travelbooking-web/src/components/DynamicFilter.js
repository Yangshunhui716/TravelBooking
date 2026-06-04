import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ComponentStyle from "./ComponentStyle";

const DynamicFilter = ({ config, onFilterSubmit }) => {
    const [filterValues, setFilterValues] = useState({});

    const handleChange = (key, value) => {
        setFilterValues(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
    <Card style={ComponentStyle.dynamicFilter} className="h-100 shadow rounded-4 overflow-hidden border-0">
		<Card.Body>
			<Card.Title className="mb-4 text-center fw-bold">Bộ lọc</Card.Title>
			
			<Form>
			{config.map((field) => (
				<Form.Group className="mb-3" key={field.key} controlId={field.key}>
				<Form.Label>{field.label}</Form.Label>
				
				{field.type === 'select' ? (
					<Form.Select onChange={(e) => handleChange(field.key, e.target.value)}>
					<option value="">Tất cả</option>
					{field.options?.map(opt => (
						<option key={opt.value} value={opt.value}>{opt.label}</option>
					))}
					</Form.Select>
				) : (
					<Form.Control 
					type={field.type} 
					placeholder={`Nhập ${field.label.toLowerCase()}...`}
					onChange={(e) => handleChange(field.key, e.target.value)}
					/>
				)}
				</Form.Group>
			))}

				<Button variant="primary" className="w-100 mt-3 rounded-pill" 
					onClick={() => onFilterSubmit(filterValues)}
				>
					Lọc
				</Button>
			</Form>
		</Card.Body>
    </Card>
  );
};

export default DynamicFilter;