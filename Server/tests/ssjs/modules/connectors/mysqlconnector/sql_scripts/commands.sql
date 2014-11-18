-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le : Lun 07 Mai 2012 à 11:31
-- Version du serveur: 5.5.20
-- Version de PHP: 5.3.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `testdb_win`
--

-- manualy added

DROP DATABASE IF EXISTS testdb_win;

CREATE DATABASE IF NOT EXISTS testdb_win;

USE testdb_win;

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
