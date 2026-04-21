# HEXA Clothing - Complete Functionality Guide

## Overview

This document provides a comprehensive explanation of how all key functionalities work in the HEXA Clothing e-commerce platform. Each system is broken down into its components, data flow, and implementation details.

---

## 1. User Authentication System

### Registration Flow

**Frontend Implementation** (`client/src/context/AuthContext.jsx`)
```javascript
const register = async (userData) => {
    const response = await authAPI.register(userData);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    setUser(response.data.user);
};
```

**Backend Processing** (`server/controllers/authController.js`)
- **Email Validation**: Checks if user already exists in database
- **Password Security**: Hashes password using bcryptjs with salt (10 rounds)
- **Role Assignment**: Automatically assigns 'customer' role to new users
- **Database Storage**: Inserts user into `users` table

```javascript
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
await db.execute(
    'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, 'customer']
);
```

### Login Flow

**JWT Token Generation**
- Creates token containing user ID and role
- Token expires in 1 day
- Secret key stored in environment variables

```javascript
const token = jwt.sign(
    { id: user.id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1d' }
);
```

**Authentication Middleware** (`server/middleware/auth.js`)
- Validates JWT tokens on protected routes
- Supports both cookie and Bearer token authentication
- Fetches current user from database
- Attaches user object to request

**Security Features**
- Password hashing with salt rounds
- JWT token expiration
- Role-based access control
- Input validation and sanitization

---

## 2. Product Management System

### Product Display

**Backend Controllers** (`server/controllers/productController.js`)

**Get All Products**
```javascript
const getAllProducts = async (_req, res) => {
    const [rows] = await pool.query(`
        SELECT p.id, p.category_id, p.name, p.description, 
               p.price, p.image, p.stock, c.name AS category
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.id
    `);
};
```

**Get Single Product**
- Fetches product details with category information
- Includes product variants (size, color) if available
- Handles missing variant tables gracefully

**Database Schema**
```sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    category_id INT,
    stock INT DEFAULT 0
);
```

**Product Features**
- Category-based organization
- Stock management
- Product variants support
- Image handling
- Price formatting

---

## 3. Shopping Cart System

### Cart Operations

**Backend Controller** (`server/controllers/cartController.js`)

**Get User Cart**
```javascript
exports.getCart = async (req, res) => {
    const userId = req.user.id;
    const [cartItems] = await pool.query(`
        SELECT ci.id, ci.product_id, ci.variant_id, ci.quantity, 
               p.name, p.price
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = ?
    `, [userId]);
    
    const total = cartItems.reduce((sum, item) => 
        sum + (parseFloat(item.price) * item.quantity), 0
    );
};
```

**Add to Cart**
- Validates product existence
- Merges quantities for existing items
- Supports product variants
- Updates cart totals automatically

**Update Cart Item**
- Validates item ownership
- Ensures minimum quantity of 1
- Updates quantities in real-time

**Frontend State Management** (`client/src/context/CartContext.jsx`)

**Cart Reducer**
```javascript
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existing = state.find(item => item.id === action.payload.id);
            if (existing) {
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            }
            return [...state, action.payload];
        // ... other cases
    }
};
```

**Cart Features**
- Local storage persistence
- Real-time quantity updates
- Automatic price calculations
- Item merging for duplicates
- Stock validation

---

## 4. Order Processing Workflow

### Order Creation

**Backend Controller** (`server/controllers/orderController.js`)

