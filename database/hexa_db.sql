-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2026 at 09:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hexa_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `address_line_1` varchar(255) DEFAULT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `first_name`, `last_name`, `address_line_1`, `address_line_2`, `city`, `postal_code`, `country`, `phone`) VALUES
(1, 1, 'John', 'Wick', '45 Main Street', 'Apartment 5B', 'Colombo', '00100', 'Sri Lanka', '0770000001');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `variant_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'T-Shirts'),
(2, 'Hoodies');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(120) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `subject` varchar(150) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `subject`, `message`, `created_at`) VALUES
(1, 'Alice', 'alice@example.com', 'Order', 'When will my order arrive?', '2026-03-27 10:50:43');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `shipping_method_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `address_id`, `shipping_method_id`, `total`, `status`, `created_at`) VALUES
(1, 1, 1, 1, 39.98, 'pending', '2026-03-27 10:50:42');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, NULL, 1, 19.99),
(2, 1, NULL, 1, 19.99);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `card_name` varchar(100) DEFAULT NULL,
  `card_number` varchar(30) DEFAULT NULL,
  `expiry` varchar(10) DEFAULT NULL,
  `cvv` varchar(10) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `order_id`, `card_name`, `card_number`, `expiry`, `cvv`, `amount`, `status`) VALUES
