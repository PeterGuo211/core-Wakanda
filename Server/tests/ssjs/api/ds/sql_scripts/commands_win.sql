drop database if exists `testSQLBridge_win`;
CREATE DATABASE  IF NOT EXISTS `testSQLBridge_win` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_general_cs */;
USE `testSQLBridge_win`;

-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: 192.168.222.24    Database: testSQLBridge
-- ------------------------------------------------------
-- Server version	5.5.28-0ubuntu0.12.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET foreign_key_checks = 0;
SET SESSION sql_mode='NO_AUTO_VALUE_ON_ZERO';
--
-- Table structure for table `Conference`
--

DROP TABLE IF EXISTS `Conference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Conference` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Conference`
--

LOCK TABLES `Conference` WRITE;
/*!40000 ALTER TABLE `Conference` DISABLE KEYS */;
INSERT INTO `Conference` VALUES (1,'java 7'),(2,'wakanda v2');
/*!40000 ALTER TABLE `Conference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClass9`
--

DROP TABLE IF EXISTS `MyClass9`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClass9` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cnum` double DEFAULT NULL,
  `cdate` date DEFAULT NULL,
  `cblob` blob,
  `cbyte` tinyint(4) DEFAULT NULL,
  `clong` int(11) DEFAULT NULL,
  `cword` smallint(6) DEFAULT NULL,
  `cuuid` varchar(32) COLLATE latin1_general_cs DEFAULT NULL,
  `cduration` int(11) DEFAULT NULL,
  `clink` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `clink` (`clink`),
  CONSTRAINT `MyClass9_ibfk_1` FOREIGN KEY (`clink`) REFERENCES `MyClass10` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClass9`
--

