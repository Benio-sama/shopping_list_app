-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2024 at 06:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shoppinglist`
--

-- --------------------------------------------------------

--
-- Table structure for table `shoppinglist`
--

CREATE TABLE `shoppinglist` (
  `id` int(11) NOT NULL,
  `product` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `exp_price` int(11) DEFAULT NULL,
  `isbought` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shoppinglist`
--

INSERT INTO `shoppinglist` (`id`, `product`, `amount`, `unit`, `exp_price`, `isbought`) VALUES
(1, 'Test', 1, 'db', 111, 1),
(2, 'Test', 1, 'db', 111, 0),
(4, 'Test1', 2, 'db', 1112, 1),
(5, 'Test1', 2, 'db', 1112, 1),
(6, 'Test1', 2, 'db', 1112, 1),
(7, 'Test1', 2, 'db', 1112, 1),
(8, 'Test1', 2, 'db', 1112, 1),
(9, 'Test1', 2, 'db', 1112, 1),
(10, 'Test1', 2, 'db', 1112, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shoppinglist`
--
ALTER TABLE `shoppinglist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shoppinglist`
--
ALTER TABLE `shoppinglist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