(1, 1, 'John Wick', '4111111111111111', '12/28', '123', 39.98, 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(120) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `stock` int(11) DEFAULT 50
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `description`, `price`, `image`, `stock`) VALUES
(13, NULL, 'Hexa Classic Tee', 'Soft cotton classic fit tee.', 19.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 50),
(14, NULL, 'Veritas Strength Tee', 'Strength themed cotton tee.', 22.99, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400', 50),
(15, NULL, 'Charole Noir Tee', 'Dark black style tee.', 18.99, 'https://images.unsplash.com/photo-1580489944761-10a60ba3a124?w=400', 50),
(16, NULL, 'Elion Focus Tee', 'Focus design everyday tee.', 24.99, 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=400', 50),
(17, NULL, 'Divinus Path Tee', 'Path graphic cotton tee.', 20.99, 'https://images.unsplash.com/photo-1581686991899-836283602ebd?w=400', 50),
(18, NULL, 'Urban Street Tee', 'Streetwear urban fit.', 17.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 50),
(19, NULL, 'Vintage Graphic Tee', 'Retro graphic print tee.', 25.99, 'https://images.unsplash.com/photo-1542272604-787c38355321?w=400', 50),
(20, NULL, 'Minimalist White Tee', 'Clean minimalist design.', 16.99, 'https://images.unsplash.com/photo-1520975954730-3e44d20e5c5e?w=400', 50),
(21, NULL, 'Premium Cotton Tee', 'High quality cotton.', 28.99, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400', 50),
(22, NULL, 'Fitness Gym Tee', 'Gym ready performance tee.', 21.99, 'https://images.unsplash.com/photo-1574179208501-42ad3995ca89?w=400', 50),
(23, NULL, 'Graphic Bold Tee', 'Bold graphics tee.', 19.49, 'https://images.unsplash.com/photo-1618354691551-0a4049c8e8f8?w=400', 50),
(24, NULL, 'Casual Daily Tee', 'Casual everyday wear.', 15.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 50),
(25, NULL, 'Street Art Tee', 'Art inspired street tee.', 23.99, 'https://images.unsplash.com/photo-1558618047-3c8c76bbb17b?w=400', 50),
(26, NULL, 'Eco Friendly Tee', 'Sustainable cotton tee.', 26.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 50),
(27, NULL, 'Summer Light Tee', 'Lightweight summer tee.', 18.49, 'https://images.unsplash.com/photo-1520975954730-3e44d20e5c5e?w=400', 50),
(28, NULL, 'Winter Heavy Tee', 'Heavy fabric winter tee.', 29.99, 'https://images.unsplash.com/photo-1580489944761-10a60ba3a124?w=400', 50),
(29, NULL, 'Logo Brand Tee', 'Brand logo tee.', 20.49, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 50),
(30, NULL, 'Funny Print Tee', 'Humorous print tee.', 17.49, 'https://images.unsplash.com/photo-1558618047-3c8c76bbb17b?w=400', 50),
(31, NULL, 'Sport Performance Tee', 'Performance sport tee.', 24.49, 'https://images.unsplash.com/photo-1574179208501-42ad3995ca89?w=400', 50),
(32, NULL, 'Elegant Slim Fit Tee', 'Slim fit elegant.', 22.49, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400', 50),
(33, NULL, 'Oversize Loose Tee', 'Oversize casual.', 16.49, 'https://images.unsplash.com/photo-1520975954730-3e44d20e5c5e?w=400', 50),
(34, NULL, 'V Neck Tee', 'V-neck style tee.', 21.49, 'https://images.unsplash.com/photo-1580489944761-10a60ba3a124?w=400', 50),
(35, NULL, 'Polo Shirt Tee', 'Polo collar tee.', 27.99, 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=400', 50),
(36, NULL, 'Long Sleeve Tee', 'Long sleeve cotton.', 25.49, 'https://images.unsplash.com/photo-1581686991899-836283602ebd?w=400', 50),
(37, NULL, 'Short Sleeve Tee', 'Short sleeve basic.', 14.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 50),
(38, NULL, 'Printed Pattern Tee', 'Pattern print tee.', 19.49, 'https://images.unsplash.com/photo-1558618047-3c8c76bbb17b?w=400', 50),
(39, NULL, 'Solid Color Tee', 'Solid black tee.', 18.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 50),
(40, NULL, 'Striped Tee', 'Striped pattern tee.', 23.49, 'https://images.unsplash.com/photo-1580489944761-10a60ba3a124?w=400', 50),
(41, NULL, 'Camouflage Tee', 'Camouflage print tee.', 26.49, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 50),
(42, NULL, 'Floral Tee', 'Floral design tee.', 20.99, 'https://images.unsplash.com/photo-1520975954730-3e44d20e5c5e?w=400', 50),
(43, NULL, 'Geometric Tee', 'Geometric pattern tee.', 22.99, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400', 50),
(44, NULL, 'Abstract Art Tee', 'Abstract art print.', 24.99, 'https://images.unsplash.com/photo-1574179208501-42ad3995ca89?w=400', 50),
(45, NULL, 'Music Band Tee', 'Band logo tee.', 17.99, 'https://images.unsplash.com/photo-1558618047-3c8c76bbb17b?w=400', 50),
(46, NULL, 'Movie Quote Tee', 'Movie quote print.', 21.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 50),
(47, NULL, 'Gaming Tee', 'Gamer theme tee.', 25.99, 'https://images.unsplash.com/photo-1580489944761-10a60ba3a124?w=400', 50),
(48, NULL, 'Tech Logo Tee', 'Tech brand tee.', 19.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 50),
(49, NULL, 'Nature Scene Tee', 'Nature inspired.', 28.99, 'https://images.unsplash.com/photo-1520975954730-3e44d20e5c5e?w=400', 50),
(50, NULL, 'Animal Print Tee', 'Animal motif tee.', 16.99, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400', 50),
(51, NULL, 'Food Theme Tee', 'Food graphic tee.', 20.49, 'https://images.unsplash.com/photo-1574179208501-42ad3995ca89?w=400', 50),
(52, NULL, 'Travel Adventure Tee', 'Adventure travel.', 23.99, 'https://images.unsplash.com/photo-1558618047-3c8c76bbb17b?w=400', 50),
(53, NULL, 'Motivational Quote Tee', 'Motivational text.', 18.49, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 50),
(54, NULL, 'Luxury Brand Tee', 'Luxury style tee.', 32.99, 'https://images.unsplash.com/photo-1580489944761-10a60ba3a124?w=400', 50),
(55, NULL, 'Budget Basic Tee', 'Basic affordable tee.', 12.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 50),
(56, NULL, 'Organic Cotton Tee', 'Organic fabric tee.', 27.49, 'https://images.unsplash.com/photo-1520975954730-3e44d20e5c5e?w=400', 50),
(57, NULL, 'Quick Dry Tee', 'Quick dry sport tee.', 24.49, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400', 50),
(58, NULL, 'Thermal Tee', 'Thermal lined tee.', 29.49, 'https://images.unsplash.com/photo-1574179208501-42ad3995ca89?w=400', 50),
(59, NULL, 'Mesh Breathable Tee', 'Breathable mesh tee.', 22.49, 'https://images.unsplash.com/photo-1558618047-3c8c76bbb17b?w=400', 50),
(60, NULL, 'Hoodie Tee', 'Hooded t-shirt.', 30.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 50),
(61, NULL, 'Pocket Tee', 'Pocket detail tee.', 19.49, 'https://images.unsplash.com/photo-1580489944761-10a60ba3a124?w=400', 50),
(62, NULL, 'Round Neck Tee', 'Round neck classic.', 15.49, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 50),
(63, NULL, 'Crew Neck Tee', 'Crew neck fit.', 21.49, 'https://images.unsplash.com/photo-1520975954730-3e44d20e5c5e?w=400', 50);

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size` varchar(10) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `stock` int(11) DEFAULT 10
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `avatar_url` varchar(512) DEFAULT NULL,
  `dark_mode` tinyint(1) NOT NULL DEFAULT 0,
  `font_size` int(11) NOT NULL DEFAULT 50,
  `language` varchar(32) NOT NULL DEFAULT 'English (US)',
  `email_notif` tinyint(1) NOT NULL DEFAULT 1,
  `sms_alerts` tinyint(1) NOT NULL DEFAULT 0,
  `newsletter` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_methods`
--

CREATE TABLE `shipping_methods` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipping_methods`
--

INSERT INTO `shipping_methods` (`id`, `name`, `price`) VALUES
(1, 'Standard', 0.00),
(2, 'Express', 5.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(120) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('customer','admin') DEFAULT 'customer',
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `role`, `phone`, `created_at`) VALUES
(1, 'John Wick', 'john@example.com', '123456', 'customer', '0770000001', '2026-03-27 10:50:42'),
(2, 'Shavindi Ridmamali Aloka', 'shavindialoka69@gmail.com', '$2b$10$wJjkRrevkcPL/VJhutNTeu5WGiFFMEX5OEK89oBo0b2ix.roEUrce', 'admin', NULL, '2026-03-30 10:29:24'),
(3, 'Thamidu', 'thamidu1234@gmail.com', '$2b$10$twH.UiTp8FD/E6E6ppUWEuNEQSvBXFj7nFl8ENbitAGT5WCDfFEVu', 'customer', NULL, '2026-04-03 05:58:02'),
(4, 'Shehan', 'shehan1234@gmail.com', '$2b$10$BH6PNk1mwmmMjrbALRSJnOkfpzv5tJtkvbBRANqFkDwIi4YTDZCcG', 'customer', NULL, '2026-04-03 06:03:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `address_id` (`address_id`),
  ADD KEY `shipping_method_id` (`shipping_method_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `shipping_methods`
--
ALTER TABLE `shipping_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shipping_methods`
--
ALTER TABLE `shipping_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_3` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`shipping_method_id`) REFERENCES `shipping_methods` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
