# 🛍️ HEXA Clothing – Full Stack E-Commerce Platform

HEXA Clothing is a modern full-stack e-commerce web application designed to deliver a seamless online shopping experience. The system includes a responsive frontend built with React (Vite) and a scalable backend powered by Node.js, Express, and SQL.

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
* React.js 19.2 (Vite)
* React Router v7
* Axios (API calls)
* Lucide React (Icons)
* CSS / Tailwind (optional)

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
│
├── client/                          # React Frontend (Vite)
│   ├── public/
│   │   ├── images/
│   │   └── icons/
│   │       └── images/
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── App.css
│       ├── styles/
│       │   └── globals.css
│       ├── assets/
│       ├── components/
│       │   ├── common/
│       │   │   ├── Button.jsx
│       │   │   ├── Input.jsx
│       │   │   └── Loader.jsx
│       │   ├── layout/
│       │   │   ├── Footer.jsx
│       │   │   ├── Footer.css
│       │   │   ├── Navbar.jsx
│       │   │   ├── Navbar.css
│       │   │   └── Sidebar.jsx
│       │   └── ui/
│       │       ├── Banner.jsx
│       │       ├── CategoryCard.jsx
│       │       └── ProductCard.jsx
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── CartContext.jsx
│       ├── data/
│       │   └── OrderMock.js
│       ├── hooks/
│       │   └── useAuth.js
│       ├── pages/
│       │   ├── Cart.jsx
│       │   ├── checkout.css
│       │   ├── checkout.jsx
│       │   ├── Home.css
│       │   ├── Home.jsx
│       │   ├── Login.css
│       │   ├── Login.jsx
│       │   ├── OrderSuccess.jsx
│       │   ├── OrderSummary.jsx
│       │   ├── Products.jsx
│       │   ├── Register.jsx
│       │   ├── shipping.css
│       │   └── ShippingStep.jsx
│       ├── routes/
│       │   └── AppRoutes.jsx
│       ├── services/
│       │   ├── api.js
│       │   ├── authService.js
│       │   ├── orderService.js
│       │   └── productService.js
│       └── utils/
│           └── helpers.js
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── .env
├── .gitignore
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
