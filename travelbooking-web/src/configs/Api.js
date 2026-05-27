import axios from "axios";

export const endpoints={
    'register': 'auth/register',
    'login': 'auth/login',

    'customerProfile': 'secure/customer/profile',
    'customerBookings': 'secure/customer/bookings',
    'customerBooking': 'secure/customer/bookings/{bookingId}',
    'customerReview': 'secure/customer/reviews/{reviewId}',
    'customerCreateReview': 'secure/customer/services/{serviceId}/reviews',

    'providerProfile': 'secure/provider/profile',
    'providerTourServices': 'secure/provider/tour-services',
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

export default axios.create({
    baseURL: "http://localhost:8000/TravelBookingApp/api"
});