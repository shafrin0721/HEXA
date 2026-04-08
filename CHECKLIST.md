# HEXA Clothing - Getting Started Checklist

Use this checklist to get up and running with the HEXA Clothing project.

---

## ✅ Initial Setup

### Before First Run
- [ ] **Clone Repository**
  ```bash
  git clone <repository-url>
  cd hexa-clothing
  ```

- [ ] **Install Node.js** (v14+)
  - Verify: `node --version` and `npm --version`

- [ ] **Install MySQL** (v5.7+)
  - Verify: `mysql --version`
  - Ensure MySQL service is running

- [ ] **Install Dependencies**
  ```bash
  npm run install-client
  npm run install-server
  ```

- [ ] **Setup Database**
  ```bash
  mysql -u root -p < database/schema.sql
  mysql -u root -p < database/seed.sql
  ```

- [ ] **Configure Environment**
  ```bash
  cp .env.example .env
  # Edit .env with your database credentials
  ```

---

## 🚀 Running the Project

### Start Development Servers
```bash
# Option 1: Both frontend and backend (recommended)
npm run dev

# Option 2: Frontend only
npm run dev --prefix client

# Option 3: Backend only
npm run dev --prefix server
```

### Verify Everything Works
- [ ] Frontend loads: http://localhost:5173
- [ ] Backend running: http://localhost:5000
- [ ] Can access API: http://localhost:5000/api/health
- [ ] Database connected: Check server logs

---

## 🔑 Test the Authentication

### Create Test Account
1. [ ] Go to http://localhost:5173/register
2. [ ] Create account with:
   - Email: your-email@example.com
   - Password: TestPassword123
3. [ ] Login with credentials
4. [ ] Should see dashboard/home page

### Test Admin Access
1. [ ] Login with admin account:
   - Email: admin@hexaclothing.com
   - Password: Admin@123
2. [ ] Verify admin features accessible

---

## 📁 Project Files Overview

### Essential Files to Understand
- [ ] Read [README.md](README.md) - Project overview
- [ ] Read [SETUP.md](SETUP.md) - Detailed setup guide
- [ ] Read [STRUCTURE.md](STRUCTURE.md) - Folder structure guide
- [ ] Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API endpoints
- [ ] Read [CONTRIBUTING.md](CONTRIBUTING.md) - Developer workflow

### Key Configuration Files
- [ ] `.env.example` - Environment variable template
- [ ] `client/package.json` - Frontend dependencies
- [ ] `server/package.json` - Backend dependencies
- [ ] `database/schema.sql` - Database structure
- [ ] `database/seed.sql` - Sample data

---

## 🛠️ Setting Up Your IDE

### VS Code Recommended Extensions
- [ ] **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
- [ ] **ESLint** (dbaeumer.vscode-eslint)
- [ ] **MySQL** (cweijan.vscode-mysql)
- [ ] **REST Client** (humao.rest-client)
- [ ] **Thunder Client** (rangav.vscode-thunder-client)

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 🧪 Testing the API

### Using Postman
1. [ ] Import API collection (or create manually)
2. [ ] Set base URL: `http://localhost:5000/api`
3. [ ] Test endpoints:
   - [ ] POST /auth/register
   - [ ] POST /auth/login
   - [ ] GET /products
   - [ ] POST /cart/add

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

---

## 📚 Understanding the Codebase

### Frontend Architecture
- [ ] Study `client/src/App.jsx` - Main component
- [ ] Review `client/src/routes/AppRoutes.jsx` - Routing setup
- [ ] Understand `client/src/context/` - Global state
- [ ] Explore `client/src/services/` - API calls

### Backend Architecture
- [ ] Study `server/app.js` - Express setup
- [ ] Review `server/routes/` - Endpoint definitions
- [ ] Understand `server/controllers/` - Business logic
- [ ] Explore `server/config/db.js` - Database connection

### Database Schema
- [ ] Review `database/schema.sql` - Table structures
- [ ] Understand relationships and foreign keys
- [ ] Check indexes on frequently queried columns

---

## 🔄 Common Tasks

### Start Development on a New Feature
1. [ ] Create feature branch: `git checkout -b feature/your-feature`
2. [ ] Make changes (frontend/backend)
3. [ ] Test locally
4. [ ] Commit: `git commit -m "feat: description"`
5. [ ] Push: `git push origin feature/your-feature`