**Complete Order Process**
```javascript
exports.createOrder = async (req, res) => {
    const { items, total, payment_intent_id, payment_status, 
            shipping_address, payment_info } = req.body;
    
    const connection = await require('../config/db').getConnection();
    await connection.beginTransaction();
    
    try {
        // 1. Create payment record
        const [paymentResult] = await connection.query(`
            INSERT INTO payments (order_id, amount, payment_method, 
                                 card_last_four, status, transaction_id, 
                                 card_type, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
        `, [null, total, 'credit_card', payment_info.card_last4, 
            payment_status || 'completed', payment_intent_id, 
            payment_info.card_type || 'unknown']);
        
        // 2. Create order
        const [orderResult] = await connection.query(`
            INSERT INTO orders (user_id, total, status, created_at) 
            VALUES (?, ?, ?, NOW())
        `, [user_id, total, 'pending']);
        
        // 3. Link payment to order
        await connection.query(
            'UPDATE payments SET order_id = ? WHERE id = ?',
            [orderId, paymentId]
        );
        
        // 4. Add order items
        for (const item of items) {
            await connection.query(`
                INSERT INTO order_items (order_id, product_id, quantity, price) 
                VALUES (?, ?, ?, ?)
            `, [orderId, item.id, item.quantity, item.price]);
        }
        
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    }
};
```

### Order Management

**Customer Features**
- View personal order history
- Track order status
- View order details and items

**Admin Features**
- View all customer orders
- Update order status (pending, processing, shipped, completed)
- Update payment status
- Delete orders if needed

**Database Schema**
```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total DECIMAL(10,2),
    status VARCHAR(20),
    created_at DATETIME,
    shipping_cost DECIMAL(10,2) DEFAULT 0,
    shipping_country VARCHAR(100)
);

CREATE TABLE order_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE payments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED NULL,
    amount DECIMAL(12,2) NOT NULL,
    payment_method VARCHAR(64),
    card_last_four VARCHAR(8),
    card_type VARCHAR(32),
    status VARCHAR(32) NOT NULL DEFAULT 'pending',
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5. Stripe Payment Integration

### Payment Processing

**Backend Controller** (`server/controllers/paymentController.js`)

**Stripe Payment Intent Creation**
```javascript
exports.processPayment = async (req, res) => {
    const { amount, billing_address, email, name, payment_method_token } = req.body;
    
    const amountInCents = Math.round(amount * 100);
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        payment_method: payment_method_token,
        confirm: true,
        confirmation_method: "automatic",
        return_url: `${process.env.FRONTEND_URL}/payment/complete`,
        description: "E-Commerce Payment",
        metadata: {
            email: email || billing_address?.email,
            customer_name: name || `${billing_address?.firstName} ${billing_address?.lastName}`,
        },
        shipping: {
            name: name || `${billing_address?.firstName} ${billing_address?.lastName}`,
            address: {
                line1: billing_address?.address,
                city: billing_address?.city,
                state: billing_address?.state,
                postal_code: billing_address?.zipCode,
                country: "US",
            },
            phone: billing_address?.phoneNumber,
        },
        receipt_email: email || billing_address?.email,
    });
    
    const cardLast4 = paymentIntent.payment_method_details?.card?.last4 || "4242";
    const cardType = paymentIntent.payment_method_details?.card?.brand || "visa";
    
    return {
        payment_intent_id: paymentIntent.id,
        transaction_id: paymentIntent.id,
        amount: amount,
        currency: "usd",
        card_last4: cardLast4,
        card_type: cardType,
        payment_status: paymentIntent.status,
    };
};
```

**Payment Security**
- Stripe secret key stored in environment variables
- No raw card data stored in database
- Payment method tokens for security
- PCI compliance through Stripe
- Automatic currency conversion (USD to cents)

**Payment Features**
- Secure payment processing
- Card brand detection
- Transaction ID tracking
- Error handling for declined payments
- Payment status updates

---

## 6. Admin Dashboard Capabilities

### Dashboard Overview

**Main Dashboard** (`client/src/pages/AdminDashboard.jsx`)

**Real-time Statistics**
```javascript
const [stats, setStats] = useState({
    newTasks: 11,
    inProgressTasks: 3,
    completedTasks: 3,
    newTasksChange: 5,
    inProgressChange: 8
});
```

**Task Management**
- Filter tasks by status (New, In Progress, Completed)
- Priority levels (High, Medium, Low)
- Progress tracking with visual indicators
- Team member assignment

**Team Overview**
- Team member avatars and roles
- Recent activity tracking
- Performance metrics

### Admin Sections

**Order Management**
- View all customer orders
- Update order status
- Track shipping information
- Handle customer inquiries

**User Management**
- Monitor customer accounts
- User role management
- Account status updates

**Inventory Control**
- Product catalog management
- Stock level monitoring
- Price updates
- Category management

**Sales Analytics**
- Revenue tracking
- Order volume metrics
- Customer insights
- Performance reports

**Logistics Management**
- Shipping tracking
- Delivery status updates
- Cost analysis
- Carrier management

### Admin Features

**Dashboard Components**
- Real-time data fetching
- Interactive charts and graphs
- Responsive design
- Role-based access control

**Data Management**
- CRUD operations for all entities
- Bulk operations support
- Data validation
- Error handling

---

## 7. Complete Purchase Flow

### Step-by-Step Process

1. **User Registration/Login**
   - JWT token generation
   - Role assignment
   - Session management

2. **Product Browsing**
   - Category filtering
   - Search functionality
   - Product details view

3. **Cart Management**
   - Add items with variants
   - Quantity adjustments
   - Price calculations

4. **Checkout Process**
   - Shipping information
   - Billing details
   - Payment method selection

5. **Payment Processing**
   - Stripe payment intent
   - Card validation
   - Transaction completion

6. **Order Creation**
   - Database transaction
   - Payment linking
   - Order items storage

7. **Order Tracking**
   - Status updates
   - Shipping information
   - Delivery confirmation

8. **Admin Management**
   - Order fulfillment
   - Customer service
   - Inventory updates

### Data Flow Architecture

```
Frontend (React) 
    API Services (Axios)
        Backend Controllers (Express)
            Database Queries (MySQL)
                Response to Frontend
