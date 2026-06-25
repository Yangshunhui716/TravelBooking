# Travel Booking System
A full-stack travel booking platform developed using **Spring MVC**, **Spring Security**, **ReactJS**, and **MySQL**. The system allows customers to search, compare, and book travel services online while enabling service providers and administrators to efficiently manage services, bookings, and business reports.
## Technologies
### Backend
* Java
* Spring MVC
* Spring Security
* Hibernate / JPA
* Maven
### Frontend
* ReactJS
* Axios
* React Router
### Database
* MySQL
### Other Technologies
* RESTful API
* Firebase Realtime Database
## Features
### Authentication & Authorization
* User registration and login
* Avatar upload
* Role-based access control
* Service provider approval workflow
### Customer Features
* Search travel services
* Filter by location, date, service type, and price
* Compare services
* Book tours, hotels, and transportation tickets
* View booking history
* Rate and review services
### Service Provider Features
* Create, update, and delete services
* Manage availability
* View customer bookings
* Monitor service performance
* Manage customer feedback
### Administrator Features
* Manage users and providers
* Monitor system activities
* Generate reports and statistics
* View revenue analytics
### Statistics & Reporting
* Booking statistics
* Revenue reports
* Monthly, quarterly, and yearly analytics
### Real-time Chat
* Customer-provider communication
* Firebase Realtime Database integration
## System Architecture

```text
ReactJS Frontend
        ↓
    REST API
        ↓
Spring MVC Backend
        ↓
      MySQL
```

---

## Project Structure

```text
TravelBooking/
│
├── TravelBookingApp/
│   ├── components/
│   ├── configs/
│   ├── controllers/
│   ├── dto/
│   ├── filters/
│   ├── pojo/
│   ├── repositories/
│   ├── services/
│   ├── utils/
│   ├── resources/
│   └── webapp/
│
├── travelbooking-web/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── configs/
│   │   ├── reducers/
│   │   └── screens/
│   └── package.json
│
└── travelbookingdatabase.sql
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/lequanganit/TravelBooking.git
```

### Setup Database

Create a MySQL database and import:

```text
travelbookingdatabase.sql
```

### Run Backend

```bash
cd TravelBookingApp
mvn clean install
mvn spring-boot:run
```

### Run Frontend

```bash
cd travelbooking-web
npm install
npm start
```

---

## Contributors

* Le Quang An
* Duong Thieu Huy

---

## License

This project was developed for educational purposes.
