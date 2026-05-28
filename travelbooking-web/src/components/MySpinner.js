import { Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";
const MySpinner = () => {
    return 
    <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
         Loading...
    </Button>;
}

export default MySpinner;