```

**Authentication Flow**
```
User Login 
    JWT Token 
    Local Storage 
    API Headers 
    Middleware Validation 
    Protected Routes
```

**State Management**
- Auth Context: User authentication state
- Cart Context: Shopping cart state with useReducer
- Local Storage: Persistent UI state
- Database: Persistent application state

---

## 8. Security Measures

### Authentication Security
- JWT token validation on all protected routes
- Password hashing with bcrypt (10 salt rounds)
- Token expiration handling
- Role-based access control

### Payment Security
- Stripe PCI compliance
- No raw card data storage
- Payment method tokens
- Environment variable protection

### Data Security
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- CORS configuration
- Error handling without information leakage

### Application Security
- Environment variable protection
- Secure headers implementation
- Rate limiting capabilities
- Error logging and monitoring

---

## 9. Technology Stack Summary

### Frontend Technologies
- **React 18.3**: Component-based UI framework
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **Radix UI**: Accessible component library
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **React Context**: State management

### Backend Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MySQL**: Relational database
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **Stripe**: Payment processing
- **nodemon**: Development server auto-restart

### Development Tools
- **Git**: Version control
- **ESLint**: Code quality
- **Postman**: API testing
- **MySQL Workbench**: Database management

---

## 10. Database Schema Overview

### Core Tables
- **users**: Customer and admin accounts
- **products**: Product catalog
- **categories**: Product categories
- **cart_items**: Shopping cart data
- **orders**: Order information
- **order_items**: Products in orders
- **payments**: Payment transactions
- **shipments**: Shipping information

### Relationships
- Users to Orders (one-to-many)
- Orders to Order Items (one-to-many)
- Products to Order Items (one-to-many)
- Products to Categories (many-to-one)
- Orders to Payments (one-to-one)
- Orders to Shipments (one-to-one)

---

This comprehensive functionality guide provides detailed insights into how each system works within the HEXA Clothing e-commerce platform. The architecture ensures security, scalability, and maintainability while providing a seamless user experience.
