-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2021 at 05:34 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `islow_poll`
--
CREATE DATABASE IF NOT EXISTS `islow_poll` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `islow_poll`;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `USERNAME` varchar(255) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`USERNAME`, `EMAIL`, `PASSWORD`) VALUES
('kianseng', 'kianseng@islow.com', 'aaabbbccc'),
('kianseng1', 'kianseng@islow.com', 'aaabbbccc'),
('kianseng2', 'kianseng2@islow.com', 'aaabbbccc'),
('kianseng3', 'kianseng3@islow.com', '$2a$10$hMBEH2FlvCiK1W/4XrVI0OYtC4E6nvx9w8InPbuKdZe79aItp3WxG'),
('kianseng4', 'kianseng4@islow.com', '$2a$10$PEYAlQV2ZepJBS8u6BPaXOHHXWyuxkY8UGSbxbbqyoQVhNBOe0Rxq'),
('kianseng5', 'kianseng5@islow.com', '$2a$10$phsY7F2z0zOc6gOzg0/8tuiWRwL6A6N9N5T1bLEgyjBUPblJXPoEi');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
