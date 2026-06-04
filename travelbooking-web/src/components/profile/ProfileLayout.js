import { Row, Col } from "react-bootstrap";

import ProfileSidebar from "./ProfileSidebar";
import ComponentStyle from "../ComponentStyle";

const ProfileLayout = ({ children }) => {

    return (
        <Row>
            <Col md={3} style={ComponentStyle.profileSticky}>
                <ProfileSidebar />
            </Col>

            <Col md={9}>
                {children}
            </Col>

        </Row>
    );
}

export default ProfileLayout;