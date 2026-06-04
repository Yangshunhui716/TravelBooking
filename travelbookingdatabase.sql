-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: travelbookingdb_v2
-- ------------------------------------------------------
-- Server version	8.0.45

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
INSERT INTO `admins` VALUES (61),(62),(63),(64),(65),(66),(67),(68),(69),(70),(71),(72),(73),(74),(75),(76),(77),(78),(79),(80),(81),(82),(83),(84),(85),(86),(87),(88),(89),(90),(92);
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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,1700000,'CONFIRM','PAID','CREDIT_CARD','2024-01-15 08:30:00','2024-01-15 08:30:00',5),(2,5000000,'CONFIRM','PAID','BANK_TRANSFER','2024-02-18 14:20:00','2024-02-18 14:20:00',6),(3,600000,'CONFIRM','PAID','E_WALLET','2024-03-22 10:15:00','2024-03-22 10:15:00',7),(4,1200000,'CANCEL','UNPAID','CASH','2024-04-05 09:00:00','2024-04-05 09:00:00',10),(5,900000,'CONFIRM','PAID','MOMO','2024-05-12 16:40:00','2024-05-12 16:40:00',13),(6,2500000,'CONFIRM','PAID','PAYPAL','2024-06-28 11:10:00','2024-06-28 11:10:00',5),(7,1500000,'CONFIRM','PAID','CASH','2024-07-14 15:25:00','2024-07-14 15:25:00',6),(8,850000,'CONFIRM','PAID','CREDIT_CARD','2024-08-20 08:00:00','2024-08-20 08:00:00',7),(9,300000,'CONFIRM','PAID','MOMO','2024-09-05 13:45:00','2024-09-05 13:45:00',10),(10,2200000,'CONFIRM','PAID','BANK_TRANSFER','2024-10-18 17:30:00','2024-10-18 17:30:00',13),(11,450000,'CONFIRM','PAID','E_WALLET','2024-11-25 19:20:00','2024-11-25 19:20:00',5),(12,1800000,'CONFIRM','PAID','CASH','2024-12-12 14:00:00','2024-12-12 14:00:00',6),(13,850000,'CONFIRM','PAID','CREDIT_CARD','2025-01-10 10:00:00','2025-01-10 10:00:00',7),(14,2500000,'CONFIRM','PAID','BANK_TRANSFER','2025-01-25 09:15:00','2025-01-25 09:15:00',10),(15,300000,'CONFIRM','PAID','MOMO','2025-02-05 16:35:00','2025-02-05 16:35:00',13),(16,1500000,'CONFIRM','PAID','PAYPAL','2025-03-14 11:20:00','2025-03-14 11:20:00',5),(17,950000,'CONFIRM','PAID','CASH','2025-04-02 07:45:00','2025-04-02 07:45:00',6),(18,600000,'CANCEL','UNPAID','MOMO','2025-04-20 15:00:00','2025-04-20 15:00:00',7),(19,2200000,'CONFIRM','PAID','BANK_TRANSFER','2025-05-08 13:12:00','2025-05-08 13:12:00',10),(20,1200000,'CONFIRM','PAID','CREDIT_CARD','2025-06-18 08:40:00','2025-06-18 08:40:00',13),(21,900000,'CONFIRM','PAID','E_WALLET','2025-07-22 10:05:00','2025-07-22 10:05:00',5),(22,1500000,'CONFIRM','PAID','CASH','2025-08-11 14:50:00','2025-08-11 14:50:00',6),(23,300000,'CONFIRM','PAID','MOMO','2025-09-30 16:15:00','2025-09-30 16:15:00',7),(24,600000,'CONFIRM','PAID','PAYPAL','2025-10-05 11:00:00','2025-10-05 11:00:00',10),(25,950000,'CONFIRM','PAID','BANK_TRANSFER','2025-11-12 09:30:00','2025-11-12 09:30:00',13),(26,2200000,'CONFIRM','PAID','CREDIT_CARD','2025-12-25 21:45:00','2025-12-25 21:45:00',5),(27,850000,'CONFIRM','PAID','E_WALLET','2026-01-08 10:30:00','2026-01-08 10:30:00',6),(28,950000,'CONFIRM','PAID','CASH','2026-01-20 14:15:00','2026-01-20 14:15:00',7),(29,600000,'CONFIRM','PAID','MOMO','2026-02-14 08:25:00','2026-02-14 08:25:00',10),(30,1500000,'CONFIRM','PAID','BANK_TRANSFER','2026-03-05 16:40:00','2026-03-05 16:40:00',13),(31,2200000,'CONFIRM','PAID','PAYPAL','2026-04-12 11:20:00','2026-04-12 11:20:00',5),(32,1200000,'CONFIRM','PAID','CREDIT_CARD','2026-05-02 09:00:00','2026-05-02 09:00:00',6),(33,900000,'PENDING','UNPAID','CASH','2026-06-02 15:30:00','2026-06-02 15:30:00',10),(34,1600000,'CONFIRM','UNPAID','CASH','2026-06-04 18:17:35','2026-06-04 18:17:35',91),(35,1600000,'CONFIRM','UNPAID','CASH','2026-06-04 18:18:42','2026-06-04 18:18:42',91),(36,1500000,'PENDING','UNPAID','PAYPAL','2026-06-04 18:18:57','2026-06-04 18:18:57',91),(37,500000,'CONFIRM','PAID','PAYPAL','2026-06-04 18:21:40','2026-06-04 18:21:40',91);
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
  `service_start_date` date NOT NULL,
  `service_duration` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bookingdetail_bookings_idx` (`id`),
  KEY `fk_bookingdetail_service_idx` (`service_id`),
  KEY `fk_bookingdetail_booking_idx` (`booking_id`),
  CONSTRAINT `fk_bookingdetail_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_bookingdetail_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings_service_detail`
--

LOCK TABLES `bookings_service_detail` WRITE;
/*!40000 ALTER TABLE `bookings_service_detail` DISABLE KEYS */;
INSERT INTO `bookings_service_detail` VALUES (1,1,1,850000,1700000,2,'2024-01-20',1),(2,2,2,2500000,5000000,2,'2024-02-25',2),(3,3,3,300000,600000,2,'2024-03-25',1),(4,4,28,1200000,1200000,1,'2024-04-10',1),(5,5,23,900000,900000,1,'2024-05-15',1),(6,6,2,2500000,2500000,1,'2024-07-01',2),(7,7,31,1500000,1500000,1,'2024-07-20',1),(8,8,1,850000,850000,1,'2024-08-25',1),(9,9,3,300000,300000,1,'2024-09-10',1),(10,10,33,2200000,2200000,1,'2024-10-25',1),(11,11,4,20000,40000,2,'2024-11-28',1),(12,12,28,1200000,1200000,1,'2024-12-15',1),(13,13,1,850000,850000,1,'2025-01-15',1),(14,14,2,2500000,2500000,1,'2025-02-01',2),(15,15,3,300000,300000,1,'2025-02-10',1),(16,16,31,1500000,1500000,1,'2025-03-20',1),(17,17,29,950000,950000,1,'2025-04-10',1),(18,18,30,600000,600000,1,'2025-04-25',1),(19,19,33,2200000,2200000,1,'2025-05-15',2),(20,20,28,1200000,1200000,1,'2025-06-20',1),(21,21,23,900000,900000,1,'2025-07-28',1),(22,22,31,1500000,1500000,1,'2025-08-15',1),(23,23,3,300000,300000,1,'2025-10-02',1),(24,24,30,600000,600000,1,'2025-10-10',1),(25,25,29,950000,950000,1,'2025-11-20',1),(26,26,33,2200000,2200000,1,'2025-12-28',2),(27,27,1,850000,850000,1,'2026-01-15',1),(28,28,29,950000,950000,1,'2026-01-25',1),(29,29,30,600000,600000,1,'2026-02-20',1),(30,30,31,1500000,1500000,1,'2026-03-10',1),(31,31,33,2200000,2200000,1,'2026-04-18',2),(32,32,28,1200000,1200000,1,'2026-05-10',1),(33,33,23,900000,900000,1,'2026-06-05',1),(34,34,22,1600000,1600000,1,'2026-06-04',1),(35,35,22,1600000,1600000,1,'2026-06-04',1),(36,36,1,1500000,1500000,1,'2026-06-04',1),(37,37,32,500000,500000,1,'2026-07-11',1);
/*!40000 ALTER TABLE `bookings_service_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversation`
--

DROP TABLE IF EXISTS `conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversation` (
  `id` varchar(100) NOT NULL,
  `last_message` varchar(255) DEFAULT NULL,
  `provider` bigint DEFAULT NULL,
  `customer` bigint DEFAULT NULL,
  `provider_unread` int DEFAULT NULL,
  `customer_unread` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_conversation_customer_idx` (`customer`),
  KEY `fk_conversation_provider_idx` (`provider`),
  CONSTRAINT `fk_conversation_customer` FOREIGN KEY (`customer`) REFERENCES `customers` (`id`),
  CONSTRAINT `fk_conversation_provider` FOREIGN KEY (`provider`) REFERENCES `providers` (`id`) ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation`
--

LOCK TABLES `conversation` WRITE;
/*!40000 ALTER TABLE `conversation` DISABLE KEYS */;
INSERT INTO `conversation` VALUES ('conv_01','Chào bạn, phòng của bạn đã chuẩn bị xong.',48,1,0,1,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_02','Vâng, hẹn gặp bạn ngày mai.',49,2,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_03','Cho mình hỏi về giờ check-in?',35,3,1,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_04','Dạ phòng đã bao gồm buffet sáng ạ.',50,4,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_05','Cảm ơn hệ thống.',52,5,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_06','Phòng Bungalow hiện đang hết.',53,6,0,1,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_07','Dạ chúng tôi đón bạn tại sảnh.',54,7,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_08','Tôi muốn hủy lịch đặt đơn này.',55,8,2,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_09','Novotel hân hạnh phục vụ.',51,9,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_10','Yêu cầu đặc biệt đã được lưu.',56,10,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_11','Tour Hạ Long khởi hành lúc 12h trưa.',40,11,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_12','Địa đạo Củ Chi tập trung lúc 8h sáng.',31,12,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_13','Thời tiết Quy Nhơn hiện tại rất đẹp.',32,13,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_14','Bạn nhớ mang theo áo ấm Sapa nhé.',39,14,0,1,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_15','Huế đón khách tại ga hoặc sân bay.',33,15,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_16','Tàu đi chợ nổi rời bến đúng giờ.',34,16,1,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_17','Lý Sơn đang vào mùa biển đẹp.',36,17,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_18','Nhớ đi giày thể thao để leo hang động.',33,18,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_19','Lịch trình tour chi tiết đã gửi mail.',36,19,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_20','Đà Lạt sáng sớm lạnh 14 độ nhé.',35,20,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_21','Xe limousine mang BKS 29B-123.45.',44,21,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_22','Bạn vui lòng ra bến tàu trước 30p.',59,22,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_23','Xe cabin số ghế của bạn là 05.',43,23,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_24','Tài xế sẽ liên hệ trước khi đến 15p.',43,24,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_25','Mã vé QR tàu hỏa đã gửi vào tin nhắn.',57,25,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_26','Xe Sài Gòn Mũi Né đi đường cao tốc.',44,26,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_27','Xe giường nằm đầy đủ chăn đắp, nước uống.',43,27,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_28','Tàu Express đi Côn Đảo chuẩn bị chạy.',58,28,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_29','Vui lòng làm thủ tục tại quầy trước 2 tiếng.',45,29,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('conv_30','Xe bus mui trần có tai nghe thuyết minh.',41,30,0,0,'2026-06-04 16:01:26','2026-06-04 16:01:26'),('user_40_91',NULL,40,91,0,0,'2026-06-04 18:46:01','2026-06-04 18:46:01');
/*!40000 ALTER TABLE `conversation` ENABLE KEYS */;
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
INSERT INTO `customers` VALUES (1,'Nguyễn Văn A','MALE'),(2,'Trần Thị B','FEMALE'),(3,'Lê Văn C','MALE'),(4,'Phạm Minh D','MALE'),(5,'Hoàng Thị E','FEMALE'),(6,'Vũ Hoàng F','MALE'),(7,'Phan Thị G','FEMALE'),(8,'Đoàn Văn H','MALE'),(9,'Bùi Thị I','FEMALE'),(10,'Đặng Văn J','MALE'),(11,'Ngô Thị K','FEMALE'),(12,'Dương Văn L','MALE'),(13,'Lý Thanh M','MALE'),(14,'Đỗ Mỹ N','FEMALE'),(15,'Trịnh Văn O','MALE'),(16,'Mai Phương P','FEMALE'),(17,'Phùng Tiến Q','MALE'),(18,'Hà Hải R','FEMALE'),(19,'Tạ Đình S','MALE'),(20,'Võ Minh T','FEMALE'),(21,'Diệp Gia U','MALE'),(22,'Quách Ngọc V','FEMALE'),(23,'Đường Gia W','MALE'),(24,'Tiêu Thập X','FEMALE'),(25,'Âu Dương Y','MALE'),(26,'Lâm Thúy Z','FEMALE'),(27,'Thái Bảo AA','MALE'),(28,'Vương Hồng BB','FEMALE'),(29,'Cao Tiến CC','MALE'),(30,'Đinh Gia DD','FEMALE'),(91,'Le Quang An','MALE');
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
  `rate` decimal(3,1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `hotel_room_services_ibfk_1` FOREIGN KEY (`id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel_room_services`
--

LOCK TABLES `hotel_room_services` WRITE;
/*!40000 ALTER TABLE `hotel_room_services` DISABLE KEYS */;
INSERT INTO `hotel_room_services` VALUES (1,'Rex Hotel','141 Nguyen Hue, Q1, HCM',4.5),(2,'Muong Thanh Luxury','60 Tran Phu, Nha Trang',4.2),(3,'Dalat Palace Hotel','2 Tran Phu, Da Lat',4.7),(4,'Vinpearl Resort','Bai Dai, Phu Quoc',4.8),(5,'Pullman Vung Tau','15 Thi Sach, Vung Tau',4.3),(6,'Topas Ecolodge','Ban Lach, Sa Pa',4.9),(7,'InterContinental Danang','Bai Bac, Son Tra, Danang',5.0),(8,'Apricot Hotel','136 Hang Trong, Hoan Kiem, HN',4.6),(9,'Novotel Resort','Duong Bao, Phu Quoc',4.4),(10,'Sea Links Hotel','Km 9, Nguyen Thong, Phan Thiet',4.1),(11,'Rex Hotel Branch B','145 Nguyen Hue, Q1, HCM',4.3),(12,'Muong Thanh Grand','04 Tran Phu, Nha Trang',4.1),(13,'Dalat Heritage Villa','10 Khe Sanh, Da Lat',4.5),(14,'Vinpearl Discovery','Ganh Dau, Phu Quoc',4.7),(15,'Pullman Executive Suite','15 Thi Sach, Vung Tau',4.6),(16,'Topas VIP Lodge','Ban Lach, Sa Pa',4.9),(17,'InterContinental Peninsu','Son Tra, Danang',4.9),(18,'Apricot Gallery Room','136 Hang Trong, HN',4.5),(19,'Novotel Premium Villa','Duong Bao, Phu Quoc',4.6),(20,'Sea Links Premium Villa','Mui Ne, Phan Thiet',4.3),(21,'Rex Budget Room','141 Nguyen Hue, Q1, HCM',3.9),(22,'Muong Thanh Standard','60 Tran Phu, Nha Trang',3.8),(23,'Dalat Palace Suite','2 Tran Phu, Da Lat',4.8),(24,'Vinpearl Oasis','Bai Dai, Phu Quoc',4.4),(25,'Pullman Standard Room','15 Thi Sach, Vung Tau',4.1),(26,'Topas Poolside Villa','Ban Lach, Sa Pa',5.0),(27,'InterContinental Garden','Son Tra, Danang',4.7),(28,'Apricot Boutique Room','136 Hang Trong, HN',4.4),(29,'Novotel Standard Garden','Duong Bao, Phu Quoc',4.2),(30,'Sea Links Family Suite','Mui Ne, Phan Thiet',4.4);
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
INSERT INTO `providers` VALUES (31,'TAX031','Saigontourist','45 Lê Lợi, Q1, HCM'),(32,'TAX032','Vietravel','190 Pasteur, Q3, HCM'),(33,'TAX033','Hanoi Tourist','18 Lý Thường Kiệt, Hoàn Kiếm, HN'),(34,'TAX034','Muanest Travel','78 Nguyễn Huệ, Q1, HCM'),(35,'TAX035','Dalat Discovery','12 Phan Đình Phùng, Đà Lạt'),(36,'TAX036','DaNang Green Tour','456 Trần Hưng Đạo, Đà Nẵng'),(37,'TAX037','NhaTrang Ocean Club','78 Trần Phú, Nha Trang'),(38,'TAX038','PhuQuoc Sun Travel','123 Trần Hưng Đạo, Phú Quốc'),(39,'TAX039','Sapa Adventure','5 Thạch Sơn, Sapa'),(40,'TAX040','HaLong Cruise Co.','Tuần Châu Marina, Hạ Long'),(41,'TAX041','Vinasun Taxi','648 Nguyễn Trãi, Q5, HCM'),(42,'TAX042','Mai Linh Group','22 Nguyễn Bỉnh Khiêm, Q1, HCM'),(43,'TAX043','Phương Trang FUTA','486 Lê Hồng Phong, Q10, HCM'),(44,'TAX044','Thành Bưởi Limousine','266 Lê Hồng Phong, Q5, HCM'),(45,'TAX045','Vietnam Airlines','200 Nguyễn Sơn, Long Biên, HN'),(46,'TAX046','Vietjet Air','302 Kim Mã, Ba Đình, HN'),(47,'TAX047','Bamboo Airways','22 Võ Nguyên Giáp, Ba Đình, HN'),(48,'TAX048','Khách Sạn Rex','141 Nguyễn Huệ, Q1, HCM'),(49,'TAX049','Mường Thanh Hospitality','Bán đảo Linh Đàm, Hoàng Mai, HN'),(50,'TAX050','Vinpearl Resort','Đảo Hòn Tre, Nha Trang'),(51,'TAX051','Novotel Hotels','2 Ba Đình, Đà Nẵng'),(52,'TAX052','Pullman Vũng Tàu','15 Thi Sách, Vũng Tàu'),(53,'TAX053','Topas Ecolodge Sapa','Bản Lếch, Sa Pa'),(54,'TAX054','InterContinental Group','Bán đảo Sơn Trà, Đà Nẵng'),(55,'TAX055','Apricot Hà Nội','136 Hàng Trống, Hoàn Kiếm, HN'),(56,'TAX056','Sea Links City','Km 9 Nguyễn Thông, Phan Thiết'),(57,'TAX057','Hải Vân Limousine','Đường 2/9, Hải Châu, Đà Nẵng'),(58,'TAX058','Hòa Bình Ship','Cảng Rạch Giá, Kiên Giang'),(59,'TAX059','Phú Quốc Express','Cảng bãi Vòng, Phú Quốc'),(60,'TAX060','Đông Bắc Travel','Hòn Gai, Hạ Long');
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,5,'Khách sạn sạch sẽ, nhân viên thân thiện.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,1),(2,4,'Phòng view biển đẹp xuất sắc.','2026-06-04 16:01:26','2026-06-04 16:01:26',2,2),(3,4,'Không gian lãng mạn nghỉ dưỡng tốt.','2026-06-04 16:01:26','2026-06-04 16:01:26',3,3),(4,5,'Gia đình rất thích Vinpearl.','2026-06-04 16:01:26','2026-06-04 16:01:26',4,4),(5,3,'Hơi ồn do gần phố.','2026-06-04 16:01:26','2026-06-04 16:01:26',5,5),(6,5,'Trải nghiệm đỉnh cao tại Sapa.','2026-06-04 16:01:26','2026-06-04 16:01:26',6,6),(7,5,'Dịch vụ 5 sao đẳng cấp.','2026-06-04 16:01:26','2026-06-04 16:01:26',7,7),(8,2,'Phòng hơi bé so với hình.','2026-06-04 16:01:26','2026-06-04 16:01:26',8,8),(9,4,'Hồ bơi đẹp thức ăn ngon.','2026-06-04 16:01:26','2026-06-04 16:01:26',9,9),(10,5,'Biệt thự sang trọng thoải mái.','2026-06-04 16:01:26','2026-06-04 16:01:26',10,10),(11,4,'Tour du thuyền Hạ Long ngắm hoàng hôn rất đẹp.','2026-06-04 16:01:26','2026-06-04 16:01:26',11,31),(12,5,'Hướng dẫn viên nhiệt tình vui tính.','2026-06-04 16:01:26','2026-06-04 16:01:26',12,32),(13,3,'Thời tiết nắng nhưng Kỳ Co rất đẹp.','2026-06-04 16:01:26','2026-06-04 16:01:26',13,33),(14,5,'Leo Fansipan mệt nhưng vui.','2026-06-04 16:01:26','2026-06-04 16:01:26',14,34),(15,4,'Cố đô Huế cổ kính trầm mặc.','2026-06-04 16:01:26','2026-06-04 16:01:26',15,35),(16,4,'Đi chợ nổi Cái Răng trải nghiệm tốt.','2026-06-04 16:01:26','2026-06-04 16:01:26',16,36),(17,5,'Biển Lý Sơn hoang sơ trong lành.','2026-06-04 16:01:26','2026-06-04 16:01:26',17,37),(18,4,'Động Phong Nha mát mẻ kỳ vĩ.','2026-06-04 16:01:26','2026-06-04 16:01:26',18,38),(19,5,'Đi tour trọn gói rất tiện lợi.','2026-06-04 16:01:26','2026-06-04 16:01:26',19,39),(20,5,'Săn mây Đà Lạt thành công rực rỡ.','2026-06-04 16:01:26','2026-06-04 16:01:26',20,40),(21,5,'Xe Limousine ghế massage nằm rất êm.','2026-06-04 16:01:26','2026-06-04 16:01:26',21,61),(22,4,'Tàu cao tốc chạy êm không say.','2026-06-04 16:01:26','2026-06-04 16:01:26',22,62),(23,4,'Cabin đôi sạch sẽ và riêng tư.','2026-06-04 16:01:26','2026-06-04 16:01:26',23,63),(24,3,'Tài xế chạy hơi nhanh một tí.','2026-06-04 16:01:26','2026-06-04 16:01:26',24,64),(25,5,'Đi tàu hỏa ngắm cảnh đèo Hải Vân cực thích.','2026-06-04 16:01:26','2026-06-04 16:01:26',25,65),(26,4,'Xe đi cao tốc mới nên rất tiết kiệm thời gian.','2026-06-04 16:01:26','2026-06-04 16:01:26',26,66),(27,4,'Xe giường nằm cơ bản tốt.','2026-06-04 16:01:26','2026-06-04 16:01:26',27,67),(28,5,'Tàu Express Vũng Tàu đi Côn Đảo chất lượng.','2026-06-04 16:01:26','2026-06-04 16:01:26',28,68),(29,5,'Bay Vietnam Airlines an tâm đúng giờ.','2026-06-04 16:01:26','2026-06-04 16:01:26',29,69),(30,4,'Trải nghiệm ngắm phố phường bằng xe mui trần rất vui.','2026-06-04 16:01:26','2026-06-04 16:01:26',30,70),(31,5,'tốt','2026-06-04 18:22:40',NULL,91,32),(32,5,'dịch vụ hoàn hảo\n','2026-06-04 18:23:36',NULL,91,32),(33,5,'nhiệt tình','2026-06-04 18:23:48',NULL,91,32),(34,5,'tham gia ','2026-06-04 18:24:03',NULL,91,32);
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
  `slots` int NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `status` tinyint(1) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `provider_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_service_provider_idx` (`provider_id`),
  CONSTRAINT `fk_service_provider` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Phòng Deluxe Rex',1500000,'Hồ Chí Minh',10,20,'Phòng sang trọng tiện nghi.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',48),(2,'Phòng Suite Mường Thanh',2200000,'Nha Trang',5,10,'Phòng hướng biển siêu đẹp.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',49),(3,'Phòng Standard DaLat Palace',1800000,'Đà Lạt',8,15,'Cổ kính thơ mộng.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',35),(4,'Phòng Family Vinpearl',4500000,'Phú Quốc',4,8,'Hợp với gia đình.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',50),(5,'Phòng Single Pullman',2500000,'Vũng Tàu',12,20,'Tiện nghi cho doanh nhân.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',52),(6,'Bungalow Topas Ecolodge',3800000,'Sa Pa',2,5,'Hòa cùng thiên nhiên Sapa.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',53),(7,'Phòng Executive InterContinental',5000000,'Đà Nẵng',6,10,'Đẳng cấp 5 sao quốc tế.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',54),(8,'Phòng Superior Apricot',2800000,'Hà Nội',9,15,'Ngay cạnh Hồ Gươm.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',55),(9,'Phòng Studio Novotel',3200000,'Phú Quốc',7,12,'Hiện đại trẻ trung.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',51),(10,'Phòng Villa Sea Links',6000000,'Phan Thiết',3,5,'Biệt thự có hồ bơi riêng.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',56),(11,'Phòng Executive Rex 2',1700000,'Hồ Chí Minh',5,10,'Phòng VIP.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',48),(12,'Phòng Ocean View Mường Thanh 2',2400000,'Nha Trang',4,8,'View trực diện biển.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',49),(13,'Phòng Luxury DaLat Palace 2',2000000,'Đà Lạt',6,12,'Cực kỳ sang chảnh.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',35),(14,'Phòng Villa Vinpearl Phú Quốc 2',8000000,'Phú Quốc',2,4,'Villa 3 phòng ngủ.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',50),(15,'Phòng Double Pullman 2',2700000,'Vũng Tàu',10,15,'Giường đôi rộng rãi.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',52),(16,'Phòng Premium Topas 2',4200000,'Sa Pa',3,6,'Góc nhìn thung lũng đẹp.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',53),(17,'Phòng Suite InterContinental 2',7000000,'Đà Nẵng',2,5,'Phòng Tổng Thống.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',54),(18,'Phòng Grand Deluxe Apricot 2',3500000,'Hà Nội',4,10,'Thiết kế hoàng gia.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',55),(19,'Phòng Family Novotel 2',4800000,'Phú Quốc',5,10,'Dành cho nhóm bạn.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',51),(20,'Phòng Suite Sea Links 2',3900000,'Phan Thiết',8,15,'Gần sân Golf cao cấp.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',56),(21,'Phòng Standard Rex 3',1200000,'Hồ Chí Minh',15,20,'Tiết kiệm chi phí.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',48),(22,'Phòng Deluxe Mường Thanh 3',1600000,'Nha Trang',10,20,'Cơ bản, sạch sẽ.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',49),(23,'Phòng VIP DaLat Palace 3',3000000,'Đà Lạt',2,5,'Ban công rộng ngắm hồ.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',35),(24,'Phòng Deluxe Vinpearl Phú Quốc 3',3500000,'Phú Quốc',12,30,'Phòng tiêu chuẩn resort.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',50),(25,'Phòng Executive Pullman 3',3200000,'Vũng Tàu',5,10,'Bao gồm đặc quyền Lounge.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',52),(26,'Phòng Pool Villa Topas 3',9000000,'Sa Pa',1,2,'Có bể bơi nước nóng riêng.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',53),(27,'Phòng Resort View InterContinental 3',4500000,'Đà Nẵng',10,20,'Hướng vườn xanh mát.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',54),(28,'Phòng Canvas Apricot 3',2500000,'Hà Nội',6,12,'Mang phong cách nghệ thuật.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',55),(29,'Phòng Superior Novotel Phú Quốc 3',2600000,'Phú Quốc',15,25,'Giá hợp lý.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',51),(30,'Phòng Ocean View Sea Links 3',3100000,'Phan Thiết',11,20,'Ngắm bình minh biển.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/bang-gia-phong-khach-san-anh-phuong-2-hai-tien-moi-nhat-1_xdjsom.jpg',56),(31,'Tour Ngắm Hoàng Hôn Vịnh Hạ Long',1200000,'Hạ Long',20,40,'Hành trình du thuyền 5 sao.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',40),(32,'Tour Khám Phá Địa Đạo Củ Chi',500000,'Hồ Chí Minh',24,30,'Tìm hiểu lịch sử.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',31),(33,'Tour Kỳ Co - Eo Gió Trọn Gói',850000,'Quy Nhơn',15,25,'Tắm biển ngắm san hô.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',32),(34,'Tour Trekking Fansipan 2 Ngày',2100000,'Sa Pa',10,15,'Chinh phục nóc nhà Đông Dương.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',39),(35,'Tour Khám Phá Cố Đô Huế',950000,'Huế',18,30,'Thăm lăng tẩm và Đại Nội.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',33),(36,'Tour Chợ Nổi Cái Răng Cần Thơ',600000,'Cần Thơ',22,35,'Văn hóa miền Tây.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',34),(37,'Tour Đảo Lý Sơn Lặn Biển',1600000,'Quảng Ngãi',8,12,'Khám phá đảo núi lửa.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',36),(38,'Tour Khám Phá Động Phong Nha',1300000,'Quảng Bình',14,20,'Kỳ quan hang động.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',33),(39,'Tour Hành Trình Di Sản Miền Trung',4500000,'Đà Nẵng',12,25,'4 ngày 3 đêm trọn gói.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',36),(40,'Tour Săn Mây Đà Lạt Sớm',300000,'Đà Lạt',30,50,'Check-in đồi chè Cầu Đất.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',35),(41,'Tour Ẩm Thực Đêm Sài Gòn',45000,'Hồ Chí Minh',15,20,'Thưởng thức món ăn đường phố.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',31),(42,'Tour Đồng Bằng Sông Cửu Long',1100000,'Bến Tre',20,30,'Đi đò chèo, ăn trái cây.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',31),(43,'Tour Đảo Hòn Mun Nha Trang',700000,'Nha Trang',15,25,'Tàu đáy kính xem san hô.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',37),(44,'Tour Đảo Điệp Sơn Con Đường Dưới Biển',900000,'Nha Trang',10,20,'Đi bộ giữa biển độc đáo.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',37),(45,'Tour Tràng An - Bái Đính 1 Ngày',850000,'Ninh Bình',25,40,'Thăm hang động bằng thuyền.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',33),(46,'Tour Vịnh Lan Hạ Cát Bà',1400000,'Hải Phòng',15,30,'Chèo thuyền kayak tắm biển.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',40),(47,'Tour Đảo Nam Du Kiên Giang',2300000,'Kiên Giang',12,20,'3 ngày 2 đêm hoang sơ.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',58),(48,'Tour Phú Quốc 4 Đảo Cáp Treo',1050000,'Phú Quốc',20,40,'Hòn Thơm cáp treo vượt biển.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',38),(49,'Tour Khám Phá Bản Cát Cát',350000,'Sa Pa',30,50,'Tìm hiểu văn hóa Mông.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',39),(50,'Tour City Tour Hà Nội',400000,'Hà Nội',25,30,'Lăng Bác, Văn Miếu, Hồ Gươm.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',33),(51,'Tour Bà Nà Hills Đường Lên Tiên Cảnh',1250000,'Đà Nẵng',40,100,'Check-in Cầu Vàng nổi tiếng.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',36),(52,'Tour Ngũ Hành Sơn - Hội An Đêm',450000,'Quảng Nam',30,50,'Thả hoa đăng sông Hoài.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',36),(53,'Tour Thác Bản Giốc Cao Bằng',2600000,'Cao Bằng',10,15,'Thác nước biên giới hùng vĩ.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',33),(54,'Tour Khám Phá Hà Giang Hùng Vĩ',2900000,'Hà Giang',12,18,'Mã Pí Lèng, Cột cờ Lũng Cú.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',33),(55,'Tour Rừng Quốc Gia Nam Cát Tiên',1800000,'Đồng Nai',8,15,'Xem thú ban đêm hoang dã.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',34),(56,'Tour Khám Phá Cù Lao Chàm',650000,'Quảng Nam',20,35,'Đi ca nô cao tốc lặn biển.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',36),(57,'Tour Miệt Vườn Vĩnh Long',550000,'Vĩnh Long',15,30,'Trải nghiệm làm bánh dân gian.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',34),(58,'Tour Thánh Địa Mỹ Sơn',500000,'Quảng Nam',15,25,'Kiến trúc Chăm cổ kính.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',36),(59,'Tour Rừng Tràm Trà Sư',750000,'An Giang',20,30,'Mùa nước nổi xanh mướt.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',34),(60,'Tour Nghỉ Dưỡng Suối Khoáng Bình Châu',1200000,'Vũng Tàu',15,20,'Tắm bùn khoáng nóng.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564169/Cac-Tour-Dulich-Tron_fgdxec.jpg',31),(61,'Vé Xe Limousine Sài Gòn - Đà Lạt',350000,'Đà Lạt',9,11,'Ghế massage êm ái.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',44),(62,'Vé Tàu Cao Tốc Rạch Giá - Phú Quốc',340000,'Phú Quốc',50,100,'Tàu chạy 2 tiếng 30 phút.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',59),(63,'Vé Xe Giường Nằm Hà Nội - Sapa',280000,'Sa Pa',15,40,'Xe cabin đôi đời mới.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',43),(64,'Vé Xe Limousine Hà Nội - Hạ Long',250000,'Hạ Long',7,9,'Đón trả tận nơi.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',43),(65,'Vé Tàu Hỏa Đà Nẵng - Huế',150000,'Huế',40,60,'Ngắm vịnh Lăng Cô qua đèo.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',57),(66,'Vé Xe Limousine Sài Gòn - Mũi Né',300000,'Phan Thiết',8,11,'Chạy cao tốc 2.5 tiếng.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',44),(67,'Vé Xe Giường Nằm Sài Gòn - Nha Trang',400000,'Nha Trang',20,36,'Có nhà vệ sinh trên xe.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',43),(68,'Vé Tàu Cao Tốc Vũng Tàu - Côn Đảo',790000,'Côn Đảo',60,150,'Tàu Express 5 sao chịu sóng.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',58),(69,'Vé Máy Bay Khứ Hồi Hà Nội - Sài Gòn',2800000,'Hồ Chí Minh',15,30,'Hãng bay Vietnam Airlines.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',45),(70,'Vé Xe Buýt Mui Trần Ngắm Cảnh TP',150000,'Hồ Chí Minh',35,45,'City Tour Hop-on Hop-off.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',41),(71,'Vé Máy Bay Sài Gòn - Đà Nẵng',1500000,'Đà Nẵng',20,40,'Hãng bay Vietjet Air.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',46),(72,'Vé Máy Bay Hà Nội - Phú Quốc',2300000,'Phú Quốc',10,20,'Hãng bay Bamboo Airways.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',47),(73,'Vé Tàu Cao Tốc Sóc Trăng - Côn Đảo',400000,'Côn Đảo',30,80,'Tuyến Trần Đề ra đảo.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',58),(74,'Vé Tàu Cao Tốc Hải Phòng - Cát Bà',250000,'Hải Phòng',40,100,'Tàu thủy cao tốc bến Bính.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',60),(75,'Vé Xe Limousine Sài Gòn - Vũng Tàu',200000,'Vũng Tàu',9,9,'Xuất phát mỗi 30 phút.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',44),(76,'Vé Xe Giường Nằm Hà Nội - Hà Giang',300000,'Hà Giang',15,30,'Xe cung điện VIP.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',43),(77,'Vé Xe Limousine Hà Nội - Ninh Bình',200000,'Ninh Bình',5,9,'Xe 9 chỗ sang trọng.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',43),(78,'Vé Tàu Hỏa SE1 Hà Nội - Đà Nẵng',900000,'Đà Nẵng',15,50,'Giường nằm khoang 4 điều hòa.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',57),(79,'Vé Tàu Hỏa 5 Sao Sài Gòn - Nha Trang',600000,'Nha Trang',20,40,'Mã tàu SNT2 chất lượng cao.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',57),(80,'Vé Ca Nô Cao Tốc Hội An - Cù Lao Chàm',350000,'Quảng Nam',25,40,'Trọn gói khứ hồi trong ngày.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',57),(81,'Vé Xe Giường Nằm Đà Nẵng - Quy Nhơn',280000,'Quy Nhơn',12,30,'Hãng xe Sơn Tùng.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',43),(82,'Vé Xe Limousine Đà Nẵng - Huế',180000,'Huế',4,9,'Đón tận trung tâm thành phố.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',57),(83,'Vé Xe Giường Đôi Sài Gòn - Đà Lạt',450000,'Đà Lạt',6,20,'Thích hợp cho cặp đôi.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',44),(84,'Vé Xe Limousine Sài Gòn - Cần Thơ',220000,'Cần Thơ',8,11,'Nhà xe Vũ Linh.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',44),(85,'Vé Máy Bay Đà Nẵng - Hà Nội',1400000,'Hà Nội',15,30,'Vietnam Airlines.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',45),(86,'Vé Xe Buýt Điện Sân Bay Phú Quốc',50000,'Phú Quốc',40,45,'VinBus chạy tần suất cao.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',38),(87,'Vé Tàu Thủy Cao Tốc Tuần Châu - Cát Bà',150000,'Hải Phòng',50,120,'Phà tuần châu sang Gia Luận.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',60),(88,'Vé Xe Limousine Hà Nội - Tam Đảo',180000,'Vĩnh Phúc',7,9,'Xe đi đường đồi núi an toàn.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',43),(89,'Vé Máy Bay Sài Gòn - Phú Quốc',1200000,'Phú Quốc',18,30,'Vietjet Air.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',46),(90,'Thuê Xe Máy Tự Lái Đà Nẵng',120000,'Đà Nẵng',30,50,'Xe số đời mới kèm mũ bảo hiểm.','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564168/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-1_xgko4u.jpg',36);
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
INSERT INTO `tour_services` VALUES (31,1,'2026-07-10 12:00:00'),(32,1,'2026-07-11 08:00:00'),(33,1,'2026-07-12 07:30:00'),(34,2,'2026-07-15 06:00:00'),(35,1,'2026-07-16 08:00:00'),(36,1,'2026-07-18 05:30:00'),(37,1,'2026-07-20 07:00:00'),(38,1,'2026-07-22 08:00:00'),(39,4,'2026-07-25 07:00:00'),(40,1,'2026-07-05 04:00:00'),(41,1,'2026-07-06 18:30:00'),(42,1,'2026-07-07 07:45:00'),(43,1,'2026-07-08 08:00:00'),(44,1,'2026-07-09 07:15:00'),(45,1,'2026-07-10 07:00:00'),(46,1,'2026-07-11 08:00:00'),(47,3,'2026-07-12 06:30:00'),(48,1,'2026-07-13 08:15:00'),(49,1,'2026-07-14 09:00:00'),(50,1,'2026-07-15 08:00:00'),(51,1,'2026-07-16 07:30:00'),(52,1,'2026-07-17 15:30:00'),(53,3,'2026-07-18 05:00:00'),(54,3,'2026-07-19 05:30:00'),(55,2,'2026-07-20 06:00:00'),(56,1,'2026-07-21 07:45:00'),(57,1,'2026-07-22 08:00:00'),(58,1,'2026-07-23 08:00:00'),(59,1,'2026-07-24 07:15:00'),(60,1,'2026-07-25 08:30:00');
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
INSERT INTO `transfer_transactions` VALUES (1,500000,'PAYPAL_02633050D7023511R','SUCCESS','2026-06-04 18:22:11','2026-06-04 18:22:11',37),(2,500000,'PAYPAL_1780572132211','FAILED','2026-06-04 18:22:12','2026-06-04 18:22:12',37);
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
  `departure` varchar(100) NOT NULL,
  `loaction_detail` varchar(100) NOT NULL,
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
INSERT INTO `transport_services` VALUES (61,'BUS','Sài Gòn','Bến xe Miền Đông','VIP Seat','2026-07-01 08:00:00','2026-07-01 15:00:00'),(62,'BUS','Rạch Giá','Bến tàu Rạch Giá','Economy','2026-07-02 07:30:00','2026-07-02 10:00:00'),(63,'BUS','Hà Nội','Bến xe Mỹ Đình','Cabin Đôi','2026-07-03 22:00:00','2026-07-04 05:30:00'),(64,'BUS','Hà Nội','Rạp Xiếc Trung Ương','Standard','2026-07-04 14:00:00','2026-07-04 16:30:00'),(65,'Train','Đà Nẵng','Ga Đà Nẵng','Soft Seat AC','2026-07-05 09:15:00','2026-07-05 12:30:00'),(66,'BUS','Sài Gòn','Quận 1 TPHCM','VIP','2026-07-06 07:00:00','2026-07-06 09:30:00'),(67,'Sleeper Bus','Sài Gòn','Bến xe Miền Đông mới','Standard','2026-07-07 21:00:00','2026-07-08 06:00:00'),(68,'PLANE','Vũng Tàu','Cảng Cầu Đá','VIP Seat','2026-07-08 08:00:00','2026-07-08 11:30:00'),(69,'PLANE','Hà Nội','Sân bay Nội Bài','Economy Class','2026-07-09 10:00:00','2026-07-09 12:15:00'),(70,'BUS','Sài Gòn','Bưu điện Trung tâm','Hop-on Hop-off','2026-07-10 18:00:00','2026-07-10 19:30:00'),(71,'PLANE','Sài Gòn','Sân bay Tân Sơn Nhất','Economy','2026-07-11 13:00:00','2026-07-11 14:20:00'),(72,'PLANE','Hà Nội','Sân bay Nội Bài','Business Class','2026-07-12 09:00:00','2026-07-12 11:15:00'),(73,'BUS','Sóc Trăng','Cảng Trần Đề','Standard','2026-07-13 08:30:00','2026-07-13 10:30:00'),(74,'Speedboat','Hải Phòng','Bến Bính','Economy','2026-07-14 09:00:00','2026-07-14 10:00:00'),(75,'BUS','Sài Gòn','12 Lượng Định Của','VIP 9 Ghế','2026-07-15 06:00:00','2026-07-15 08:30:00'),(76,'BUS','Hà Nội','Bến xe Mỹ Đình','Cung Điện VIP','2026-07-16 21:30:00','2026-07-17 05:00:00'),(77,'BUS','Hà Nội','Phố Cổ Hà Nội','Standard','2026-07-17 08:00:00','2026-07-17 09:30:00'),(78,'Train','Hà Nội','Ga Hà Nội','Sleeper K4','2026-07-18 19:30:00','2026-07-19 09:00:00'),(79,'Train','Sài Gòn','Ga Sài Gòn','Sleeper K4 Premium','2026-07-19 20:30:00','2026-07-20 05:30:00'),(80,'BUS','Hội An','Cảng Cửa Đại','Cano','2026-07-20 08:30:00','2026-07-20 09:00:00'),(81,'BUS','Đà Nẵng','Bến xe Trung Tâm ĐN','Standard','2026-07-21 14:00:00','2026-07-21 19:30:00'),(82,'BUS','Đà Nẵng','Văn phòng Đà Nẵng','VIP','2026-07-22 10:00:00','2026-07-22 12:00:00'),(83,'BUS','Sài Gòn','Bến xe Miền Đông','Double Cabin','2026-07-23 23:00:00','2026-07-24 06:00:00'),(84,'BUS','Sài Gòn','Bến xe Miền Tây','VIP 11 Ghế','2026-07-24 07:00:00','2026-07-24 10:30:00'),(85,'PLANE','Đà Nẵng','Sân bay Đà Nẵng','Economy','2026-07-25 16:00:00','2026-07-25 17:20:00'),(86,'BUS','Phú Quốc','Sân Bay Phú Quốc','VinBus Ticket','2026-07-26 08:00:00','2026-07-26 09:00:00'),(87,'BUS','Tuần Châu','Phà Tuần Châu','Standard ferry','2026-07-27 10:30:00','2026-07-27 11:30:00'),(88,'BUS','Hà Nội','Bến xe Mỹ Đình','VIP','2026-07-28 07:30:00','2026-07-28 09:30:00'),(89,'PLANE','Sài Gòn','Sân bay Tân Sơn Nhất','Economy Class','2026-07-29 11:00:00','2026-07-29 12:00:00'),(90,'BUS','Đà Nẵng','02 Lê Duẩn','Xe Số Tự Lái','2026-07-30 08:00:00','2026-07-30 18:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'customer1','pass123','0901234501','cust1@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(2,'customer2','pass123','0901234502','cust2@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(3,'customer3','pass123','0901234503','cust3@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(4,'customer4','pass123','0901234504','cust4@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(5,'customer5','pass123','0901234505','cust5@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(6,'customer6','pass123','0901234506','cust6@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(7,'customer7','pass123','0901234507','cust7@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(8,'customer8','pass123','0901234508','cust8@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(9,'customer9','pass123','0901234509','cust9@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(10,'customer10','pass123','0901234510','cust10@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(11,'customer11','pass123','0901234511','cust11@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(12,'customer12','pass123','0901234512','cust12@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(13,'customer13','pass123','0901234513','cust13@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(14,'customer14','pass123','0901234514','cust14@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(15,'customer15','pass123','0901234515','cust15@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(16,'customer16','pass123','0901234516','cust16@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(17,'customer17','pass123','0901234517','cust17@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(18,'customer18','pass123','0901234518','cust18@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(19,'customer19','pass123','0901234519','cust19@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(20,'customer20','pass123','0901234520','cust20@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(21,'customer21','pass123','0901234521','cust21@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(22,'customer22','pass123','0901234522','cust22@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(23,'customer23','pass123','0901234523','cust23@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(24,'customer24','pass123','0901234524','cust24@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(25,'customer25','pass123','0901234525','cust25@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(26,'customer26','pass123','0901234526','cust26@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(27,'customer26','pass123','0901234527','cust27@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(28,'customer28','pass123','0901234528','cust28@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(29,'customer29','pass123','0901234529','cust29@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(30,'customer30','pass123','0901234530','cust30@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_CUSTOMER'),(31,'provider1','pass123','0911234531','prov1@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(32,'provider2','pass123','0911234532','prov2@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(33,'provider3','pass123','0911234533','prov3@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(34,'provider4','pass123','0911234534','prov4@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(35,'provider5','pass123','0911234535','prov5@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(36,'provider6','pass123','0911234536','prov6@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(37,'provider7','pass123','0911234537','prov7@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(38,'provider8','pass123','0911234538','prov8@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(39,'provider9','pass123','0911234539','prov9@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(40,'provider10','pass123','0911234540','prov10@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(41,'provider11','pass123','0911234541','prov11@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(42,'provider12','pass123','0911234542','prov12@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(43,'provider13','pass123','0911234543','prov13@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(44,'provider14','pass123','0911234544','prov14@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(45,'provider15','pass123','0911234545','prov15@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(46,'provider16','pass123','0911234546','prov16@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(47,'provider17','pass123','0911234547','prov17@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(48,'provider18','pass123','0911234548','prov18@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(49,'provider19','pass123','0911234549','prov19@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(50,'provider20','pass123','0911234550','prov20@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(51,'provider21','pass123','0911234551','prov21@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(52,'provider22','pass123','0911234552','prov22@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(53,'provider23','pass123','0911234553','prov23@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(54,'provider24','pass123','0911234554','prov24@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(55,'provider25','pass123','0911234555','prov25@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(56,'provider26','pass123','0911234556','prov26@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(57,'provider27','pass123','0911234557','prov27@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(58,'provider28','pass123','0911234558','prov28@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(59,'provider29','pass123','0911234559','prov29@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(60,'provider30','pass123','0911234560','prov30@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_PROVIDER'),(61,'admin1','admin123','0921234561','admin1@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(62,'admin2','admin123','0921234562','admin2@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(63,'admin3','admin123','0921234563','admin3@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(64,'admin4','admin123','0921234564','admin4@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(65,'admin5','admin123','0921234565','admin5@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(66,'admin6','admin123','0921234566','admin6@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(67,'admin7','admin123','0921234567','admin7@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(68,'admin8','admin123','0921234568','admin8@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(69,'admin9','admin123','0921234569','admin9@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(70,'admin10','admin123','0921234570','admin10@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(71,'admin11','admin123','0921234571','admin11@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(72,'admin12','admin123','0921234572','admin12@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(73,'admin13','admin123','0921234573','admin13@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(74,'admin14','admin123','0921234574','admin14@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(75,'admin15','admin123','0921234575','admin15@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(76,'admin16','admin123','0921234576','admin16@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(77,'admin17','admin123','0921234577','admin17@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(78,'admin18','admin123','0921234578','admin18@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(79,'admin19','admin123','0921234579','admin19@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(80,'admin20','admin123','0921234580','admin20@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(81,'admin21','admin123','0921234581','admin21@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(82,'admin22','admin123','0921234582','admin22@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(83,'admin23','admin123','0921234583','admin23@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(84,'admin24','admin123','0921234584','admin24@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(85,'admin25','admin123','0921234585','admin25@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(86,'admin26','admin123','0921234586','admin26@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(87,'admin27','admin123','0921234587','admin27@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(88,'admin28','admin123','0921234588','admin28@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(89,'admin29','admin123','0921234589','admin29@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(90,'admin30','admin123','0921234590','admin30@email.com','2026-06-04 16:01:26','2026-06-04 16:01:26','2026-06-04 16:01:26',1,'https://res.cloudinary.com/durpn2bki/image/upload/v1780564333/Profile-Transparent_afy6nl.png','ROLE_ADMIN'),(91,'lequangan','$2a$10$7G.w88wFMwi9BDGMShrYoe5ZTuYj4F.adLTTlqh3CoU4S7v9m0vnm','0254123652','a@gmail.com','2026-06-04 16:27:57','2026-06-04 16:28:15','2026-06-04 18:34:59',1,'https://res.cloudinary.com/databreak/image/upload/v1780565414/o9lriwzcz0g6zfycqqbb.png','ROLE_CUSTOMER'),(92,'admin','$2a$10$jx8P8HnOnsZnh3B.vTf3kOrZ4fLLRudOlihCCb7pKWv7vXAH/bKA.','02145632145','admin@gmail.com','2026-06-04 16:56:06','2026-06-04 16:56:06',NULL,1,'https://res.cloudinary.com/databreak/image/upload/v1780567101/oiedcsd86tciwi95mqzc.png','ROLE_ADMIN');
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

-- Dump completed on 2026-06-04 18:50:12
