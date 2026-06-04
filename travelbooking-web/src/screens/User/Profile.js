import { useContext } from "react";

import { MyUserContext } from "../../configs/Context";

import ProfileLayout from "../../components/profile/ProfileLayout";
import StaticStyle from "../StaticStyle"
import ProviderServices from "../Provider/ProviderServices";
import CustomerBookings from "../Customer/CustomerBookings";

const Profile = () => {

    const [user] = useContext(MyUserContext);

    return (
        <div className="m-4" style={StaticStyle.baseHeight}>
            <ProfileLayout>

                {user?.users?.role === "ROLE_PROVIDER" ? (
                    <ProviderServices />
                ) : (
                    <CustomerBookings />
                )}

            </ProfileLayout>
        </div>
    );
}

export default Profile;