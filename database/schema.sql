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