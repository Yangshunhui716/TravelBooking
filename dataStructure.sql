-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: travelbookingdb
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total_amount` double NOT NULL,
  `booking_status` varchar(20) NOT NULL,
  `payment_status` varchar(20) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `customer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_booking_customer` (`customer_id`),
  CONSTRAINT `fk_booking_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,1700000,'CONFIRMED','PAID','CREDIT_CARD','2026-05-19 01:38:08','2026-05-19 01:38:08',5),(2,5000000,'PENDING','UNPAID','BANK_TRANSFER','2026-05-19 01:38:08','2026-05-19 01:38:08',6),(3,600000,'CONFIRMED','PAID','E_WALLET','2026-05-19 01:38:08','2026-05-19 01:38:08',7);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings_service_detail`
--

DROP TABLE IF EXISTS `bookings_service_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings_service_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `booking_id` bigint NOT NULL,
  `service_id` bigint DEFAULT NULL,
  `unit_price` double NOT NULL,
  `subtotal` double NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bookingdetail_bookings_idx` (`id`),
  KEY `fk_bookingdetail_service_idx` (`service_id`),
  KEY `fk_bookingdetail_booking_idx` (`booking_id`),
  CONSTRAINT `fk_bookingdetail_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_bookingdetail_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings_service_detail`
--

LOCK TABLES `bookings_service_detail` WRITE;
/*!40000 ALTER TABLE `bookings_service_detail` DISABLE KEYS */;
INSERT INTO `bookings_service_detail` VALUES (1,1,1,850000,1700000,2),(2,2,2,2500000,5000000,2),(3,3,3,300000,600000,2);
/*!40000 ALTER TABLE `bookings_service_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `gender` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (5,'Nguyễn Văn An','MALE'),(6,'Trần Thị Ngọc Bình','FEMALE'),(7,'Lê Quốc Cường','MALE');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel_room_services`
--

DROP TABLE IF EXISTS `hotel_room_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel_room_services` (
  `id` bigint NOT NULL,
  `hotel_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `hotel_room_services_ibfk_1` FOREIGN KEY (`id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel_room_services`
--

LOCK TABLES `hotel_room_services` WRITE;
/*!40000 ALTER TABLE `hotel_room_services` DISABLE KEYS */;
INSERT INTO `hotel_room_services` VALUES (2,'Vinpearl Resort & Spa Nha Trang Bay','Đảo Hòn Tre, Nha Trang, Khánh Hòa');
/*!40000 ALTER TABLE `hotel_room_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `providers` (
  `id` bigint NOT NULL,
  `tax` varchar(100) NOT NULL,
  `business_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `providers_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (2,'0300123456','Công ty Dịch vụ Lữ hành Saigontourist','Quận 1, TP.HCM'),(3,'0300987654','Công ty Cổ phần Xe khách Phương Trang','Quận Cầu Giấy, Hà Nội'),(4,'0100456789','Công ty Cổ phần Vinpearl','Nha Trang, Khánh Hòa');
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `rating` int DEFAULT NULL,
  `comment` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  `service_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_review_customer_idx` (`customer_id`),
  KEY `fk_review_service_idx` (`service_id`),
  CONSTRAINT `fk_review_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_review_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,5,'Tour rất vui, hướng dẫn viên nhiệt tình, đồ ăn ngon!','2026-05-19 01:38:08','2026-05-19 01:38:08',5,1),(2,4,'Xe chạy êm nhưng máy lạnh hơi lạnh so với bình thường.','2026-05-19 01:38:08','2026-05-19 01:38:08',7,3),(3,5,'Cảnh biển Cù Lao Chàm quá đẹp, tour rất đáng tiền nha mọi người.','2026-05-19 01:38:08','2026-05-19 01:38:08',6,1),(4,5,'Phòng sạch sẽ, view ngắm hoàng hôn cực đỉnh!','2026-05-19 01:38:08','2026-05-19 01:38:08',5,2);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `destination` varchar(100) NOT NULL,
  `available_slots` int NOT NULL,
  `description` text NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `provider_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_service_provider_idx` (`provider_id`),
  CONSTRAINT `fk_service_provider` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Tour Cù Lao Chàm - Hội An 1 Ngày',850000,'Quảng Nam',20,'Tour ghép đoàn, bao gồm lặn ngắm san hô và ăn trưa hải sản.','AVAILABLE','2026-05-19 01:38:07','2026-05-19 01:38:07',1,NULL,2),(2,'Phòng Deluxe Ocean View',2500000,'Nha Trang',10,'Phòng giường đôi hướng biển, miễn phí buffet sáng.','AVAILABLE','2026-05-19 01:38:07','2026-05-19 01:38:07',1,NULL,4),(3,'Nhà xe Phương Trang (FUTA Bus Lines)',300000,'Đà Lạt',34,'Xe giường nằm 34 chỗ cao cấp, tuyến TP.HCM - Đà Lạt.','AVAILABLE','2026-05-19 01:38:07','2026-05-19 01:38:07',1,NULL,3);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_services`
--

DROP TABLE IF EXISTS `tour_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_services` (
  `id` bigint NOT NULL,
  `duration_days` int NOT NULL,
  `departure_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `tour_services_ibfk_1` FOREIGN KEY (`id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_services`
--

LOCK TABLES `tour_services` WRITE;
/*!40000 ALTER TABLE `tour_services` DISABLE KEYS */;
INSERT INTO `tour_services` VALUES (1,1,'2026-06-10 07:30:00');
/*!40000 ALTER TABLE `tour_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transfer_transactions`
--

DROP TABLE IF EXISTS `transfer_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transfer_transactions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `transaction_code` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `booking_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_payment_booking` (`booking_id`),
  CONSTRAINT `fk_payment_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfer_transactions`
--

LOCK TABLES `transfer_transactions` WRITE;
/*!40000 ALTER TABLE `transfer_transactions` DISABLE KEYS */;
INSERT INTO `transfer_transactions` VALUES (1,1700000,'VNPAY_123456789','SUCCESS','2026-05-19 01:38:08','2026-05-19 01:38:08',1),(2,600000,'MOMO_987654321','SUCCESS','2026-05-19 01:38:08','2026-05-19 01:38:08',3);
/*!40000 ALTER TABLE `transfer_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport_services`
--

DROP TABLE IF EXISTS `transport_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport_services` (
  `id` bigint NOT NULL,
  `transport_type` varchar(100) NOT NULL,
  `departure_location` varchar(100) NOT NULL,
  `end_loaction` varchar(100) NOT NULL,
  `ticket_type` varchar(100) DEFAULT NULL,
  `departure_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `transport_services_ibfk_1` FOREIGN KEY (`id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport_services`
--

LOCK TABLES `transport_services` WRITE;
/*!40000 ALTER TABLE `transport_services` DISABLE KEYS */;
INSERT INTO `transport_services` VALUES (3,'BUS','Bến xe Miền Đông Mới','Bến xe Phương Trang Đà Lạt','VIP','2026-06-15 22:00:00','2026-06-16 05:00:00');
/*!40000 ALTER TABLE `transport_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin_super','$2a$12$dummyhash','0901234567','admin@travel.com','2026-05-19 01:38:07','2026-05-19 01:38:07',NULL,1,NULL,'ROLE_ADMIN'),(2,'provider_sgt','$2a$12$dummyhash','0283123456','contact@saigontourist.com','2026-05-19 01:38:07','2026-05-19 01:38:07',NULL,0,NULL,'ROLE_PROVIDER'),(3,'provider_futa','$2a$12$dummyhash','19006067','hotline@phuongtrang.com','2026-05-19 01:38:07','2026-05-19 01:38:07',NULL,0,NULL,'ROLE_PROVIDER'),(4,'provider_vinpearl','$2a$12$dummyhash','19002323','info@vinpearl.com','2026-05-19 01:38:07','2026-05-19 01:38:07',NULL,0,NULL,'ROLE_PROVIDER'),(5,'customer_an','$2a$12$dummyhash','0912345678','nguyenvana@gmail.com','2026-05-19 01:38:07','2026-05-19 01:38:07',NULL,1,NULL,'ROLE_CUSTOMER'),(6,'customer_binh','$2a$12$dummyhash','0987654321','tranthingocb@gmail.com','2026-05-19 01:38:07','2026-05-19 01:38:07',NULL,1,NULL,'ROLE_CUSTOMER'),(7,'customer_cuong','$2a$12$dummyhash','0933445566','lequoccuong@gmail.com','2026-05-19 01:38:07','2026-05-19 01:38:07',NULL,1,NULL,'ROLE_CUSTOMER'),(9,'admin','$2a$10$hdxKGpRWT8CfxbQiP58zdu7VikiAyFWuN7S6gEcfJpWjM2tA5ZxgC','0900000000','admin@gmail.com','2026-05-19 02:39:09','2026-05-19 02:39:09',NULL,1,NULL,'ROLE_ADMIN');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-19  3:22:09
