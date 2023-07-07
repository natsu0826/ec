-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (x86_64)
--
-- Host: localhost    Database: ec_db
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `itemlist`
--

DROP TABLE IF EXISTS `itemlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemname` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `itemimage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemlist`
--

LOCK TABLES `itemlist` WRITE;
/*!40000 ALTER TABLE `itemlist` DISABLE KEYS */;
INSERT INTO `itemlist` VALUES (11,'blue',5000,'/images/blue.jpg'),(12,'coral',5000,'/images/coral.jpeg'),(13,'green',5000,'/images/green.jpg'),(14,'orenge',5000,'/images/orange.jpg'),(15,'pink',3000,'/images/pink.jpg'),(16,'purple',3000,'/images/purple.jpg'),(17,'sakurapink',3000,'/images/sakurapink.jpg'),(18,'skyblue',3000,'/images/skyblue.jpg'),(19,'turquoiseblue',3000,'/images/turquoiseblue.jpg'),(20,'yellow',3000,'/images/yellow.jpg');
/*!40000 ALTER TABLE `itemlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemname` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `evaluation` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'pink','田中',3,'よかったです'),(2,'pink','安達',2,'発送が早かったです'),(3,'orange','吉沢',5,'満足'),(4,'pink','渡辺',3,'まあまあです'),(5,'yellow','渡辺',1,'ダメでした'),(6,'green','佐々木',3,'満足です'),(7,' pink','渡辺',4,'良かったと思います。'),(8,'blue','高根',1,'残念です'),(9,'blue','湯原',2,'遅かったです'),(10,'blue','小松',3,'また頼みます'),(11,NULL,'高野',5,''),(12,NULL,'高野',5,''),(13,NULL,'高野',5,''),(14,NULL,'高野',5,''),(15,NULL,'高野',5,''),(16,NULL,'高野',5,''),(17,NULL,'高野',5,''),(18,NULL,'高野',5,''),(19,NULL,'高野',5,''),(20,NULL,'',5,''),(21,NULL,'高野',5,''),(22,NULL,'高野',5,''),(23,NULL,'高野',5,''),(24,NULL,'',5,''),(25,'','v',4,''),(26,'','',5,''),(27,'','',4,''),(28,'','高野',5,''),(33,'','v',5,''),(34,'','v',5,'f'),(47,'purple',NULL,NULL,NULL),(56,'turquoiseblue','',NULL,NULL),(57,'','高野',5,''),(58,'','v',5,'d'),(59,'','cccccc',5,''),(60,'','',5,''),(61,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-07 17:21:08
