import { useContext } from "react";

import { MyUserContext } from "../../configs/Context";

import ProfileLayout from "../../components/profile/ProfileLayout";

import ProviderServices from "../../screens/Profile/provider/ProviderServices";
import CustomerBookings from "../../screens/Profile/customer/CustomerBookings";
import { Container } from "react-bootstrap";

const Profile = () => {

    const [user] = useContext(MyUserContext);

    return (
        <Container>
            <ProfileLayout>

                {user?.users?.role === "ROLE_PROVIDER" ? (
                    <ProviderServices />
                ) : (
                    <CustomerBookings />
                )}

            </ProfileLayout>
        </Container>
    );
}

export default Profile;