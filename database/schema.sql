-- Create Database
CREATE DATABASE IF NOT EXISTS hexa_clothing;
USE hexa_clothing;

-- Drop existing tables if they exist (for clean setup)
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS adminLogs;
DROP TABLE IF EXISTS wishlist;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS orderItems;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cartItems;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS=1;

-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    role ENUM('user', 'admin') DEFAULT 'user',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    categoryId INT NOT NULL,
    image VARCHAR(255),
    rating DECIMAL(3, 2) DEFAULT 0,
    reviews INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_category (categoryId),
    INDEX idx_name (name)
);

-- Cart Items Table
CREATE TABLE cartItems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    addedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (userId, productId)
);

-- Orders Table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shippingAddress TEXT,
    paymentMethod VARCHAR(50),
    paymentStatus ENUM('unpaid', 'paid', 'failed') DEFAULT 'unpaid',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (userId),
    INDEX idx_status (status)
);

-- Order Items Table
CREATE TABLE orderItems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id)
);

-- Reviews Table
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productId INT NOT NULL,
    userId INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product_review (userId, productId)
);

-- Wishlist Table
CREATE TABLE wishlist (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    productId INT NOT NULL,
    addedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product_wishlist (userId, productId)
);

-- Admin Logs Table
CREATE TABLE adminLogs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    adminId INT NOT NULL,
    action VARCHAR(255),
    details TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (adminId) REFERENCES users(id)
);

-- Create Indexes
CREATE INDEX idx_product_stock ON products(stock);
CREATE INDEX idx_order_created ON orders(createdAt);
CREATE INDEX idx_cart_user ON cartItems(userId);
CREATE INDEX idx_review_product ON reviews(productId);