### Debug an Issue
1. [ ] Check browser console for client-side errors
2. [ ] Check terminal for server errors
3. [ ] Use DevTools (F12) to inspect network requests
4. [ ] Check MySQL logs for database issues
5. [ ] Add console.log() statements for debugging

### Test an API Endpoint
1. [ ] Use Postman or REST Client
2. [ ] Include authentication token if protected
3. [ ] Check request body format
4. [ ] Verify response status code
5. [ ] Check response data structure

---

## 🔐 Security Checklist

### Before Committing Code
- [ ] No passwords in code
- [ ] No API keys in code
- [ ] No sensitive data logged
- [ ] `.env` file in `.gitignore`
- [ ] Parameterized SQL queries used
- [ ] Input validation on server side

### Before Production Deploy
- [ ] Change admin password
- [ ] Set strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Update CORS settings
- [ ] Set NODE_ENV=production
- [ ] Disable debug logging
- [ ] Backup database

---

## 🐛 Troubleshooting Quick Links

### Issue Templates
- **Port Already in Use** → [SETUP.md#Port-already-in-use](SETUP.md)
- **Database Connection Error** → [SETUP.md#Database-connection-failed](SETUP.md)
- **CORS Errors** → [SETUP.md#CORS-errors](SETUP.md)
- **Module Not Found** → [SETUP.md#Module-not-found-error](SETUP.md)

### Useful Commands
```bash
# Check if port is free
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # Mac/Linux

# Reset database
mysql -u root -p
DROP DATABASE hexa_clothing;
# Then rerun schema.sql and seed.sql

# Clear npm cache
npm cache clean --force
npm install

# Check database connection
mysql -u root -p -h localhost -D hexa_clothing -e "SELECT 1"
```

---

## 📖 Learning Resources

### Frontend Learning
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router Guide](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

### Backend Learning
- [Express.js Guide](https://expressjs.com)
- [MySQL Tutorial](https://www.w3schools.com/mysql)
- [JWT Introduction](https://jwt.io/introduction)
- [RESTful API Design](https://restfulapi.net)

### General
- [Git Guide](https://git-scm.com/book/en/v2)
- [GitHub Guides](https://guides.github.com)
- [Postman Learning Center](https://learning.postman.com)

---

## 📝 Notes for Your First Day

1. **Read the documentation** - Start with README.md, SETUP.md, and STRUCTURE.md
2. **Get the environment running** - Follow the setup checklist
3. **Explore the codebase** - Understand file structure
4. **Make a small change** - Create a test feature or fix to get comfortable
5. **Ask questions** - Don't hesitate to reach out to team

---

## 🎯 Next Steps After Setup

### For Frontend Developers
- [ ] Create a new page component
- [ ] Add a new route
- [ ] Create a service function
- [ ] Implement form validation

### For Backend Developers
- [ ] Create a new controller method
- [ ] Add a new API endpoint
- [ ] Write database query
- [ ] Test with Postman

### For Database Developers
- [ ] Study current schema
- [ ] Add a new table
- [ ] Create indexes
- [ ] Write optimization queries

---

## 🆘 Getting Help

### If Something Doesn't Work
1. Check relevant documentation file
2. Search for similar issues in project
3. Ask a team member
4. Check error logs carefully
5. Isolate the problem step by step

### Documentation Structure
- **README.md** - General overview
- **SETUP.md** - Installation & troubleshooting
- **STRUCTURE.md** - File organization
- **API_DOCUMENTATION.md** - API endpoints
- **CONTRIBUTING.md** - Developer workflow

---

## ✨ Final Checklist Before Starting Work

- [ ] All dependencies installed
- [ ] Database setup complete
- [ ] `.env` file configured
- [ ] Development servers running
- [ ] Can access frontend at http://localhost:5173
- [ ] Can access backend at http://localhost:5000
- [ ] Can login with test account
- [ ] Read all documentation
- [ ] Understand project structure
- [ ] IDE is configured
- [ ] Ready to contribute!

---

**Congrats! You're ready to start development! 🎉**

For questions or issues, refer to the documentation or ask your team lead.

**Happy Coding!** 💻

---

Created: April 2026  
Last Updated: April 2026
