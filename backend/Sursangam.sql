-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: sursangam
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `instrument` enum('tabla','sitar','flute','guitar','piano','violin','drums','saxophone','harmonium') COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (43,'flute','Sa','To play the (Sa) close first three holes of flute and rest will be open, then blow air in the blowing hole.'),(44,'flute','Re (Shudh)','To play the (Re) (Shudh) close first two holes of flute and rest will be open, then blow air in the blowing hole.'),(45,'flute','re (Komal)','To play the (re) (Komal) close first two holes and third half hole of flute and rest will be open, then blow air in the blowing hole.'),(46,'flute','Ga (Shudh)','To play the (Ga) (Shudh) close first one hole of flute and rest will be open, then blow air in the blowing hole.'),(47,'flute','ga (Komal)','To play the (ga) (Komal) close first one hole and second half of flute and rest will be open, then blow air in the blowing hole.'),(48,'flute','ma (Shudh)','To play the (ma) (Shudh) close first half hole of flute and rest will be open, then blow air in the blowing hole.'),(49,'flute','Ma (Tivra)','To play the (Ma) (Tivra) open all holes, then blow air in the blowing hole.'),(50,'flute','Pa','To play the (Pa) close all holes and blow air in the blowing hole.'),(51,'flute','Dha (Shudh)','To play (Dha) (Shudh) close first five holes and last hole remain open and blow air in the blowing hole.'),(52,'flute','dha (Komal)','To play (Dha) (Komal) close first five holes and last hole half closed and blow air in the blowing hole.'),(53,'flute','Ni (Shudh)','To play (Ni) (Shudh) close first four holes and last two remain open and blow air in the blowing hole.'),(54,'flute','ni (Komal)','To play (ni) (Komal) close first four holes and fifth half hole closed and blow air in the blowing hole.'),(55,'tabla','Na (Played on Dayan)','The (Na) stroke is played on the dayan (right-hand drum) and produces a clear, ringing sound. To play (Na), use the index finger and place it on the edge of the drum?s black circle (syahi), keeping the middle, ring, and pinky fingers lifted. Strike the drum?s surface with the tip of your index finger, allowing it to bounce off quickly for a crisp tone.'),(56,'tabla','Tin (Played on Dayan)','The (Tin) stroke is similar to (Na) but produces a lighter, more resonant tone. It is played by striking the syahi (black circle) with the tip of the index finger, while the other fingers remain lifted.'),(57,'tabla','Ta (Played on Dayan)','The (Ta) stroke is played by using the index or middle finger to strike the outer rim of the dayan. The stroke should be sharp, with the remaining fingers lifted, and it produces a high-pitched, crisp sound.'),(58,'tabla','Te (Played on Dayan)','The (Te) stroke is played similarly to (Ta) but involves a slightly firmer strike on the rim of the dayan. It is used in fast compositions and creates a sharper sound.'),(59,'tabla','Tete (Played on Dayan)','The (Tete) stroke consists of two quick (Te) strokes, played with alternating index and middle fingers. This stroke is commonly used in fast phrases and rolls.'),(60,'tabla','Dha (Combination of Bayan & Dayan)','The (Dha) stroke is a combination of (Ge) (on bayan) and (Na) (on dayan). To play (Dha), strike the bayan with the ring finger for (Ge) while simultaneously playing (Na) on the dayan. The two strokes should be synchronized to produce a balanced sound.'),(61,'tabla','Dhin (Combination of Bayan & Dayan)','The (Dhin) stroke is similar to (Dha), but instead of (Na) on the dayan, play (Tin) (a lighter tone). This creates a more resonant and open sound.'),(62,'tabla','Ge (Played on Bayan)','The (Ge) stroke is played on the bayan (bass drum) and produces a deep, resonant sound. To play (Ge), use your left hand if you are right-handed.'),(63,'tabla','Ka (Played on Bayan)','The (Ka) stroke is played on the bayan using the edge of the hand or the fingertips to create a quick, sharp sound. Unlike (Ge), this stroke is more muted, and the hand lifts immediately after striking.'),(64,'tabla','Ti Re Ki Ta (Played on Dayan)','The (Ti Re Ki Ta) stroke is a combination of four quick strokes played in succession. Typically, (Ti) and (Re) are played with the index and middle fingers, while (Ki) and (Ta) are played with the ring and little fingers.');
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instruments`
--

DROP TABLE IF EXISTS `instruments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instruments` (
  `id` int NOT NULL,
  `tabla` int DEFAULT '0',
  `sitar` int DEFAULT '0',
  `flute` int DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `instruments_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instruments`
--

LOCK TABLES `instruments` WRITE;
/*!40000 ALTER TABLE `instruments` DISABLE KEYS */;
INSERT INTO `instruments` VALUES (3,0,0,1),(4,1,0,3),(5,0,0,0),(6,0,0,8),(7,0,0,3);
/*!40000 ALTER TABLE `instruments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `roles` varchar(50) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test','test@t.com','$2b$10$0i4ID8bA2ZFo99/vU2dPfuqd2I03V3NODMdM5zQPytuSAmtUPhcr6','2025-03-04 07:08:01','user'),(2,'test1','test1@t.com','$2b$10$zoFSFuwZIhn7eA/FScbzmOahNBdFU3/bsvA0eZGhPIa02rLGWzIbi','2025-03-04 08:09:52','user'),(3,'test2','test2@t.com','$2b$10$6Zt4ciSj3BXwM7mrYgRJBOrXav0yiLUyD5ulsFIeveWI8doRtTKCW','2025-03-04 08:13:02','user'),(4,'test3','test3@t.com','$2b$10$AqZ3q/0fd6sGcJal8bxDHuMCDqNzICT2CzXEVl9APo8ay.kD9neAa','2025-03-04 18:56:24','user'),(5,'test5','test5@t.com','$2b$10$/V0A17OVk4yiXIhaTwdkbOmAbSOZZMnrKuHIK8XohmoVnKYGBQzQm','2025-03-05 03:40:17','user'),(6,'ganesh','ganesg@gmail.com','$2b$10$RdwWoRX5WjxsY39imNCv6.9g07IoBNCX2ZF5/yPjSgKTzQBIu7lW.','2025-03-05 18:20:36','user'),(7,'sahu','sahu@gmail.com','$2b$10$wZ0patpjmBrq9X/YZfrQP.OukYPlNPOrFdADzmL0wonH7Q/ZaOOA.','2025-03-06 04:58:16','user');
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

-- Dump completed on 2025-07-10  0:17:34
