# Travel Booking System

## Overview

Travel Booking System is a web-based application developed to support customers in searching, comparing, and booking travel services online. The system provides three main roles: Administrator, Service Provider, and Customer.

The application helps service providers manage travel services efficiently while allowing administrators to monitor system activities, manage users, and generate statistical reports.

## Technologies Used

### Backend

* Java
* Spring MVC
* Spring Security
* Hibernate
* Maven
* JSP

### Frontend
* ReactJS
### Database

* MySQL

### Other Technologies

* RESTful API
* Firebase Realtime Database

---

## Features

### Authentication & Authorization

* User registration and login
* User profile management
* Avatar upload
* Role-based access control using Spring Security
* Service provider approval by administrator

### Customer Features

* Search travel services
* Filter services by location, departure date, service type, and price
* Compare travel services
* Book tours, hotels, and transportation tickets
* View booking history
* Submit ratings and reviews

### Service Provider Features

* Create travel services
* Update service information
* Delete services
* Manage available slots
* View customer bookings
* Monitor service performance
* Manage customer feedback

### Administrator Features

* Manage users
* Approve service providers
* Monitor services
* Generate reports
* View system statistics

### Statistics & Reporting

* Booking statistics
* Revenue reports
* Monthly, quarterly, and yearly analytics

### Real-Time Chat

* Customer and provider communication
* Firebase Realtime Database integration

---

## System Architecture

```text
ReactJS Frontend
        ↓
    RESTful API
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
│   └── src/main
│       ├── java/com/nhom34
│       │   ├── components
│       │   ├── configs
│       │   ├── controllers
│       │   ├── dto
│       │   ├── filters
│       │   ├── pojo
│       │   ├── repositories
│       │   ├── services
│       │   ├── travelbookingapp
│       │   └── utils
│       │
│       ├── resources
│       └── webapp
│
├── travelbooking-web/
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── configs
│   │   ├── reducers
│   │   ├── screens
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── yarn.lock
│
└── travelbookingdatabase.sql
```

---

## Installation

### Prerequisites

* JDK
* Apache Tomcat
* MySQL
* Node.js
* NetBeans IDE

### Database Setup

Create a MySQL database and import:

```text
travelbookingdatabase.sql
```

### Backend Setup

1. Open `TravelBookingApp` in NetBeans.
2. Configure the MySQL database connection.
3. Build the project using **Clean and Build**.
4. Run the application using **Run Project (F6)** or deploy it to Apache Tomcat.

### Frontend Setup

```bash
cd travelbooking-web
npm install
npm start
```

The React application will run on:

```text
http://localhost:3000
```

---

## Contributors

* Le Quang An
* Duong Thieu Huy

---

## License

This project was developed for educational purposes.
