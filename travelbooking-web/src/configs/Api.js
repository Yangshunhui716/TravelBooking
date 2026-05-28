import axios from "axios";
import cookies from 'react-cookies'
export const endpoints={
    'register': 'auth/register',
    'login': 'auth/login',

    'customer-profile': 'secure/customer/profile',
    'customer-bookings': 'secure/customer/bookings',
    'customerBooking': 'secure/customer/bookings/{bookingId}',
    'customerReview': 'secure/customer/reviews/{reviewId}',
    'customerCreateReview': 'secure/customer/services/{serviceId}/reviews',

    'provider-profile': 'secure/provider/profile',
    'provider-services': 'secure/provider/tour-services',
    'providerTourService': 'secure/provider/tour-services/{tourServiceId}',
    'providerHotelRoomServices': 'secure/provider/hotel-room-services',
    'providerHotelRoomService': 'secure/provider/hotel-room-services/{hotelRoomServiceId}',
    'providerTransportServices': 'secure/provider/transport-services',
    'providerTransportService': 'secure/provider/transport-services/{transportServiceId}',

    'hotelRoomServices': '/hotel-room-services',
    'hotelRoomService': '/hotel-room-services/{hotelRoomServiceId}',
    'tourServices': '/tour-services',
    'tourService': '/tour-services/{tourServiceId}',
    'transportServices': '/transport-services',
    'transportService': '/transport-services/{transportServiceId}',

    'serviceCustomers': 'secure/provider/service/{serviceId}/cutomers',
    'serviceReviews': '/services/{serviceId}/reviews',
}
export const authApis = () => {
    return axios.create({
        baseURL: 'http://localhost:8000/TravelBookingApp/api',
        headers: {
            'Authorization': `Bearer ${cookies.load('token')}`
        }
    })
}
export default axios.create({
    baseURL: "http://localhost:8000/TravelBookingApp/api"
});
