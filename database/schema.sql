<<<<<<< HEAD
-- Run once: mysql -u root -p < schema.sql
CREATE DATABASE IF NOT EXISTS hexal_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hexal_db;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
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
=======
CREATE DATABASE IF NOT EXISTS hexa_db;
USE hexa_db;

DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(255) NOT NULL
);

CREATE TABLE cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  variant VARCHAR(50) DEFAULT 'Classic Tee',
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products (name, description, price, image) VALUES
('Hexa Classic Tee', 'Soft cotton tee with a classic cut, perfect for everyday wear.', 19.99, '/images/product-main.png'),
('Veritas Strength Tee', 'Soft cotton tee with a classic cut, perfect for everyday wear.', 19.99, '/images/related-1.png'),
('Charole Noir Tee', 'Soft cotton tee with a classic cut, perfect for everyday wear.', 19.99, '/images/related-2.png'),
('Elion Focus Tee', 'Soft cotton tee with a classic cut, perfect for everyday wear.', 19.99, '/images/related-3.png'),
('Divinus Path Tee', 'Soft cotton tee with a classic cut, perfect for everyday wear.', 19.99, '/images/related-4.png');

INSERT INTO cart_items (product_id, quantity, variant) VALUES
(1, 1, 'Classic Tee'),
(4, 1, 'Classic Tee');
>>>>>>> b5fdae2b9d4857c979f491d4bc34c9938d082bd0
