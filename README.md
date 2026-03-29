# 🛍️ HEXA Clothing – Full Stack E-Commerce Platform

HEXA Clothing is a modern full-stack e-commerce web application designed to deliver a seamless online shopping experience. The system includes a responsive frontend built with React (Vite) and a scalable backend powered by Node.js, Express, and SQL.

---

## 🚀 Project Overview

This platform allows users to:

* Browse products by categories
* View detailed product information
* Add items to cart
* Place and manage orders
* Secure authentication and user management
* Admin-level product and order control

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
* SQL Database (MySQL)

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
│   │   │
│   │   ├── components/              # Reusable UI components
│   │   │   ├── common/              # Buttons, Inputs, Loader
│   │   │   ├── layout/              # Navbar, Footer, Sidebar
│   │   │   └── ui/                  # Figma-based UI blocks
│   │   │
│   │   ├── pages/                   # Screens (Home, Product, Cart...)
│   │   ├── routes/                  # Frontend routing
│   │   ├── services/                # API services (axios)
│   │   ├── hooks/                   # Custom hooks
│   │   ├── context/                 # Global context providers
│   │   ├── utils/                   # Helper functions
│   │   ├── styles/                  # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
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

## 👥 Team & API Responsibilities

| Member     | Branch              | Responsibility     |
| ---------- | ------------------- | ------------------ |
| Shafrin    | feature/auth-api    | Authentication API |
| Heli       | feature/product-api | Product API        |
| Sara       | feature/cart-api    | Cart API           |
| Thushalini | feature/order-api   | Order API          |
| Piyula     | feature/payment-api | Payment API        |
| Vithush    | feature/user-api    | User API           |

---

## 🌿 Git Workflow

We follow a **feature-based branching strategy**:

1. Each member works on their own branch
2. No direct commits to `main`
3. Push changes to feature branch
4. Create Pull Request
5. Review and merge into `main`

### Branch Naming Convention

```bash
feature/<api-name>
```

Example:

```bash
feature/auth-api
feature/product-api
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

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

Create a `.env` file in the root or server folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hexa_db
JWT_SECRET=yoursecretkey
```

---

## 📌 Key Features

* User Authentication (JWT)
* Product Management
* Cart & Checkout System
* Order Processing
* RESTful APIs
* Modular Architecture

---

## 📸 UI/UX Design

Figma Design:
https://www.figma.com/design/huBctacPiwvl9GsP0J25gK/hexa-clothing

---

## ✅ Best Practices Followed

* Clean folder structure
* Separation of concerns (MVC)
* Reusable components
* API modularization
* Version control with Git

---

## 📬 Contribution Guidelines

* Pull latest `main` before starting
* Work only in your assigned branch
* Commit with clear messages
* Test before submitting PR

---

## 📄 License

This project is developed for academic and learning purposes.

---

## 💡 Future Enhancements

* Payment gateway integration
* Admin dashboard UI
* Order tracking system
* Email notifications
* Deployment (Netlify + Render)

---

✨ Built with teamwork, structure, and clean code.
