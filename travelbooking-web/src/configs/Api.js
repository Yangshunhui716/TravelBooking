import axios from "axios";
import cookies from 'react-cookies'
export const endpoints={
    'register': '/auth/register',
    'login': '/auth/login',

    'customer-profile': '/secure/customer/profile',
    'customer-bookings': '/secure/customer/bookings',
    'customer-bookings-detail': (bookingId) => `secure/customer/bookings/${bookingId}`,

    'customer-review': 'secure/customer/reviews/{reviewId}',
    'customer-create-review': 'secure/customer/services/{serviceId}/reviews',

    'provider-profile': 'secure/provider/profile',
    'provider-services': 'secure/provider/tour-services',
    'provider-tour-services': 'secure/provider/tour-services/{tourServiceId}',
    'provider-hotel-room-services': 'secure/provider/hotel-room-services',
    'provider-hotel-room-service': 'secure/provider/hotel-room-services/{hotelRoomServiceId}',
    'provider-transport-services': 'secure/provider/transport-services',
    'provider-transport-service': 'secure/provider/transport-services/{transportServiceId}',

    'hotel-room-services': '/hotel-room-services',
    'hotel-room-service-detail': (serviceId) => `/hotel-room-services/${serviceId}`,

    'tour-services': '/tour-services',
    'tour-service-detail': (serviceId) => `/tour-services/${serviceId}`,

    'transport-services': '/transport-services',
    'transport-service-detail': (serviceId) => `/transport-services/${serviceId}`,

    'service-customers': 'secure/provider/service/{serviceId}/cutomers',
    'service-reviews': '/services/{serviceId}/reviews',
}
export const authApis = () => {
    return axios.create({
        baseURL: 'http://localhost:8000/TravelBookingApp/api/',
        headers: {
            'Authorization': `Bearer ${cookies.load('token')}`
        }
    })
}
export default axios.create({
    baseURL: "http://localhost:8000/TravelBookingApp/api"
});
