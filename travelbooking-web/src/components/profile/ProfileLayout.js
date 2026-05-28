import { Row, Col } from "react-bootstrap";

import ProfileSidebar from "./ProfileSidebar";

const ProfileLayout = ({ children }) => {

    return (
        <Row className="mt-4">

            <Col md={3}>
                <ProfileSidebar />
            </Col>

            <Col md={9}>
                {children}
            </Col>

        </Row>
    );
}

export default ProfileLayout;