LOCK TABLES `MyClass9` WRITE;
/*!40000 ALTER TABLE `MyClass9` DISABLE KEYS */;
INSERT INTO `MyClass9` VALUES (0,'Z',1000,'2012-01-25',NULL,30,0,9,NULL,9,NULL),(1,'K',9,'2012-02-25',NULL,1,1,8,NULL,8,NULL),(2,'F',8,'2012-02-10',NULL,2,13,7,NULL,7,NULL),(3,'S',7,'2012-04-25',NULL,3,3,6,NULL,6,NULL),(4,'D',6,'2012-05-25',NULL,4,5,5,NULL,5,NULL),(5,'A',5,'2012-06-25',NULL,5,4,4,NULL,4,NULL),(6,'O',4,'2012-12-31',NULL,6,7,3,NULL,3,NULL),(7,'1',3,'2012-08-25',NULL,7,6,2,NULL,2,NULL),(8,'Z',2,'2012-09-25',NULL,8,9,1,NULL,1,NULL),(9,'&',-36,'2012-10-25',NULL,-2,8,0,NULL,0,NULL);
/*!40000 ALTER TABLE `MyClass9` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OnSaveNoValidation`
--

DROP TABLE IF EXISTS `OnSaveNoValidation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OnSaveNoValidation` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OnSaveNoValidation`
--

LOCK TABLES `OnSaveNoValidation` WRITE;
/*!40000 ALTER TABLE `OnSaveNoValidation` DISABLE KEYS */;
INSERT INTO `OnSaveNoValidation` VALUES (1,'entity #1');
/*!40000 ALTER TABLE `OnSaveNoValidation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee1`
--

DROP TABLE IF EXISTS `Employee1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employee1` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee1`
--

LOCK TABLES `Employee1` WRITE;
/*!40000 ALTER TABLE `Employee1` DISABLE KEYS */;
INSERT INTO `Employee1` VALUES (2,'entity #5'),(3,'entity #8'),(5,'entity #18'),(6,'entity #21'),(7,'entity #24');
/*!40000 ALTER TABLE `Employee1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Component`
--

DROP TABLE IF EXISTS `Component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Component` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `theComposite` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `theComposite` (`theComposite`),
  CONSTRAINT `Component_ibfk_1` FOREIGN KEY (`theComposite`) REFERENCES `TheComposite` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=601 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Component`
--

LOCK TABLES `Component` WRITE;
/*!40000 ALTER TABLE `Component` DISABLE KEYS */;
INSERT INTO `Component` VALUES (501,'51',NULL),(502,'51',NULL),(503,'51',NULL),(504,'51',NULL),(505,'51',NULL),(506,'51',NULL),(507,'51',NULL),(508,'51',NULL),(509,'51',NULL),(510,'51',NULL),(511,'52',NULL),(512,'52',NULL),(513,'52',NULL),(514,'52',NULL),(515,'52',NULL),(516,'52',NULL),(517,'52',NULL),(518,'52',NULL),(519,'52',NULL),(520,'52',NULL),(521,'53',NULL),(522,'53',NULL),(523,'53',NULL),(524,'53',NULL),(525,'53',NULL),(526,'53',NULL),(527,'53',NULL),(528,'53',NULL),(529,'53',NULL),(530,'53',NULL),(531,'54',NULL),(532,'54',NULL),(533,'54',NULL),(534,'54',NULL),(535,'54',NULL),(536,'54',NULL),(537,'54',NULL),(538,'54',NULL),(539,'54',NULL),(540,'54',NULL),(541,'55',NULL),(542,'55',NULL),(543,'55',NULL),(544,'55',NULL),(545,'55',NULL),(546,'55',NULL),(547,'55',NULL),(548,'55',NULL),(549,'55',NULL),(550,'55',NULL),(551,'56',NULL),(552,'56',51),(553,'56',52),(554,'56',53),(555,'56',54),(556,'56',55),(557,'56',56),(558,'56',57),(559,'56',58),(560,'56',59),(561,'57',60),(562,'57',NULL),(563,'57',NULL),(564,'57',NULL),(565,'57',NULL),(566,'57',NULL),(567,'57',NULL),(568,'57',NULL),(569,'57',NULL),(570,'57',NULL),(571,'58',NULL),(572,'58',NULL),(573,'58',NULL),(574,'58',NULL),(575,'58',NULL),(576,'58',NULL),(577,'58',NULL),(578,'58',NULL),(579,'58',NULL),(580,'58',NULL),(581,'59',NULL),(582,'59',NULL),(583,'59',NULL),(584,'59',NULL),(585,'59',NULL),(586,'59',NULL),(587,'59',NULL),(588,'59',NULL),(589,'59',NULL),(590,'59',NULL),(591,'60',NULL),(592,'60',NULL),(593,'60',NULL),(594,'60',NULL),(595,'60',NULL),(596,'60',NULL),(597,'60',NULL),(598,'60',NULL),(599,'60',NULL),(600,'60',NULL);
/*!40000 ALTER TABLE `Component` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee3`
--

DROP TABLE IF EXISTS `Employee3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employee3` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee3`
--

LOCK TABLES `Employee3` WRITE;
/*!40000 ALTER TABLE `Employee3` DISABLE KEYS */;
INSERT INTO `Employee3` VALUES (2,'entity #2'),(3,'entity #3'),(4,'entity #4'),(5,'entity #5'),(6,'entity #6'),(7,'entity #7');
/*!40000 ALTER TABLE `Employee3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyAutoSequenceNumberClassAt1`
--

DROP TABLE IF EXISTS `MyAutoSequenceNumberClassAt1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyAutoSequenceNumberClassAt1` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyAutoSequenceNumberClassAt1`
--

LOCK TABLES `MyAutoSequenceNumberClassAt1` WRITE;
/*!40000 ALTER TABLE `MyAutoSequenceNumberClassAt1` DISABLE KEYS */;
INSERT INTO `MyAutoSequenceNumberClassAt1` VALUES (2),(3);
/*!40000 ALTER TABLE `MyAutoSequenceNumberClassAt1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyAutoSequenceNumberClass`
--

DROP TABLE IF EXISTS `MyAutoSequenceNumberClass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyAutoSequenceNumberClass` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cnum` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyAutoSequenceNumberClass`
--

LOCK TABLES `MyAutoSequenceNumberClass` WRITE;
/*!40000 ALTER TABLE `MyAutoSequenceNumberClass` DISABLE KEYS */;
/*!40000 ALTER TABLE `MyAutoSequenceNumberClass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyOrderbyClass`
--

DROP TABLE IF EXISTS `MyOrderbyClass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyOrderbyClass` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cnum` double DEFAULT NULL,
  `cstring` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cdate` date DEFAULT NULL,
  `cduration` int(11) DEFAULT NULL,
  `cuuid` varchar(32) COLLATE latin1_general_cs DEFAULT NULL,
  `cstringAsBlob` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cblob` blob,
  `cimage` blob,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyOrderbyClass`
--

LOCK TABLES `MyOrderbyClass` WRITE;
/*!40000 ALTER TABLE `MyOrderbyClass` DISABLE KEYS */;
INSERT INTO `MyOrderbyClass` VALUES (1,7,'f','2011-06-11',2147483647,'F1FAAF46FFC2A241A47D104E2A5F998C','f',NULL,NULL),(2,-2,'z','2011-05-11',2147483647,'DECE9FF68C9F4343915B571E89FBA6D7','z',NULL,NULL),(3,5,'e','2011-09-11',2147483647,'B3C05443FA757B468D52423DC402E91A','e',NULL,NULL),(4,5,'b','2011-01-11',2147483647,'3BD10D47A2ADC545A5ABB04A8777FF51','b',NULL,NULL),(5,7,'E','2011-07-11',2147483647,'87297FC2EC8C004C96177F89140AD4AE','E',NULL,NULL),(6,1,'?©','2011-06-11',-2147483648,'3EA4EA90D62B0948B4B36DD4A0AE3380','?©',NULL,NULL),(7,NULL,'e','2011-12-11',0,'EBB08F48BE9B9B498D8E529D584EA43C','e',NULL,NULL),(8,11,'e','2011-11-11',2147483647,'4B319EF8E7087D4A8E5700C745A827F7','e',NULL,NULL);
/*!40000 ALTER TABLE `MyOrderbyClass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyRemoveForEachClass`
--

DROP TABLE IF EXISTS `MyRemoveForEachClass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyRemoveForEachClass` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyRemoveForEachClass`
--

LOCK TABLES `MyRemoveForEachClass` WRITE;
/*!40000 ALTER TABLE `MyRemoveForEachClass` DISABLE KEYS */;
INSERT INTO `MyRemoveForEachClass` VALUES (1,'1'),(2,'2'),(3,'3');
/*!40000 ALTER TABLE `MyRemoveForEachClass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OneToN`
--

DROP TABLE IF EXISTS `OneToN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OneToN` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `oneToN` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `oneToN` (`oneToN`),
  CONSTRAINT `OneToN_ibfk_1` FOREIGN KEY (`oneToN`) REFERENCES `OneToN2` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OneToN`
--

LOCK TABLES `OneToN` WRITE;
/*!40000 ALTER TABLE `OneToN` DISABLE KEYS */;
INSERT INTO `OneToN` VALUES (1,'oneToN 11',1),(2,'oneToN 12',1),(3,'oneToN 21',2),(4,'oneToN 22',2);
/*!40000 ALTER TABLE `OneToN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TheComposite`
--

DROP TABLE IF EXISTS `TheComposite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TheComposite` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TheComposite`
--

LOCK TABLES `TheComposite` WRITE;
/*!40000 ALTER TABLE `TheComposite` DISABLE KEYS */;
INSERT INTO `TheComposite` VALUES (51,'the composite 0'),(52,'the composite 1'),(53,'the composite 2'),(54,'the composite 3'),(55,'the composite 4'),(56,'the composite 5'),(57,'the composite 6'),(58,'the composite 7'),(59,'the composite 8'),(60,'the composite 9');
/*!40000 ALTER TABLE `TheComposite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employee` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `firstname` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
INSERT INTO `Employee` VALUES (1,'simo','simoo'),(2,'Jean','jean'),(3,'Karim','Farid'),(4,'Lu','Lo'),(5,'Lee','Japan'),(6,NULL,NULL),(7,NULL,NULL),(8,NULL,NULL);
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AddCollection1`
--

DROP TABLE IF EXISTS `AddCollection1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AddCollection1` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cnum` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AddCollection1`
--

LOCK TABLES `AddCollection1` WRITE;
/*!40000 ALTER TABLE `AddCollection1` DISABLE KEYS */;
INSERT INTO `AddCollection1` VALUES (1,'entity 1',10),(2,'entity 2',20);
/*!40000 ALTER TABLE `AddCollection1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attendee`
--

DROP TABLE IF EXISTS `Attendee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Attendee` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `engineer` int(11) DEFAULT NULL,
  `conference` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `engineer` (`engineer`),
  KEY `conference` (`conference`),
  CONSTRAINT `Attendee_ibfk_1` FOREIGN KEY (`engineer`) REFERENCES `Engineer` (`ID`),
  CONSTRAINT `Attendee_ibfk_2` FOREIGN KEY (`conference`) REFERENCES `Conference` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendee`
--

LOCK TABLES `Attendee` WRITE;
/*!40000 ALTER TABLE `Attendee` DISABLE KEYS */;
INSERT INTO `Attendee` VALUES (1,1,1),(2,2,1),(3,1,2),(4,2,2),(5,3,2);
/*!40000 ALTER TABLE `Attendee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyFromArrayClass`
--

DROP TABLE IF EXISTS `MyFromArrayClass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyFromArrayClass` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cnum` double DEFAULT NULL,
  `cdate` date DEFAULT NULL,
  `cblob` blob,
  `cbyte` tinyint(4) DEFAULT NULL,
  `clong` int(11) DEFAULT NULL,
  `cword` smallint(6) DEFAULT NULL,
  `cuuid` varchar(32) COLLATE latin1_general_cs DEFAULT NULL,
  `cduration` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyFromArrayClass`
--

LOCK TABLES `MyFromArrayClass` WRITE;
/*!40000 ALTER TABLE `MyFromArrayClass` DISABLE KEYS */;
/*!40000 ALTER TABLE `MyFromArrayClass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClass_QueryTests`
--

DROP TABLE IF EXISTS `MyClass_QueryTests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClass_QueryTests` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cnum` double DEFAULT NULL,
  `cbyte` tinyint(4) DEFAULT NULL,
  `clong` int(11) DEFAULT NULL,
  `cduration` int(11) DEFAULT NULL,
  `cbool` tinyint(1) DEFAULT NULL,
  `cdate` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClass_QueryTests`
--

LOCK TABLES `MyClass_QueryTests` WRITE;
/*!40000 ALTER TABLE `MyClass_QueryTests` DISABLE KEYS */;
INSERT INTO `MyClass_QueryTests` VALUES (1,NULL,-32768,0,17,NULL,1,'1986-07-31'),(2,'Zza',NULL,-1,-300045782,20,NULL,'2012-04-26'),(3,'toto',12,NULL,0,7,0,'2010-01-01'),(4,'ab bc',11,7,NULL,19,1,'2012-02-29'),(5,'ba',32768,1,5,0,NULL,NULL),(6,'k',0,2,2147483647,2,1,'1732-02-27'),(7,NULL,7,3,200,20,1,'2011-11-07'),(8,'s\'a\'m',NULL,33,2,10,0,NULL),(9,'k',100,2,-5000,NULL,0,'2005-05-05'),(10,'toto',314,0,NULL,NULL,1,NULL),(11,'toto',123,0,524,2,1,'2005-06-12'),(12,'k',100,11,20,NULL,0,'2005-05-05');
/*!40000 ALTER TABLE `MyClass_QueryTests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parent`
--

DROP TABLE IF EXISTS `Parent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Parent` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parent`
--

LOCK TABLES `Parent` WRITE;
/*!40000 ALTER TABLE `Parent` DISABLE KEYS */;
/*!40000 ALTER TABLE `Parent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyNewAutoSequenceNumberClass`
--

DROP TABLE IF EXISTS `MyNewAutoSequenceNumberClass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyNewAutoSequenceNumberClass` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyNewAutoSequenceNumberClass`
--

LOCK TABLES `MyNewAutoSequenceNumberClass` WRITE;
/*!40000 ALTER TABLE `MyNewAutoSequenceNumberClass` DISABLE KEYS */;
/*!40000 ALTER TABLE `MyNewAutoSequenceNumberClass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Personn`
--

DROP TABLE IF EXISTS `Personn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Personn` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `personn` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Personn`
--

LOCK TABLES `Personn` WRITE;
/*!40000 ALTER TABLE `Personn` DISABLE KEYS */;
INSERT INTO `Personn` VALUES (1,'blabla'),(2,'toto'),(3,'miaou');
/*!40000 ALTER TABLE `Personn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClassForImageTest`
--

DROP TABLE IF EXISTS `MyClassForImageTest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClassForImageTest` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cimage` blob,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClassForImageTest`
--

LOCK TABLES `MyClassForImageTest` WRITE;
/*!40000 ALTER TABLE `MyClassForImageTest` DISABLE KEYS */;
/*!40000 ALTER TABLE `MyClassForImageTest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `JavascriptFunctions`
--

DROP TABLE IF EXISTS `JavascriptFunctions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `JavascriptFunctions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `firstname` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JavascriptFunctions`
--

LOCK TABLES `JavascriptFunctions` WRITE;
/*!40000 ALTER TABLE `JavascriptFunctions` DISABLE KEYS */;
INSERT INTO `JavascriptFunctions` VALUES (1,'abc','abc'),(2,'abcd','ab'),(3,'abcd','abcd'),(4,'abcd','abcdef'),(5,'abcdef','abcdef'),(6,'abcdefgh','abcdef'),(7,'abcdefgh','abcdefghi');
/*!40000 ALTER TABLE `JavascriptFunctions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClass_IndexedAttributes`
--

DROP TABLE IF EXISTS `MyClass_IndexedAttributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClass_IndexedAttributes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cnum_Btree` double DEFAULT NULL,
  `cnum_Cluster` double DEFAULT NULL,
  `cnum_Keywords` double DEFAULT NULL,
  `cnum_Automatic` double DEFAULT NULL,
  `cstring_Btree` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cstring_Cluster` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cstring_Keywords` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cstring_Automatic` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `clong_Btree` int(11) DEFAULT NULL,
  `clong_Cluster` int(11) DEFAULT NULL,
  `clong_Keywords` int(11) DEFAULT NULL,
  `clong_Automatic` int(11) DEFAULT NULL,
  `cduration_Btree` int(11) DEFAULT NULL,
  `cduration_Cluster` int(11) DEFAULT NULL,
  `cduration_Keywords` int(11) DEFAULT NULL,
  `cduration_Automatic` int(11) DEFAULT NULL,
  `cword_Btree` smallint(6) DEFAULT NULL,
  `cword_Cluster` smallint(6) DEFAULT NULL,
  `cword_Keywords` smallint(6) DEFAULT NULL,
  `cword_Automatic` smallint(6) DEFAULT NULL,
  `cdate_Btree` date DEFAULT NULL,
  `cdate_Cluster` date DEFAULT NULL,
  `cdate_Keywords` date DEFAULT NULL,
  `cdate_Automatic` date DEFAULT NULL,
  `cbyte_Btree` tinyint(4) DEFAULT NULL,
  `cbyte_Automatic` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClass_IndexedAttributes`
--

LOCK TABLES `MyClass_IndexedAttributes` WRITE;
/*!40000 ALTER TABLE `MyClass_IndexedAttributes` DISABLE KEYS */;
INSERT INTO `MyClass_IndexedAttributes` VALUES (1,3,9,5,9,'a','zbk','fr','en',0,300,4,97,3,5,9,9,3,9,5,9,'2011-06-11','2011-06-11','2011-06-11','2011-06-11',3,3),(2,0,3,4,6,'t','b','fm','S',-100,1,-11,33,0,4,3,6,0,3,4,6,'2011-05-11','2011-05-11','2011-05-11','2011-05-11',0,0),(3,4,2,7,1,'gh','zk','c','d',36,37,2,99999,4,7,2,1,4,2,7,1,'2011-09-11','2011-09-11','2011-09-11','2011-09-11',4,4),(4,5,0,0,8,'?©','O','s','Jean',13,-3,0,3,5,0,0,8,5,0,0,8,'2011-01-11','2011-01-11','2011-01-11','2011-01-11',5,5),(5,9,1,8,2,'mb','de','ck','fbi',444,13,4,12005,9,8,1,2,9,1,8,2,'2011-07-11','2011-07-11','2011-07-11','2011-07-11',9,9),(6,8,7,1,7,'Trs','Jamal','Ali','e',55000,5,1374,1986,8,1,7,7,8,7,1,7,'2011-06-11','2011-06-11','2011-06-11','2011-06-11',8,8),(7,7,6,3,3,'zk','jamal','b','oups',6,31,7,16,7,3,6,3,7,6,3,3,'2011-12-11','2011-12-11','2011-12-11','2011-12-11',7,7),(8,1,4,9,0,'haha','fb','gmail','no',7,26,4,36,1,9,4,0,1,4,9,0,'2011-11-11','2011-11-11','2011-11-11','2011-11-11',1,1),(9,6,5,2,4,'yes','kl','kr','tb',45,8,90,3041,6,2,5,4,6,5,2,4,'2012-12-07','2012-12-07','2012-12-07','2012-12-07',6,6),(10,2,8,6,5,'tir','aaa','meme','heho',212,21,9,10,2,6,8,5,2,8,6,5,'2012-04-06','2012-04-06','2012-04-06','2012-04-06',2,2);
/*!40000 ALTER TABLE `MyClass_IndexedAttributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyEmptyClass`
--

DROP TABLE IF EXISTS `MyEmptyClass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyEmptyClass` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cnum` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyEmptyClass`
--

LOCK TABLES `MyEmptyClass` WRITE;
/*!40000 ALTER TABLE `MyEmptyClass` DISABLE KEYS */;
/*!40000 ALTER TABLE `MyEmptyClass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClass10`
--

DROP TABLE IF EXISTS `MyClass10`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClass10` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClass10`
--

LOCK TABLES `MyClass10` WRITE;
/*!40000 ALTER TABLE `MyClass10` DISABLE KEYS */;
INSERT INTO `MyClass10` VALUES (0,'myClass10 0'),(1,'myClass10 0'),(2,'myClass10 0'),(3,'myClass10 0'),(4,'myClass10 0'),(5,'myClass10 0'),(6,'myClass10 0'),(7,'myClass10 0'),(8,'myClass10 0'),(9,'myClass10 0');
/*!40000 ALTER TABLE `MyClass10` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClassForImageTest2`
--

DROP TABLE IF EXISTS `MyClassForImageTest2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClassForImageTest2` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cimage` blob,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClassForImageTest2`
--

LOCK TABLES `MyClassForImageTest2` WRITE;
/*!40000 ALTER TABLE `MyClassForImageTest2` DISABLE KEYS */;
/*!40000 ALTER TABLE `MyClassForImageTest2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee2`
--

DROP TABLE IF EXISTS `Employee2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employee2` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee2`
--

LOCK TABLES `Employee2` WRITE;
/*!40000 ALTER TABLE `Employee2` DISABLE KEYS */;
INSERT INTO `Employee2` VALUES (1,'entity #1'),(2,'entity #2'),(3,'entity #3');
/*!40000 ALTER TABLE `Employee2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyNullClass`
--

DROP TABLE IF EXISTS `MyNullClass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyNullClass` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cnum` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyNullClass`
--

LOCK TABLES `MyNullClass` WRITE;
/*!40000 ALTER TABLE `MyNullClass` DISABLE KEYS */;
INSERT INTO `MyNullClass` VALUES (2,NULL),(3,NULL);
/*!40000 ALTER TABLE `MyNullClass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AddCollection2`
--

DROP TABLE IF EXISTS `AddCollection2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AddCollection2` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cnum` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AddCollection2`
--

LOCK TABLES `AddCollection2` WRITE;
/*!40000 ALTER TABLE `AddCollection2` DISABLE KEYS */;
INSERT INTO `AddCollection2` VALUES (1,'entity 1',10),(2,'entity 2',20);
/*!40000 ALTER TABLE `AddCollection2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OneToN2`
--

DROP TABLE IF EXISTS `OneToN2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OneToN2` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OneToN2`
--

LOCK TABLES `OneToN2` WRITE;
/*!40000 ALTER TABLE `OneToN2` DISABLE KEYS */;
INSERT INTO `OneToN2` VALUES (1,'oneToN2 11'),(2,'oneToN2 21');
/*!40000 ALTER TABLE `OneToN2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClassWithoutAttributs`
--

DROP TABLE IF EXISTS `MyClassWithoutAttributs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClassWithoutAttributs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClassWithoutAttributs`
--

LOCK TABLES `MyClassWithoutAttributs` WRITE;
/*!40000 ALTER TABLE `MyClassWithoutAttributs` DISABLE KEYS */;
/*!40000 ALTER TABLE `MyClassWithoutAttributs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flags`
--

DROP TABLE IF EXISTS `Flags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Flags` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `event` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flags`
--

LOCK TABLES `Flags` WRITE;
/*!40000 ALTER TABLE `Flags` DISABLE KEYS */;
INSERT INTO `Flags` VALUES (1,'onLoad_Attribute_Only'),(2,'onSet_Attribute_Only'),(3,'onLoad_DataClass_Only'),(4,'onLoad_Attribute_Only'),(5,'onSet_Attribute_Only'),(6,'onLoad_DataClass_Only'),(7,'onLoad_Attribute_Only'),(8,'onSet_Attribute_Only'),(9,'onLoad_DataClass_Only'),(10,'onLoad_Attribute_Only'),(11,'onSet_Attribute_Only'),(12,'onLoad_DataClass_Only'),(13,'onLoad_Attribute_Only'),(14,'onSet_Attribute_Only'),(15,'onLoad_DataClass_Only'),(16,'onLoad_Attribute_Only'),(17,'onLoad_Attribute_Only'),(18,'onLoad_Attribute_Only'),(19,'onLoad_DataClass_Attribute'),(20,'onLoad_Attribute_DataClass'),(21,'onLoad_DataClass_Attribute'),(22,'onLoad_Attribute_DataClass'),(23,'onLoad_DataClass_Attribute'),(24,'onLoad_Attribute_DataClass'),(25,'onLoad_DataClass_Attribute'),(26,'onLoad_Attribute_DataClass'),(27,'onLoad_DataClass_Attribute'),(28,'onLoad_Attribute_DataClass'),(29,'onLoad_DataClass_Attribute'),(30,'onLoad_Attribute_DataClass'),(31,'onLoad_Attribute_Only'),(32,'onSet_Attribute_Only'),(33,'onLoad_DataClass_Only'),(34,'onLoad_Attribute_Only'),(35,'onSet_Attribute_Only'),(36,'onLoad_DataClass_Only'),(37,'onLoad_Attribute_Only'),(38,'onSet_Attribute_Only'),(39,'onLoad_DataClass_Only'),(40,'onLoad_Attribute_Only'),(41,'onSet_Attribute_Only'),(42,'onLoad_DataClass_Only'),(43,'onLoad_Attribute_Only'),(44,'onSet_Attribute_Only'),(45,'onLoad_DataClass_Only'),(46,'onLoad_Attribute_Only'),(47,'onLoad_Attribute_Only'),(48,'onLoad_Attribute_Only'),(49,'onLoad_DataClass_Attribute'),(50,'onLoad_Attribute_DataClass'),(51,'onLoad_DataClass_Attribute'),(52,'onLoad_Attribute_DataClass'),(53,'onLoad_DataClass_Attribute'),(54,'onLoad_Attribute_DataClass'),(55,'onLoad_DataClass_Attribute'),(56,'onLoad_Attribute_DataClass'),(57,'onLoad_DataClass_Attribute'),(58,'onLoad_Attribute_DataClass'),(59,'onLoad_DataClass_Attribute'),(60,'onLoad_Attribute_DataClass'),(61,'onLoad_Attribute_Only'),(62,'onSet_Attribute_Only'),(63,'onLoad_DataClass_Only'),(64,'onLoad_Attribute_Only'),(65,'onSet_Attribute_Only'),(66,'onLoad_DataClass_Only'),(67,'onLoad_Attribute_Only'),(68,'onSet_Attribute_Only'),(69,'onLoad_DataClass_Only'),(70,'onLoad_Attribute_Only'),(71,'onSet_Attribute_Only'),(72,'onLoad_DataClass_Only'),(73,'onLoad_Attribute_Only'),(74,'onSet_Attribute_Only'),(75,'onLoad_DataClass_Only'),(76,'onLoad_Attribute_Only'),(77,'onLoad_Attribute_Only'),(78,'onLoad_Attribute_Only'),(79,'onLoad_DataClass_Attribute'),(80,'onLoad_Attribute_DataClass'),(81,'onLoad_DataClass_Attribute'),(82,'onLoad_Attribute_DataClass'),(83,'onLoad_DataClass_Attribute'),(84,'onLoad_Attribute_DataClass'),(85,'onLoad_DataClass_Attribute'),(86,'onLoad_Attribute_DataClass'),(87,'onLoad_DataClass_Attribute'),(88,'onLoad_Attribute_DataClass'),(89,'onLoad_DataClass_Attribute'),(90,'onLoad_Attribute_DataClass'),(91,'onLoad_Attribute_Only'),(92,'onSet_Attribute_Only'),(93,'onLoad_DataClass_Only'),(94,'onLoad_Attribute_Only'),(95,'onSet_Attribute_Only'),(96,'onLoad_DataClass_Only'),(97,'onLoad_Attribute_Only'),(98,'onSet_Attribute_Only'),(99,'onLoad_DataClass_Only'),(100,'onLoad_Attribute_Only'),(101,'onSet_Attribute_Only'),(102,'onLoad_DataClass_Only'),(103,'onLoad_Attribute_Only'),(104,'onSet_Attribute_Only'),(105,'onLoad_DataClass_Only');
/*!40000 ALTER TABLE `Flags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ToBeRemoved`
--

DROP TABLE IF EXISTS `ToBeRemoved`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ToBeRemoved` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `age` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ToBeRemoved`
--

LOCK TABLES `ToBeRemoved` WRITE;
/*!40000 ALTER TABLE `ToBeRemoved` DISABLE KEYS */;
INSERT INTO `ToBeRemoved` VALUES (111,'to be removed 0',24),(112,'to be removed 1',30),(113,'to be removed 2',41),(114,'to be removed 3',26),(115,'to be removed 4',37),(116,'to be removed 5',26),(117,'to be removed 6',31),(118,'to be removed 7',10),(119,'to be removed 8',22),(120,'to be removed 9',30);
/*!40000 ALTER TABLE `ToBeRemoved` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyForEachClass`
--

DROP TABLE IF EXISTS `MyForEachClass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyForEachClass` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyForEachClass`
--

LOCK TABLES `MyForEachClass` WRITE;
/*!40000 ALTER TABLE `MyForEachClass` DISABLE KEYS */;
INSERT INTO `MyForEachClass` VALUES (1,'second value'),(2,'2'),(3,'3');
/*!40000 ALTER TABLE `MyForEachClass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClass2`
--

DROP TABLE IF EXISTS `MyClass2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClass2` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `distinct` double DEFAULT NULL,
  `cnum` double DEFAULT NULL,
  `asc` double DEFAULT NULL,
  `desc` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClass2`
--

LOCK TABLES `MyClass2` WRITE;
/*!40000 ALTER TABLE `MyClass2` DISABLE KEYS */;
INSERT INTO `MyClass2` VALUES (1,1,2147483647,1,1),(2,2,2147483645,2,2);
/*!40000 ALTER TABLE `MyClass2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClass3`
--

DROP TABLE IF EXISTS `MyClass3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClass3` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cnum` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClass3`
--

LOCK TABLES `MyClass3` WRITE;
/*!40000 ALTER TABLE `MyClass3` DISABLE KEYS */;
/*!40000 ALTER TABLE `MyClass3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClass1`
--

DROP TABLE IF EXISTS `MyClass1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClass1` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cnum` double DEFAULT NULL,
  `cdate` date DEFAULT NULL,
  `cblob` blob,
  `cbyte` tinyint(4) DEFAULT NULL,
  `clong` int(11) DEFAULT NULL,
  `cword` smallint(6) DEFAULT NULL,
  `cuuid` varchar(32) COLLATE latin1_general_cs DEFAULT NULL,
  `cduration` int(11) DEFAULT NULL,
  `cimage` blob,
  `clink` int(11) DEFAULT NULL,
  `cbool` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `clink` (`clink`),
  CONSTRAINT `MyClass1_ibfk_1` FOREIGN KEY (`clink`) REFERENCES `MyClass3` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClass1`
--

LOCK TABLES `MyClass1` WRITE;
/*!40000 ALTER TABLE `MyClass1` DISABLE KEYS */;
INSERT INTO `MyClass1` VALUES (1,'a',1,'2011-05-03',NULL,1,1,1,NULL,4,NULL,NULL,1),(2,'b',2,'2011-05-01',NULL,2,2,2,NULL,4,NULL,NULL,1),(3,'C',3,'2012-03-06',x'000000000000000000000000000000',3,3,3,NULL,6,NULL,NULL,0),(4,'D',4,'2011-05-09',x'5858585858585858585858585858585858585858',4,4,4,NULL,0,NULL,NULL,1),(5,'e',5,'1899-11-30',NULL,5,5,5,NULL,0,NULL,NULL,0),(6,'F',8,'2011-05-22',NULL,NULL,6,NULL,NULL,0,NULL,NULL,1),(7,'g',3,'2011-05-23',NULL,NULL,7,NULL,NULL,0,NULL,NULL,1),(8,'h',-2,'2011-05-27',NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,1),(9,'nine',97,'2012-06-06',NULL,98,999999,998,NULL,9,NULL,NULL,0),(10,'g',3,'2011-05-08',x'2424242424242424242424242424242424',NULL,9,NULL,NULL,NULL,NULL,NULL,1),(11,'hg',8,'2011-05-22',NULL,NULL,10,NULL,NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `MyClass1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClass7`
--

DROP TABLE IF EXISTS `MyClass7`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClass7` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cnum` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClass7`
--

LOCK TABLES `MyClass7` WRITE;
/*!40000 ALTER TABLE `MyClass7` DISABLE KEYS */;
INSERT INTO `MyClass7` VALUES (97,'MyClass7 1',1),(98,'MyClass7 2',2),(99,'MyClass7 3',3),(100,'MyClass7 4',4),(101,'MyClass7 5',5),(102,'MyClass7 6',6),(103,'MyClass7 7',7),(104,'MyClass7 8',8),(105,'MyClass7 9',9),(106,'MyClass7 10',10),(107,'MyClass7 11',11),(108,'MyClass7 12',12),(109,'MyClass7 13',13),(110,'MyClass7 14',14),(111,'MyClass7 15',15),(112,'MyClass7 16',16),(113,'MyClass7 17',17),(114,'MyClass7 18',18),(115,'MyClass7 19',19),(116,'MyClass7 20',20),(117,'MyClass7 21',21),(118,'MyClass7 22',22),(119,'MyClass7 23',23),(120,'MyClass7 24',24),(121,'MyClass7 25',25),(122,'MyClass7 26',26),(123,'MyClass7 27',27),(124,'MyClass7 28',28),(125,'MyClass7 29',29),(126,'MyClass7 30',30),(127,'MyClass7 31',31),(128,'MyClass7 32',32),(129,'MyClass7 33',33),(130,'MyClass7 34',34),(131,'MyClass7 35',35),(132,'MyClass7 36',36),(133,'MyClass7 37',37),(134,'MyClass7 38',38),(135,'MyClass7 39',39),(136,'MyClass7 40',40),(137,'MyClass7 41',41),(138,'MyClass7 42',42),(139,'MyClass7 43',43),(140,'MyClass7 44',44),(141,'MyClass7 45',45),(142,'MyClass7 46',46),(143,'MyClass7 47',47),(144,'MyClass7 48',48),(145,'MyClass7 49',49),(147,'MyClass7 0',0);
/*!40000 ALTER TABLE `MyClass7` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClassSave`
--

DROP TABLE IF EXISTS `MyClassSave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClassSave` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cnum` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=323 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClassSave`
--

LOCK TABLES `MyClassSave` WRITE;
/*!40000 ALTER TABLE `MyClassSave` DISABLE KEYS */;
INSERT INTO `MyClassSave` VALUES (1,NULL),(2,17),(3,NULL),(4,17),(5,NULL),(6,17),(7,NULL),(8,17),(9,NULL),(10,17),(11,NULL),(12,17),(13,NULL),(14,17),(15,NULL),(16,17),(17,NULL),(18,17),(19,NULL),(20,17),(21,NULL),(22,17),(23,NULL),(24,17),(25,NULL),(26,17),(27,NULL),(28,17),(29,NULL),(30,17),(31,NULL),(32,17),(33,NULL),(34,17),(35,NULL),(36,17),(37,NULL),(38,17),(39,NULL),(40,17),(41,NULL),(42,17),(43,NULL),(44,17),(45,NULL),(46,17),(47,NULL),(48,17),(49,NULL),(50,17),(51,NULL),(52,17),(53,NULL),(54,17),(55,NULL),(56,17),(57,NULL),(58,17),(59,NULL),(60,17),(61,NULL),(62,17),(63,NULL),(64,17),(65,NULL),(66,17),(67,NULL),(68,17),(69,NULL),(70,17),(71,NULL),(72,17),(73,NULL),(74,17),(75,NULL),(76,17),(77,NULL),(78,17),(79,NULL),(80,17),(81,NULL),(82,17),(83,NULL),(84,17),(85,NULL),(86,17),(87,NULL),(88,17),(89,NULL),(90,17),(91,NULL),(92,17),(93,NULL),(94,17),(95,NULL),(96,17),(97,NULL),(98,17),(99,NULL),(100,17),(101,NULL),(102,17),(103,NULL),(104,17),(105,NULL),(106,17),(107,NULL),(108,17),(109,NULL),(110,17),(111,NULL),(112,17),(113,NULL),(114,17),(115,NULL),(116,17),(117,NULL),(118,17),(119,NULL),(120,17),(121,NULL),(122,17),(123,NULL),(124,17),(125,NULL),(126,17),(127,NULL),(128,17),(129,NULL),(130,17),(131,NULL),(132,17),(133,NULL),(134,17),(135,NULL),(136,17),(137,NULL),(138,17),(139,NULL),(140,17),(141,NULL),(142,17),(143,NULL),(144,17),(145,NULL),(146,17),(147,NULL),(148,17),(149,NULL),(150,17),(151,NULL),(152,17),(153,NULL),(154,17),(155,NULL),(156,17),(157,NULL),(158,17),(159,NULL),(160,17),(161,NULL),(162,17),(163,NULL),(164,17),(165,NULL),(166,17),(167,NULL),(168,17),(169,NULL),(170,17),(171,NULL),(172,17),(173,NULL),(174,17),(175,NULL),(176,17),(177,NULL),(178,17),(179,NULL),(180,17),(181,NULL),(182,17),(183,NULL),(184,17),(185,NULL),(186,17),(187,NULL),(188,17),(189,NULL),(190,17),(191,NULL),(192,17),(193,NULL),(194,17),(195,NULL),(196,17),(197,NULL),(198,17),(199,NULL),(200,17),(201,NULL),(202,17),(203,NULL),(204,17),(205,NULL),(206,17),(207,NULL),(208,17),(209,NULL),(210,17),(211,NULL),(212,17),(213,NULL),(214,17),(215,NULL),(216,17),(217,NULL),(218,17),(219,NULL),(220,17),(221,NULL),(222,17),(223,NULL),(224,17),(225,NULL),(226,17),(227,NULL),(228,17),(229,NULL),(230,17),(231,NULL),(232,17),(233,NULL),(234,17),(235,NULL),(236,17),(237,NULL),(238,17),(239,NULL),(240,17),(241,NULL),(242,17),(243,NULL),(244,17),(245,NULL),(246,17),(247,NULL),(248,17),(249,NULL),(250,17),(251,NULL),(252,17),(253,NULL),(254,17),(255,NULL),(256,17),(257,NULL),(258,17),(259,NULL),(260,17),(261,NULL),(262,17),(263,NULL),(264,17),(265,NULL),(266,17),(267,NULL),(268,17),(269,NULL),(270,17),(271,NULL),(272,17),(273,NULL),(274,17),(275,NULL),(276,17),(277,NULL),(278,17),(279,NULL),(280,17),(281,NULL),(282,17),(283,NULL),(284,17),(285,NULL),(286,17),(287,NULL),(288,17),(289,NULL),(290,17),(291,NULL),(292,17),(293,NULL),(294,17),(295,NULL),(296,17),(297,NULL),(298,17),(299,NULL),(300,17),(301,NULL),(302,17),(303,NULL),(304,17),(305,NULL),(306,17),(307,NULL),(308,17),(309,NULL),(310,17),(311,NULL),(312,17),(313,NULL),(314,17),(315,NULL),(316,17),(317,NULL),(318,17),(319,NULL),(320,17),(321,NULL),(322,17);
/*!40000 ALTER TABLE `MyClassSave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `People`
--

DROP TABLE IF EXISTS `People`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `People` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `father` int(11) DEFAULT NULL,
  `mother` int(11) DEFAULT NULL,
  `sexe` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `father` (`father`),
  KEY `mother` (`mother`),
  CONSTRAINT `People_ibfk_1` FOREIGN KEY (`father`) REFERENCES `People` (`ID`),
  CONSTRAINT `People_ibfk_2` FOREIGN KEY (`mother`) REFERENCES `People` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `People`
--

LOCK TABLES `People` WRITE;
/*!40000 ALTER TABLE `People` DISABLE KEYS */;
INSERT INTO `People` VALUES (0,'A',NULL,NULL,'M'),(1,'Z',NULL,NULL,'F'),(2,'C',0,1,'M'),(3,'D',0,1,'F'),(4,'S',0,1,'M'),(5,'F',0,1,'F'),(6,'G',2,3,'M'),(7,'H',4,5,'F'),(8,'J',6,7,'M');
/*!40000 ALTER TABLE `People` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClass8`
--

DROP TABLE IF EXISTS `MyClass8`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClass8` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `age` double DEFAULT NULL,
  `salary` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClass8`
--

LOCK TABLES `MyClass8` WRITE;
/*!40000 ALTER TABLE `MyClass8` DISABLE KEYS */;
/*!40000 ALTER TABLE `MyClass8` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RefuseEvent`
--

DROP TABLE IF EXISTS `RefuseEvent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RefuseEvent` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cbool` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RefuseEvent`
--

LOCK TABLES `RefuseEvent` WRITE;
/*!40000 ALTER TABLE `RefuseEvent` DISABLE KEYS */;
/*!40000 ALTER TABLE `RefuseEvent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Related`
--

DROP TABLE IF EXISTS `Related`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Related` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Related`
--

LOCK TABLES `Related` WRITE;
/*!40000 ALTER TABLE `Related` DISABLE KEYS */;
/*!40000 ALTER TABLE `Related` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IndexedDate`
--

DROP TABLE IF EXISTS `IndexedDate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `IndexedDate` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cdate_Btree` date DEFAULT NULL,
  `cdate_Cluster` date DEFAULT NULL,
  `cdate_Keywords` date DEFAULT NULL,
  `cdate_Automatic` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IndexedDate`
--

LOCK TABLES `IndexedDate` WRITE;
/*!40000 ALTER TABLE `IndexedDate` DISABLE KEYS */;
/*!40000 ALTER TABLE `IndexedDate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ToBeDroped`
--

DROP TABLE IF EXISTS `ToBeDroped`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ToBeDroped` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ToBeDroped`
--

LOCK TABLES `ToBeDroped` WRITE;
/*!40000 ALTER TABLE `ToBeDroped` DISABLE KEYS */;
INSERT INTO `ToBeDroped` VALUES (1,'To be droped 0'),(2,'To be droped 1'),(3,'To be droped 2'),(4,'To be droped 3'),(5,'To be droped 4'),(6,'To be droped 5'),(7,'To be droped 6');
/*!40000 ALTER TABLE `ToBeDroped` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MyClass4`
--

DROP TABLE IF EXISTS `MyClass4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MyClass4` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  `cbool` tinyint(1) DEFAULT NULL,
  `toBeRemoved` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `toBeRemoved` (`toBeRemoved`),
  CONSTRAINT `MyClass4_ibfk_1` FOREIGN KEY (`toBeRemoved`) REFERENCES `ToBeRemoved` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10201 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MyClass4`
--

LOCK TABLES `MyClass4` WRITE;
/*!40000 ALTER TABLE `MyClass4` DISABLE KEYS */;
INSERT INTO `MyClass4` VALUES (10101,'111',0,NULL),(10102,'111',0,NULL),(10103,'111',0,NULL),(10104,'111',0,NULL),(10105,'111',0,NULL),(10106,'111',0,NULL),(10107,'111',0,NULL),(10108,'111',0,NULL),(10109,'111',0,NULL),(10110,'111',0,NULL),(10111,'112',0,NULL),(10112,'112',0,NULL),(10113,'112',0,NULL),(10114,'112',0,NULL),(10115,'112',0,NULL),(10116,'112',0,NULL),(10117,'112',0,NULL),(10118,'112',0,NULL),(10119,'112',0,NULL),(10120,'112',0,NULL),(10121,'113',0,NULL),(10122,'113',0,NULL),(10123,'113',0,NULL),(10124,'113',0,NULL),(10125,'113',0,NULL),(10126,'113',0,NULL),(10127,'113',0,NULL),(10128,'113',0,NULL),(10129,'113',0,NULL),(10130,'113',0,NULL),(10131,'114',0,NULL),(10132,'114',0,NULL),(10133,'114',0,NULL),(10134,'114',0,NULL),(10135,'114',0,NULL),(10136,'114',0,NULL),(10137,'114',0,NULL),(10138,'114',0,NULL),(10139,'114',0,NULL),(10140,'114',0,NULL),(10141,'115',0,NULL),(10142,'115',0,NULL),(10143,'115',0,NULL),(10144,'115',0,NULL),(10145,'115',0,NULL),(10146,'115',0,NULL),(10147,'115',0,NULL),(10148,'115',0,NULL),(10149,'115',0,NULL),(10150,'115',0,NULL),(10151,'116',0,NULL),(10152,'116',0,NULL),(10153,'116',0,NULL),(10154,'116',0,NULL),(10155,'116',0,NULL),(10156,'116',0,NULL),(10157,'116',0,NULL),(10158,'116',0,NULL),(10159,'116',0,NULL),(10160,'116',0,NULL),(10161,'117',0,NULL),(10162,'117',0,NULL),(10163,'117',0,NULL),(10164,'117',0,NULL),(10165,'117',0,NULL),(10166,'117',0,NULL),(10167,'117',0,NULL),(10168,'117',0,NULL),(10169,'117',0,NULL),(10170,'117',0,NULL),(10171,'118',0,NULL),(10172,'118',0,NULL),(10173,'118',0,NULL),(10174,'118',0,NULL),(10175,'118',0,NULL),(10176,'118',0,NULL),(10177,'118',0,NULL),(10178,'118',0,NULL),(10179,'118',0,NULL),(10180,'118',0,NULL),(10181,'119',0,NULL),(10182,'119',0,NULL),(10183,'119',0,NULL),(10184,'119',0,NULL),(10185,'119',0,NULL),(10186,'119',0,NULL),(10187,'119',0,NULL),(10188,'119',0,NULL),(10189,'119',0,NULL),(10190,'119',0,NULL),(10191,'120',0,NULL),(10192,'120',0,NULL),(10193,'120',0,NULL),(10194,'120',0,NULL),(10195,'120',0,NULL),(10196,'120',0,NULL),(10197,'120',0,NULL),(10198,'120',0,NULL),(10199,'120',0,NULL),(10200,'120',0,NULL);
/*!40000 ALTER TABLE `MyClass4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Engineer`
--

DROP TABLE IF EXISTS `Engineer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Engineer` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Engineer`
--

LOCK TABLES `Engineer` WRITE;
/*!40000 ALTER TABLE `Engineer` DISABLE KEYS */;
INSERT INTO `Engineer` VALUES (1,'Ali'),(2,'Flan'),(3,'Jean');
/*!40000 ALTER TABLE `Engineer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-01-18 11:10:02
