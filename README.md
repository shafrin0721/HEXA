# 🛍️ HEXA Clothing – Full Stack E-Commerce Platform

HEXA Clothing is a modern full-stack e-commerce web application designed to deliver a seamless online shopping experience. The system includes a responsive frontend built with React (Vite) and a scalable backend powered by Node.js, Express, and MySQL.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14+ ([Download](https://nodejs.org))
- **MySQL** v5.7+ ([Download](https://www.mysql.com/downloads/))
- **Git** ([Download](https://git-scm.com))

### Installation (5 minutes)

```bash
# 1. Clone repository
git clone <repository-url>
cd hexa-clothing

# 2. Install dependencies
npm run install-client
npm run install-server

# 3. Setup database
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql

# 4. Configure environment
cp .env.example .env
# Edit .env and add your database credentials

# 5. Start development servers
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Default Admin: `admin@hexaclothing.com` / `Admin@123`

---

## 🧱 Tech Stack

### Frontend
* React.js 19.2 (Vite)
* React Router v7
* Axios (API calls)
* Lucide React (Icons)
* CSS / Tailwind (optional)

### Backend
* Node.js
* Express.js
* MySQL Database
* JWT Authentication
* bcryptjs Password Hashing

### Tools
* Git & GitHub (Version Control)
* Postman (API Testing)
* Figma (UI/UX Design)

---

## 📁 Project Structure

```bash
hexa-clothing/
│
├── client/                          # React Frontend (Vite)
│   ├── public/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── src/
│   │   ├── assets/                  # Static assets (images, fonts)
│   │   ├── components/              # Reusable UI components
│   │   │   ├── common/              # Buttons, Inputs, Loaders
│   │   │   ├── layout/              # Navbar, Footer, Sidebar
│   │   │   └── ui/                  # Figma-based UI blocks
│   │   ├── pages/                   # Screens (Home, Product, Cart, Checkout)
│   │   ├── routes/                  # Frontend routing
│   │   ├── services/                # API services (Axios)
│   │   ├── hooks/                   # Custom hooks
│   │   ├── context/                 # Global context providers
│   │   ├── utils/                   # Helper functions
│   │   ├── styles/                  # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Node.js Backend (Express)
│   ├── config/                      # DB connection
│   ├── controllers/                 # API logic
│   ├── models/                      # SQL Models
│   ├── routes/                      # Express routing
│   ├── middleware/                  # Auth middleware
│   ├── utils/                       # Helper functions
│   ├── app.js                       # Express app setup
│   └── server.js                    # Start server
│
├── database/                        # SQL Scripts
│   ├── schema.sql
│   └── seed.sql
│
├── .env
├── .gitignore
└── README.md
```

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register        # Register user
POST   /api/auth/login           # Login user
POST   /api/auth/logout          # Logout user
POST   /api/auth/refresh         # Refresh token
```

### Products
```
GET    /api/products             # Get all products
GET    /api/products/:id         # Get product details
GET    /api/products/category/:id # Get by category
POST   /api/products             # Create (Admin)
PUT    /api/products/:id         # Update (Admin)
DELETE /api/products/:id         # Delete (Admin)
```

### Cart
```
GET    /api/cart                 # Get cart
POST   /api/cart/add             # Add item
PUT    /api/cart/:itemId         # Update item
DELETE /api/cart/:itemId         # Remove item
DELETE /api/cart                 # Clear cart
```

### Orders
```
POST   /api/orders               # Create order
GET    /api/orders               # Get all (Admin)
GET    /api/orders/user          # Get user orders
GET    /api/orders/:id           # Get order details
PUT    /api/orders/:id           # Update status (Admin)
DELETE /api/orders/:id           # Delete (Admin)
```

### User
```
GET    /api/user/profile         # Get profile
PUT    /api/user/profile         # Update profile
PUT    /api/user/change-password # Change password
GET    /api/user                 # Get all (Admin)
DELETE /api/user/account         # Delete account
```

**Full API docs: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)**

---

## ✨ Features

### 👥 User Management
- ✅ User registration and authentication
- ✅ JWT-based authentication
- ✅ User profile management
- ✅ Password change functionality
- ✅ Account deletion

### 🛍️ Product Catalog
- ✅ Browse products by category
- ✅ Product search and filtering
- ✅ Product details with reviews
- ✅ Rating system
- ✅ Pagination support

### 🛒 Shopping Cart
- ✅ Add/remove items
- ✅ Update quantities
- ✅ Calculate totals
- ✅ Item availability check
- ✅ Clear cart option

### 💳 Orders
- ✅ Place orders
- ✅ Order history tracking
- ✅ Order status management
- ✅ Order details view
- ✅ Multiple payment method support

---
| Piyula     | Frontend + QA                            |
| Vithush    | Full Stack Development                   |
| Sara       | Frontend + QA                            |

---

### 🎨 Page Allocation (Frontend)

| Member     | Pages                                       |
| ---------- | ------------------------------------------- |
| Heli       | Home, Products (Grid), About                |
| Shafrin    | Products (Single/List), Cart, Order Summary |
| Shavindi   | Create Account, Log In                      |
| Thushalini | Contact, Profile                            |
| Piyula     | Address, Shipping                           |
| Vithush    | Payment, Review                             |
| Sara       | Order Success, Order Summary 1              |

---

## 🌿 Git Workflow

We follow a **feature-based branching strategy (page-based)**:

* Each member works on their assigned pages in a separate branch
* No direct commits to `main`
* Push changes → Create Pull Request → Review → Merge

---

### 🔀 Branch Naming Convention

```bash
feature/<member>-<pages>
```

---

### 📌 Branch Allocation

```bash
feature/heli-home-products-about
feature/shafrin-products-cart-order-summary
feature/shavindi-auth-pages
feature/thushalini-contact-profile
feature/piyula-address-shipping
feature/vithush-payment-review
feature/sara-order-success-summary1
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/shafrin0721/HEXA.git
cd HEXA
```

---

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

### 3. Backend Setup

```bash
cd server
npm install
npm start
```

---

### 4. Database Setup

* Import `schema.sql`
* Run `seed.sql` (optional)

---

## 🔐 Environment Variables

Create a `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hexa_db
JWT_SECRET=yoursecretkey
```

---

## 📅 Project Timeline

| Phase   | Task                 | Duration |
| ------- | -------------------- | -------- |
| Phase 1 | Project Setup        | 2 Days   |
| Phase 2 | UI/UX Design         | 3 Days   |
| Phase 3 | Database Design      | 3 Days   |
| Phase 4 | Frontend Development | 10 Days  |
| Phase 5 | Backend Development  | 12 Days  |
| Phase 6 | Testing & QA         | 5 Days   |
| Phase 7 | Deployment           | 2 Days   |

**Total Duration:** ~6 Weeks (34 Working Days)

---

## 🔧 Development Workflow

1. Setup environment
2. Design UI & database
3. Develop frontend & backend in parallel
4. API integration
5. Testing & debugging
6. Deployment

---

## 📌 Key Features

* User Authentication (JWT)
* Product Management
* Cart & Checkout System
* Order Processing
* Payment Integration
* RESTful APIs
* Responsive UI

---

## 🔐 Security Measures

* HTTPS (SSL)
* Password hashing (bcrypt)
* JWT authentication
* Input validation & sanitization

---

## ⚠️ Risk Management

| Risk               | Impact | Mitigation            |
| ------------------ | ------ | --------------------- |
| Team delays        | High   | Parallel development  |
| Integration issues | High   | Daily sync meetings   |
| Bugs               | Medium | Continuous testing    |
| Deployment errors  | Medium | Pre-deployment checks |

---

## 🎯 Success Criteria

* System runs without critical bugs
* Smooth checkout process
* Admin can manage products & orders
* Fully responsive UI
* Fast performance

---

## 📸 UI/UX Design

Figma Design:
https://www.figma.com/design/huBctacPiwvl9GsP0J25gK/hexa-clothing

---

## 📬 Contribution Guidelines

* Pull latest `main` before starting
* Work only in your assigned branch
* Commit with clear messages
* Test before creating Pull Request

---

## 🚀 Deployment Plan

* Frontend: Netlify
* Backend: Render
* Database: MySQL Server

---

## 📄 License

This project is developed for academic purposes.

---

✨ Built with teamwork, structured planning, and clean development practices.
