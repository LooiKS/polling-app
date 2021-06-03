-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2021 at 07:36 PM
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
-- Table structure for table `choice`
--

CREATE TABLE `choice` (
  `ID` int(11) NOT NULL,
  `ANSWER` text NOT NULL,
  `POLL_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `choice`
--

INSERT INTO `choice` (`ID`, `ANSWER`, `POLL_ID`) VALUES
(2, 'Yes', 1),
(3, 'No', 1);

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(4);

-- --------------------------------------------------------

--
-- Table structure for table `poll`
--

CREATE TABLE `poll` (
  `ID` int(11) NOT NULL,
  `QUESTION` text NOT NULL,
  `CREATED_BY` varchar(255) NOT NULL,
  `CREATED_DT` datetime NOT NULL,
  `EXPIRY_DT` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `poll`
--

INSERT INTO `poll` (`ID`, `QUESTION`, `CREATED_BY`, `CREATED_DT`, `EXPIRY_DT`) VALUES
(1, 'Are you tired, want to rest fully for 2 weeks?', 'kianseng5', '2021-06-04 01:35:10', '2021-06-05 05:21:29');

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
('kianseng5', 'kianseng5@islow.com', '$2a$10$phsY7F2z0zOc6gOzg0/8tuiWRwL6A6N9N5T1bLEgyjBUPblJXPoEi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `choice`
--
ALTER TABLE `choice`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKkubnxwj8spmef2kbwpgqrwatp` (`POLL_ID`);

--
-- Indexes for table `poll`
--
ALTER TABLE `poll`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK18a8tohky74fx4kdk34o8rp62` (`CREATED_BY`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`USERNAME`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `choice`
--
ALTER TABLE `choice`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `poll`
--
ALTER TABLE `poll`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `choice`
--
ALTER TABLE `choice`
  ADD CONSTRAINT `FKkubnxwj8spmef2kbwpgqrwatp` FOREIGN KEY (`POLL_ID`) REFERENCES `poll` (`ID`),
  ADD CONSTRAINT `choice_ibfk_1` FOREIGN KEY (`POLL_ID`) REFERENCES `poll` (`ID`);

--
-- Constraints for table `poll`
--
ALTER TABLE `poll`
  ADD CONSTRAINT `FK18a8tohky74fx4kdk34o8rp62` FOREIGN KEY (`CREATED_BY`) REFERENCES `user` (`USERNAME`),
  ADD CONSTRAINT `poll_ibfk_1` FOREIGN KEY (`CREATED_BY`) REFERENCES `user` (`USERNAME`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
