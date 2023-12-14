-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: signify
-- ------------------------------------------------------
-- Server version	8.0.31-google

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `signify`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `signify` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `signify`;

--
-- Table structure for table `completed_level`
--

DROP TABLE IF EXISTS `completed_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `completed_level` (
  `id_record` int NOT NULL AUTO_INCREMENT,
  `id_user` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `level_id` int NOT NULL,
  `completed_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_record`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `completed_level`
--

LOCK TABLES `completed_level` WRITE;
/*!40000 ALTER TABLE `completed_level` DISABLE KEYS */;
INSERT INTO `completed_level` VALUES (1,'Etf11PosiitbvfhH',1,'2023-11-27 00:31:50'),(3,'Etf11PosiitbvfhH',2,'2023-11-27 00:45:19'),(4,'Etf11PosiitbvfhH',3,'2023-11-27 00:45:29'),(6,'Etf11PosiitbvfhH',4,'2023-11-28 19:44:21'),(7,'fkFcXxPKQhgnp_TB',1,'2023-11-28 19:47:02'),(8,'Etf11PosiitbvfhH',5,'2023-11-28 21:25:59'),(10,'Etf11PosiitbvfhH',6,'2023-12-03 21:22:11'),(12,'cHApy-KzcxpodsLL',1,'2023-12-11 14:39:06'),(13,'cHApy-KzcxpodsLL',2,'2023-12-11 14:40:07');
/*!40000 ALTER TABLE `completed_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `bday` date DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('36vdpq7vZ4uKZbWt','Asandy','asandy@fake.com','$2b$08$N7Rd91mQztABAD9TynOLrOTlQvrtSZbAh2zeReAJWDdRCk69BH5UW',NULL,NULL,NULL,'2023-12-09 08:07:05','2023-12-09 08:07:05'),('cHApy-KzcxpodsLL','Muhammad Qalby','obyy@gmail.com','$2b$08$a0M4coLDTOScBo1AzTHNuekuVZs8083N7mN71Hs6P8v21jF3B1HSe',0,'2003-02-07','081345336291','2023-12-11 14:35:31','2023-12-11 14:41:25'),('Dzj9wPEF9DAQvSeJ','test10','test10@gmail.com','$2b$08$Eh7rboIvQAhuUfTol15bNuXPI8L21kK38GHcdzAAYaknLD4BqWz4O',NULL,NULL,NULL,'2023-12-12 14:55:47','2023-12-12 14:55:47'),('Etf11PosiitbvfhH','Risu','risu@gmail.com','$2b$08$g.oxBrFb2ia5tVd0.sSRM.XH5xetgc7Z9kUYO6CZXCjUfFg4xOZCu',1,'2013-12-01','081345336291','2023-11-26 17:36:00','2023-12-08 17:36:00'),('fkFcXxPKQhgnp_TB','Ollie','ollie@gmail.com','$2b$08$xt0qhfCbDLJDd7uGPTadfOVZMIaQlDKU88vZ928j8WvC5ZhIodFR6',0,'2003-02-07','081345990819','2023-11-28 19:45:55','2023-12-08 21:13:26'),('kyi8OFsJC1lA6sjq','omaga','omaga@gmail.com','$2b$08$d/W1l7fVfi1uUPJaXsRVZ.9Hxnta3/GdQiGYv2dHimNj7nvJyFsGa',NULL,NULL,NULL,'2023-12-10 17:34:07','2023-12-10 17:34:07'),('t-XU84vqhaMhWome','signify','signify@fake.com','$2b$08$nMsmCEmx/gvDA5BG.jV7BuymlOF/lvJv/BFlWsn8SpnPatonqimBS',NULL,NULL,NULL,'2023-12-09 06:36:06','2023-12-09 06:36:06'),('zdw_VH1I67_YTvAH','Zeta','zeta@gmail.com','$2b$08$MTZFL4kxT0LapxJ2u9Dmuuaus/97gvBAZaeNk0zFSp4a1GKN1GK/C',NULL,NULL,NULL,'2023-12-03 21:07:17','2023-12-03 21:07:17');
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

-- Dump completed on 2023-12-14  1:42:38
