import { Row, Col } from "react-bootstrap";

import ProfileSidebar from "./ProfileSidebar";

const ProfileLayout = ({ children }) => {

    return (
        <Row className="mt-4" style={{ height: "80vh" }}>

            <Col md={3}>
                <ProfileSidebar />
            </Col>

            <Col md={9} style={{ height: "100%", overflowY: "auto" }}>
                {children}
            </Col>

        </Row>
    );
}

export default ProfileLayout;