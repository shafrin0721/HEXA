# 🛍️ HEXA Clothing – Full Stack E-Commerce Platform

HEXA Clothing is a modern full-stack e-commerce web application designed to deliver a seamless online shopping experience. The system includes a responsive frontend built with React (Vite) and a scalable backend powered by Node.js, Express, and MySQL.

---

## 🚀 Project Overview

This project aims to develop a fully functional e-commerce platform where:

* Customers can browse products and categories
* Users can register and log in securely
* Customers can add items to cart and place orders
* Orders and payments are processed efficiently
* Admins can manage products, users, and orders

---

## 🧱 Tech Stack

### Frontend

* React.js (Vite)
* CSS / Tailwind (optional)
* Axios (API calls)
* React Router

### Backend

* Node.js
* Express.js
* MySQL Database

### Tools

* Git & GitHub (Version Control)
* Postman (API Testing)
* Figma (UI/UX Design)

---

## 📁 Project Structure

```bash
hexa-clothing/
├── client/
│   ├── public/
│   │   ├── icons/
│   │   ├── images/
│   │   └── robots.txt
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   └── Loader.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   └── ui/
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── data/
│   │   │   └── OrderMock.js
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── pages/
│   │   │   ├── About/
│   │   │   ├── Cart/
│   │   │   ├── Checkout/
│   │   │   ├── Contact/
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── OrderSuccess/
│   │   │   ├── OrderSummary/
│   │   │   ├── Products/
│   │   │   ├── Register/
│   │   │   └── ShippingStep/
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── cartService.js
│   │   │   ├── orderService.js
│   │   │   ├── productService.js
│   │   │   └── userService.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── tailwind.config.js/
│   ├── package.json
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── README.md
├── server/
│   ├── app.js
│   ├── package.json
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── cart.routes.js
│   │   ├── order.routes.js
│   │   ├── product.routes.js
│   │   └── user.routes.js
│   └── utils/
│       ├── helpers.js
│       └── validators.js
├── database/
│   ├── schema.sql
│   └── seed.sql
├── package.json
├── .gitignore
├── SETUP.md
├── STRUCTURE.md
├── API_DOCUMENTATION.md
└── README.md
```

---

## 👥 Team & Responsibilities

### 🔹 Development Roles

| Member     | Role                                     |
| ---------- | ---------------------------------------- |
| Shafrin    | Team Lead, Full Stack, Deployment, UI/UX |
| Heli       | Database + Frontend + QA                 |
| Thushalini | Frontend + QA                            |
| Shavindi   | Backend Support + QA + Frontend          |
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
