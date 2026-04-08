# 🚀 HEXA Clothing - Quick Reference Card

## 📋 Quick Setup (Copy & Paste)

```bash
# 1. Install dependencies
npm run install-client && npm run install-server

# 2. Create and configure .env
cp .env.example .env
# Edit .env with your database credentials

# 3. Setup database
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql

# 4. Start everything
npm run dev
```

**Then access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Admin: admin@hexaclothing.com / Admin@123

---

## 📂 Key Folders

| Folder | Purpose |
|--------|---------|
| `client/src/components/` | Reusable UI components |
| `client/src/pages/` | Page components (routes) |
| `client/src/services/` | API calls (must use!) |
| `client/src/context/` | Global state (Auth, Cart) |
| `server/controllers/` | Business logic |
| `server/routes/` | API endpoints |
| `database/` | SQL scripts |

---

## 🔑 Environment Variables (.env)

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hexa_clothing
JWT_SECRET=your_secret_key_min_32_chars
CLIENT_URL=http://localhost:5173
```

---

## 📡 Main API Endpoints

| Method | Endpoint | Requires Auth | Purpose |
|--------|----------|---------------|---------|
| POST | /auth/register | ❌ | Register user |
| POST | /auth/login | ❌ | Login user |
| GET | /products | ❌ | Get all products |
| GET | /products/:id | ❌ | Get product details |
| GET | /cart | ✅ | Get user's cart |
| POST | /cart/add | ✅ | Add to cart |
| POST | /orders | ✅ | Create order |
| GET | /user/profile | ✅ | Get user profile |

**See API_DOCUMENTATION.md for complete list**

---

## 💻 Important Commands

### Development
```bash
npm run dev                      # Start both client & server
npm run dev --prefix client     # Frontend only
npm run dev --prefix server     # Backend only
npm run build --prefix client   # Build for production
```

### Database
```bash
mysql -u root -p < database/schema.sql   # Create tables
mysql -u root -p < database/seed.sql     # Add sample data
```

### Git
```bash
git checkout -b feature/name    # Create feature branch
git add .
git commit -m "feat: description"
git push origin feature/name
```

---

## 🔐 Authentication Flow

```
1. User registers/logs in
   ↓
2. Server validates & generates JWT token
   ↓
3. Token stored in localStorage
   ↓
4. API requests automatically include token
   ↓
5. Server verifies token on protected routes
```

**Token Format:** `Authorization: Bearer <token>`

---

## 📁 File Structure Quick Look

```
hexa-clothing/
├── client/src/services/
│   ├── api.js              # ← Start here (Axios instance)
│   ├── authService.js      # ← Login/Register
│   ├── productService.js   # ← Get products
│   ├── cartService.js      # ← Cart operations
│   ├── orderService.js     # ← Orders
│   └── userService.js      # ← User profile
│
├── server/controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── userController.js
│
└── database/
    ├── schema.sql          # Database structure
    └── seed.sql            # Sample data
```

---

## 🗄️ Database Tables

| Table | Purpose |
|-------|---------|
| users | User accounts |
| products | Product catalog |
| categories | Product categories |
| cartItems | Shopping cart |
| orders | Order records |
| orderItems | Order line items |
| reviews | Product reviews |
| wishlist | Saved items |

---

## 🔍 Common Errors & Quick Fixes

| Error | Fix |
|-------|-----|
| Port 5000 already in use | `netstat -ano \| findstr :5000` then kill process |
| Database connection failed | Check MySQL is running & credentials in .env |
| CORS error | Verify CLIENT_URL in .env matches frontend URL |
| Module not found | Run `npm install` in the respective folder |
| Token invalid | Restart server & login again |

---

## 🛠️ Frontend Service Usage

```javascript
// Import the service
import * as productService from '../services/productService';

// Use in component
useEffect(() => {
    const fetchProducts = async () => {
        try {
            const data = await productService.getAllProducts();
            setProducts(data.data);
        } catch (error) {
            setError(error.message);
        }
    };
    fetchProducts();
}, []);
```

---

## 🧪 Testing API with cURL

```bash
# Get all products
curl http://localhost:5000/api/products

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hexaclothing.com","password":"Admin@123"}'

# Get cart (replace TOKEN with actual token)
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/cart
```

---

## 👤 Default Test Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@hexaclothing.com | Admin@123 | admin |
| user1@example.com | Admin@123 | user |
| user2@example.com | Admin@123 | user |

---

## 📚 Documentation Map

| Document | For Whom | What's Inside |
|----------|----------|---------------|
| README.md | Everyone | Overview & features |
| SETUP.md | Everyone | Installation guide |
| STRUCTURE.md | Developers | File organization |
| API_DOCUMENTATION.md | Backend devs | All API endpoints |
| CONTRIBUTING.md | Developers | Git workflow & standards |
| CHECKLIST.md | New team members | Getting started |

---

## 🎯 Adding New Feature (Quick Steps)

```javascript
// 1. Create API service (client/src/services/)
export const getNewData = async () => {
    const response = await api.get('/endpoint');
    return response.data;
};

// 2. Create route (server/routes/)
router.get('/endpoint', controller.getNewData);

// 3. Create controller (server/controllers/)
exports.getNewData = async (req, res) => {
    try {
        // Logic here
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Use in component
const data = await getNewData();
```

---

## 🚨 Before Committing Code

- [ ] No `.env` file added
- [ ] No console.log() left in code
- [ ] No hardcoded passwords/secrets
- [ ] All API calls use services
- [ ] Error handling implemented
- [ ] Tested locally
- [ ] Meaningful commit message
- [ ] Branch name follows convention

---

## 📞 Useful Shortcuts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start everything |
| `npm test` | Run tests |
| `npm run lint` | Check code quality |
| `git status` | See changes |
| `git log --oneline` | See commit history |

---

## 🎓 Learning Path

1. **Start Here** → CHECKLIST.md
2. **Then Read** → README.md (overview)
3. **Get Setup** → SETUP.md (installation)
4. **Understand** → STRUCTURE.md (organization)
5. **API Reference** → API_DOCUMENTATION.md
6. **Start Coding** → CONTRIBUTING.md (workflow)

---

## 🆘 Need Help?

1. Check the relevant documentation file
2. Search existing issues on GitHub
3. Ask a team member
4. Check error logs in console/terminal
5. Review similar implementations in codebase

---

## 📱 API Response Format

```javascript
// Success Response (200-201)
{
  "message": "Success message",
  "data": { /* actual data */ },
  "pagination": { /* if applicable */ }
}

// Error Response (400-500)
{
  "message": "Error message",
  "error": "Detailed error"
}
```

---

## ✨ You're All Set!

Everything is configured and ready to code. Just:

1. Copy `.env.example` to `.env`
2. Run `npm run dev`
3. Start building! 🎉

---

**Quick Links:**
- [Full README](README.md)
- [API Documentation](API_DOCUMENTATION.md)
- [Getting Started](CHECKLIST.md)
- [Developer Guide](CONTRIBUTING.md)

**Created:** April 2026  
**Project:** HEXA Clothing E-Commerce Platform
