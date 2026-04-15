🛍️ HEXA Clothing – Full Stack E-Commerce Platform
HEXA Clothing is a modern full-stack e-commerce web application designed to deliver a seamless online shopping experience. The system includes a responsive frontend built with React (Vite) and a scalable backend powered by Node.js, Express, and SQL.

🚀 Project Overview (Updated: Cart Feature Removed)
This platform allows users to:

Browse products by categories
View detailed product information
Secure authentication and user management (planned)
Admin-level product control (planned)

🧱 Tech Stack
Frontend
React.js (Vite)
CSS / Tailwind (optional)
Axios (API calls)
React Router

Backend
Node.js
Express.js
SQL Database (MySQL)

Tools
Git & GitHub (Version Control)
Postman (API Testing)
Figma (UI/UX Design)

📁 Project Structure (Updated)
.
├── README.md
├── TODO.md
├── .env # Environment variables
├── package.json # Backend deps
├── server.js # Backend entry
├── config/ # DB config
├── controllers/ # API controllers
├── routes/ # API routes
├── sql/ # Schema
├── client/ # React Frontend (full Vite app)
├── hexa/ # Legacy DB/docs
└── node_modules/ # Backend deps

👥 Team & API Responsibilities
Member Branch Responsibility
Shafrin feature/auth-api Authentication API
Heli feature/product-api Product API
Sara feature/cart-api Cart API
Thushalini feature/order-api Order API
Piyula feature/payment-api Payment API
Vithush feature/user-api User API

🌿 Git Workflow
We follow a feature-based branching strategy:

Each member works on their own branch
No direct commits to main
Push changes to feature branch
Create Pull Request
Review and merge into main

Branch Naming Convention
feature/<api-name>

Example:
feature/auth-api
feature/product-api

⚙️ Setup Instructions (Updated Structure)

1. Clone the Repository
   git clone https://github.com/shafrin0721/HEXA.git
   cd HEXA

2. Backend Setup (root)
   npm install # if needed
   npm start # or node server.js

# Runs on http://localhost:5000

3. Frontend Setup
   cd client
   npm install # if needed
   npm run dev # Runs on http://localhost:5173 (Vite)

4. Database Setup
   Import sql/schema.sql and hexa/hexa_db.sql into MySQL (hexa_db)

🔐 Environment Variables (.env at root)
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hexa_db
JWT_SECRET=yoursecretkey

📌 Key Features
User Authentication (JWT)
Product Management
Cart & Checkout System
Order Processing
RESTful APIs
Modular Architecture

📸 UI/UX Design
Figma Design: https://www.figma.com/design/huBctacPiwvl9GsP0J25gK/hexa-clothing

✅ Best Practices Followed
Clean folder structure
Separation of concerns (MVC)
Reusable components
API modularization
Version control with Git

📬 Contribution Guidelines
Pull latest main before starting
Work only in your assigned branch
Commit with clear messages
Test before submitting PR

📄 License
This project is developed for academic and learning purposes.

💡 Future Enhancements
Payment gateway integration
Admin dashboard UI
Order tracking system
Email notifications
Deployment (Netlify + Render)

✨ Built with teamwork, structure, and clean code.

**Structure reorganized: Backend at root, Frontend in client/**
