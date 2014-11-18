-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- GÈnÈrÈ le : Lun 07 Mai 2012 ‡ 11:31
-- Version du serveur: 5.5.20
-- Version de PHP: 5.3.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


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
--
-- Base de donnÈes: `testdb_linux`
--

-- manualy added

DROP DATABASE IF EXISTS testdb_linux;

CREATE DATABASE IF NOT EXISTS testdb_linux;

USE testdb_linux;

-- --------------------------------------------------------

--
-- Structure de la table `test_delete_table`
--

CREATE TABLE IF NOT EXISTS `test_delete_table` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `string` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `test_delete_table`
--

INSERT INTO `test_delete_table` (`id`, `number`, `string`) VALUES
(1, 2, 3);

-- --------------------------------------------------------

--
-- Structure de la table `test_executeandfetch_update_table`
--

CREATE TABLE IF NOT EXISTS `test_executeandfetch_update_table` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `number` int(15) NOT NULL,
  `string` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `test_executeandfetch_update_table`
--

INSERT INTO `test_executeandfetch_update_table` (`id`, `number`, `string`) VALUES
(1, 2, '3');

-- --------------------------------------------------------

--
-- Structure de la table `test_execute_update_table`
--

CREATE TABLE IF NOT EXISTS `test_execute_update_table` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `number` int(15) NOT NULL,
  `string` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `test_execute_update_table`
--

INSERT INTO `test_execute_update_table` (`id`, `number`, `string`) VALUES
(1, 2, '3');

-- --------------------------------------------------------

--
-- Structure de la table `test_insert_table`
--

