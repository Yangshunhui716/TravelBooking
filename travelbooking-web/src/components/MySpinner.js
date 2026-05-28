// import { Spinner } from "react-bootstrap";
// import { Button } from "react-bootstrap";
// const MySpinner = () => {
//     return 
//     <Button variant="primary" disabled>
//         <Spinner
//           as="span"
//           animation="grow"
//           size="sm"
//           role="status"
//           aria-hidden="true"
//         />
//          Loading...
//     </Button>;
// }

// export default MySpinner;
import { Spinner } from "react-bootstrap";

const MySpinner = () => {
    return <div className="text-center mt-1">
        <Spinner animation="grow" variant="primary" />
    </div>;
}

export default MySpinner;