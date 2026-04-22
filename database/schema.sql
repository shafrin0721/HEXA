-- Run once: mysql -u root -p < schema.sql
CREATE DATABASE IF NOT EXISTS hexal_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hexal_db;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(50),
  avatar_url VARCHAR(512),
  dark_mode TINYINT(1) NOT NULL DEFAULT 0,
  font_size INT NOT NULL DEFAULT 50,
  language VARCHAR(32) NOT NULL DEFAULT 'English (US)',
  email_notif TINYINT(1) NOT NULL DEFAULT 1,
  sms_alerts TINYINT(1) NOT NULL DEFAULT 0,
  newsletter TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  variant VARCHAR(50) DEFAULT 'Classic Tee',
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS payments (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  amount DECIMAL(12,2) NOT NULL,
  payment_method VARCHAR(64),
  card_last_four VARCHAR(8),
  card_type VARCHAR(32),
  status VARCHAR(32) NOT NULL DEFAULT 'pending',
  transaction_id VARCHAR(255),
  order_id INT UNSIGNED NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    address_id INT,        -- NULL allowed
    shipping_method_id INT, -- NULL allowed
    total DECIMAL(10,2),
    status VARCHAR(20),    -- 'pending', 'processing', 'shipped', 'completed'
    created_at DATETIME,
    shipping_cost DECIMAL(10,2) DEFAULT 0,
    shipping_country VARCHAR(100)
);
CREATE TABLE IF NOT EXISTS order_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id INT UNSIGNED NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create shipments table if not exists
CREATE TABLE IF NOT EXISTS shipments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    tracking_number VARCHAR(100),
    status ENUM('Ongoing', 'Completed', 'Delayed', 'in_transit', 'delivered') DEFAULT 'Ongoing',
    shipping_cost DECIMAL(10, 2) DEFAULT 0,
    shipping_country VARCHAR(100),
    shipped_date DATE,
    delivered_date DATE,
    estimated_delivery DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Add shipping columns to orders table if not exists
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS shipping_cost DECIMAL(10, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS shipping_country VARCHAR(100);

-- Create index for better performance
CREATE INDEX idx_shipments_status ON shipments(status);
CREATE INDEX idx_shipments_created ON shipments(created_at);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_orders_status ON orders(status);

-- Insert sample shipment data
INSERT INTO shipments (order_id, tracking_number, status, shipping_cost, shipping_country, shipped_date, delivered_date, created_at) VALUES
(1, 'TRK001', 'Completed', 15.50, 'USA', '2024-01-15', '2024-01-18', '2024-01-15 10:00:00'),
(2, 'TRK002', 'Ongoing', 12.00, 'Canada', '2024-01-16', NULL, '2024-01-16 11:00:00'),
(3, 'TRK003', 'Delayed', 18.00, 'Italy', '2024-01-14', NULL, '2024-01-14 09:00:00'),
(4, 'TRK004', 'Completed', 10.00, 'USA', '2024-01-17', '2024-01-19', '2024-01-17 14:00:00'),
(5, 'TRK005', 'Ongoing', 14.50, 'Canada', '2024-01-18', NULL, '2024-01-18 08:00:00');

-- Update orders with shipping info
UPDATE orders o 
SET o.shipping_cost = (
    SELECT s.shipping_cost 
    FROM shipments s 
    WHERE s.order_id = o.id 
    LIMIT 1
),
o.shipping_country = (
    SELECT s.shipping_country 
    FROM shipments s 
    WHERE s.order_id = o.id 
    LIMIT 1
)
WHERE EXISTS (SELECT 1 FROM shipments s WHERE s.order_id = o.id);

CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    priority VARCHAR(10),  -- 'High', 'Low'
    progress INT,          -- 0-100
    date DATE,
    user_id INT,
    status VARCHAR(20),    -- 'new', 'in_progress', 'completed'
    created_at DATETIME
);

CREATE TABLE activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    user_name VARCHAR(100),
    action VARCHAR(50),    -- 'updated task', 'commented on project', 'created new task'
    file_name VARCHAR(100),
    text_content TEXT,
    created_at DATETIME
);
CREATE TABLE addresses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    address_line_1 TEXT,
    address_line_2 TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    phone VARCHAR(50),
    is_default BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE product_variants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    size VARCHAR(10),
    color VARCHAR(50),
    stock INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE TABLE profiles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    profile_photo TEXT,
    dark_mode TINYINT(1) DEFAULT 0,
    font_size INT DEFAULT 50,
    language VARCHAR(50) DEFAULT 'English (US)',
    email_notif TINYINT(1) DEFAULT 1,
    two_factor_enabled TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_email (email)
);