CREATE TABLE IF NOT EXISTS `test_insert_table` (
  `id` int(15) NOT NULL,
  `number` int(15) NOT NULL,
  `string` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `test_insert_table`
--

INSERT INTO `test_insert_table` (`id`, `number`, `string`) VALUES
(1, 2, '3');

-- --------------------------------------------------------

--
-- Structure de la table `test_select_table`
--

CREATE TABLE IF NOT EXISTS `test_select_table` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `number` int(15) NOT NULL,
  `string` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `test_select_table`
--

INSERT INTO `test_select_table` (`id`, `number`, `string`) VALUES
(1, 2, '3'),
(2, 3, '4');

-- --------------------------------------------------------

--
-- Structure de la table `test_update_table`
--

CREATE TABLE IF NOT EXISTS `test_update_table` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `number` int(15) NOT NULL,
  `string` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `test_update_table`
--

INSERT INTO `test_update_table` (`id`, `number`, `string`) VALUES
(1, 2, '3');

--
-- Table structure for table `test_time`
--

DROP TABLE IF EXISTS `test_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_time` (
  `id` int(11) NOT NULL,
  `value` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_time`
--

LOCK TABLES `test_time` WRITE;
/*!40000 ALTER TABLE `test_time` DISABLE KEYS */;
INSERT INTO `test_time` VALUES (1,'00:00:00'),(2,'23:59:59'),(3,NULL);
/*!40000 ALTER TABLE `test_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_int`
--

DROP TABLE IF EXISTS `test_int`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_int` (
  `id` int(11) NOT NULL DEFAULT '0',
  `value` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_int`
--

LOCK TABLES `test_int` WRITE;
/*!40000 ALTER TABLE `test_int` DISABLE KEYS */;
INSERT INTO `test_int` VALUES (0,123),(1,-2147483648),(2,123),(3,2147483647),(4,123),(5,123),(6,NULL);
/*!40000 ALTER TABLE `test_int` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_blob`
--

DROP TABLE IF EXISTS `test_blob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_blob` (
  `id` int(11) NOT NULL DEFAULT '0',
  `value` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_blob`
--

LOCK TABLES `test_blob` WRITE;
/*!40000 ALTER TABLE `test_blob` DISABLE KEYS */;
INSERT INTO `test_blob` VALUES (0,'√Ö¬ª√å√æ¬©√à√ä√ã√ç¬Ω¬â;¬´\0\0'),(1,x'c9cbbbccceb9c8cabcccceb9c9cbbb'),(2,'ªÃ˛©» ÀÕΩâ;´\0\0'),(3,NULL);
/*!40000 ALTER TABLE `test_blob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_text`
--

DROP TABLE IF EXISTS `test_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_text` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `value` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_text`
--

LOCK TABLES `test_text` WRITE;
/*!40000 ALTER TABLE `test_text` DISABLE KEYS */;
INSERT INTO `test_text` VALUES (1,'dddddldldldldldldldldldldldldldc;xcxcwxccwxcxcxc scmlmclmssssmmsmdejkdekekfkdc, ,kckdkdkdkdcdcd12 deqaaaa dsssssxqxxxxdsdfsdfdfdsfsdfsdfdfdf'),(2,'aaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccdddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffggggggggggggggggggghhhhhhhhhhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'),(3,'aaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccdddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffggggggggggggggggggghhhhhhhhhhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'),(4,'aaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccdddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffggggggggggggggggggghhhhhhhhhhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'),(5,'aaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccdddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffggggggggggggggggggghhhhhhhhhhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'),(6,'aaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccdddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffggggggggggggggggggghhhhhhhhhhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'),(7,'aaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccdddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffggggggggggggggggggghhhhhhhhhhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'),(8,'aaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccdddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffggggggggggggggggggghhhhhhhhhhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'),(9,'aaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccdddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffggggggggggggggggggghhhhhhhhhhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
/*!40000 ALTER TABLE `test_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_tiny_int`
--

DROP TABLE IF EXISTS `test_tiny_int`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_tiny_int` (
  `id` int(11) NOT NULL DEFAULT '0',
  `value` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_tiny_int`
--

LOCK TABLES `test_tiny_int` WRITE;
/*!40000 ALTER TABLE `test_tiny_int` DISABLE KEYS */;
INSERT INTO `test_tiny_int` VALUES (1,0),(2,127),(3,64),(4,-128);
/*!40000 ALTER TABLE `test_tiny_int` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_float`
--

DROP TABLE IF EXISTS `test_float`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_float` (
  `id` int(11) NOT NULL DEFAULT '0',
  `value` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_float`
--

LOCK TABLES `test_float` WRITE;
/*!40000 ALTER TABLE `test_float` DISABLE KEYS */;
INSERT INTO `test_float` VALUES (1,-3.40282e38),(2,0),(3,-1.17549e-38),(4,1.17549e-38),(5,3.40282e38);
/*!40000 ALTER TABLE `test_float` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_datetime`
--

DROP TABLE IF EXISTS `test_datetime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_datetime` (
  `id` int(11) NOT NULL,
  `value` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_datetime`
--

LOCK TABLES `test_datetime` WRITE;
/*!40000 ALTER TABLE `test_datetime` DISABLE KEYS */;
INSERT INTO `test_datetime` VALUES (1,'1000-01-01 00:00:00'),(2,'9999-12-31 23:59:59'),(3,'0000-00-00 00:00:00');
/*!40000 ALTER TABLE `test_datetime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_char`
--

DROP TABLE IF EXISTS `test_char`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_char` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `value` char(8) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_char`
--

LOCK TABLES `test_char` WRITE;
/*!40000 ALTER TABLE `test_char` DISABLE KEYS */;
INSERT INTO `test_char` VALUES (1,'test22');
/*!40000 ALTER TABLE `test_char` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_string`
--

DROP TABLE IF EXISTS `test_string`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_string` (
  `id` int(11) NOT NULL DEFAULT '0',
  `value` varchar(250) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_string`
--

LOCK TABLES `test_string` WRITE;
/*!40000 ALTER TABLE `test_string` DISABLE KEYS */;
INSERT INTO `test_string` VALUES (0,'test value'),(1,''),(2,'test value'),(3,'a'),(4,'test value');
/*!40000 ALTER TABLE `test_string` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_small_int`
--

DROP TABLE IF EXISTS `test_small_int`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_small_int` (
  `id` int(11) NOT NULL DEFAULT '0',
  `value` smallint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_small_int`
--

LOCK TABLES `test_small_int` WRITE;
/*!40000 ALTER TABLE `test_small_int` DISABLE KEYS */;
INSERT INTO `test_small_int` VALUES (1,-32768),(2,0),(3,32767);
/*!40000 ALTER TABLE `test_small_int` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_set`
--

DROP TABLE IF EXISTS `test_set`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_set` (
  `id` int(11) NOT NULL,
  `value` set('1','one','test') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_set`
--

LOCK TABLES `test_set` WRITE;
/*!40000 ALTER TABLE `test_set` DISABLE KEYS */;
INSERT INTO `test_set` VALUES (1,'1'),(2,'one,test'),(3,NULL);
/*!40000 ALTER TABLE `test_set` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_null`
--

DROP TABLE IF EXISTS `test_null`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_null` (
  `id` int(11) NOT NULL,
  `value` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_null`
--

LOCK TABLES `test_null` WRITE;
/*!40000 ALTER TABLE `test_null` DISABLE KEYS */;
INSERT INTO `test_null` VALUES (1,NULL),(2,NULL),(3,NULL);
/*!40000 ALTER TABLE `test_null` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_decimal`
--

DROP TABLE IF EXISTS `test_decimal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_decimal` (
  `id` int(11) NOT NULL,
  `value` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_decimal`
--

LOCK TABLES `test_decimal` WRITE;
/*!40000 ALTER TABLE `test_decimal` DISABLE KEYS */;
INSERT INTO `test_decimal` VALUES (1,-9999999999),(2,87),(3,NULL);
/*!40000 ALTER TABLE `test_decimal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_decimal2`
--

DROP TABLE IF EXISTS `test_decimal2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_decimal2` (
  `id` int(11) NOT NULL,
  `value` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_decimal2`
--

LOCK TABLES `test_decimal2` WRITE;
/*!40000 ALTER TABLE `test_decimal2` DISABLE KEYS */;
INSERT INTO `test_decimal2` VALUES (1,-9999999999),(2,9999999999),(3,NULL);
/*!40000 ALTER TABLE `test_decimal2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_double`
--

DROP TABLE IF EXISTS `test_double`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_double` (
  `id` int(11) NOT NULL DEFAULT '0',
  `value` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_double`
--

LOCK TABLES `test_double` WRITE;
/*!40000 ALTER TABLE `test_double` DISABLE KEYS */;
INSERT INTO `test_double` VALUES (1,-1.7976931348623157e308),(2,0),(3,-2.2250738585072e-308),(4,2.2250738585072e-308),(5,1.7976931348623157e308);
/*!40000 ALTER TABLE `test_double` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_date`
--

DROP TABLE IF EXISTS `test_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_date` (
  `id` int(11) NOT NULL,
  `value` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_date`
--

LOCK TABLES `test_date` WRITE;
/*!40000 ALTER TABLE `test_date` DISABLE KEYS */;
INSERT INTO `test_date` VALUES (1,'1000-01-01'),(2,'9999-12-31');
/*!40000 ALTER TABLE `test_date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_year`
--

DROP TABLE IF EXISTS `test_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_year` (
  `id` int(11) NOT NULL,
  `value` year(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_year`
--

LOCK TABLES `test_year` WRITE;
/*!40000 ALTER TABLE `test_year` DISABLE KEYS */;
INSERT INTO `test_year` VALUES (1,1901),(2,2155),(3,NULL);
/*!40000 ALTER TABLE `test_year` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_big_int`
--

DROP TABLE IF EXISTS `test_big_int`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_big_int` (
  `id` int(11) NOT NULL DEFAULT '0',
  `value` bigint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_big_int`
--

LOCK TABLES `test_big_int` WRITE;
/*!40000 ALTER TABLE `test_big_int` DISABLE KEYS */;
INSERT INTO `test_big_int` VALUES (1,-9223372036854776000),(2,0),(3,9223372036854776000);
/*!40000 ALTER TABLE `test_big_int` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_timestamp`
--

DROP TABLE IF EXISTS `test_timestamp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_timestamp` (
  `id` int(11) NOT NULL,
  `value` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_timestamp`
--

LOCK TABLES `test_timestamp` WRITE;
/*!40000 ALTER TABLE `test_timestamp` DISABLE KEYS */;
INSERT INTO `test_timestamp` VALUES (1,'2012-10-23 16:25:15');
/*!40000 ALTER TABLE `test_timestamp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_bit`
--

DROP TABLE IF EXISTS `test_bit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_bit` (
  `id` int(11) NOT NULL,
  `value` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_bit`
--

LOCK TABLES `test_bit` WRITE;
/*!40000 ALTER TABLE `test_bit` DISABLE KEYS */;
INSERT INTO `test_bit` VALUES (1,'\0'),(2,''),(3,NULL);
/*!40000 ALTER TABLE `test_bit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_enum`
--

DROP TABLE IF EXISTS `test_enum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_enum` (
  `id` int(11) NOT NULL,
  `value` enum('Asia','Europe','North America','Africa','Oceania','Antarctica','South America') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_enum`
--

LOCK TABLES `test_enum` WRITE;
/*!40000 ALTER TABLE `test_enum` DISABLE KEYS */;
INSERT INTO `test_enum` VALUES (1,'Asia'),(2,'Africa'),(3,NULL);
/*!40000 ALTER TABLE `test_enum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_medium_int`
--

DROP TABLE IF EXISTS `test_medium_int`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_medium_int` (
  `id` int(11) NOT NULL DEFAULT '0',
  `value` mediumint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_medium_int`
--

LOCK TABLES `test_medium_int` WRITE;
/*!40000 ALTER TABLE `test_medium_int` DISABLE KEYS */;
INSERT INTO `test_medium_int` VALUES (1,-8388608),(2,0),(3,8388607);
/*!40000 ALTER TABLE `test_medium_int` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_npstmt`
--

DROP TABLE IF EXISTS `test_npstmt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_npstmt` (
  `id` int(11) NOT NULL,
  `value` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_npstmt`
--

LOCK TABLES `test_npstmt` WRITE;
/*!40000 ALTER TABLE `test_npstmt` DISABLE KEYS */;
INSERT INTO `test_npstmt` VALUES (1,'hello :Salut'),(2,'hello :\"Salut'),(3,':a');
/*!40000 ALTER TABLE `test_npstmt` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
