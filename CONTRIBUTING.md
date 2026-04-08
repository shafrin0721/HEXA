# HEXA Clothing - Developer Guide

This guide provides information for developers working on the HEXA Clothing project.

## Getting Started

### Prerequisites
- Node.js (v14+)
- MySQL (v5.7+)
- Git
- Code Editor (VS Code recommended)

### Quick Start
```bash
# Clone repository
git clone https://github.com/your-repo/hexa-clothing.git
cd hexa-clothing

# Install all dependencies
npm run install-client
npm run install-server

# Setup database
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Start development
npm run dev
```

---

## Development Workflow

### Creating a Feature

1. **Create a new branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Make changes**
   - Frontend: Update React components in `client/src/`
   - Backend: Update Express routes and controllers in `server/`
   - Database: Update SQL schemas in `database/`

3. **Test locally**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000
   - Use Postman to test API endpoints

4. **Commit with meaningful messages**
   ```bash
   git commit -m "feat: add product filtering feature"
   ```

5. **Push and create pull request**
   ```bash
   git push origin feature/feature-name
   ```

### Branch Naming Convention
- Feature: `feature/description`
- Bugfix: `bugfix/description`
- Hotfix: `hotfix/description`
- Release: `release/v1.0.0`

### Commit Message Convention
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, test, chore
**Example**:
```
feat(auth): add jwt token refresh mechanism

- Implement token refresh endpoint
- Add refresh token to auth service

Fixes #123
```

---

## Frontend Development

### Project Structure
```
client/src/
├── components/    # UI components
├── pages/        # Page components
├── services/     # API calls
├── context/      # Global state
├── hooks/        # Custom hooks
└── utils/        # Helpers
```

### Adding a New Page
1. Create page component in `pages/`
2. Add route in `routes/AppRoutes.jsx`
3. Create service file if needed in `services/`
4. Import and use service
5. Add navigation link in `Navbar.jsx`

### Adding a New Component
1. Create component file in `components/`
2. Write component logic
3. Create corresponding CSS file
4. Export component
5. Use in pages or other components

### Component Template
```jsx
import React, { useState, useEffect } from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        // Initialization logic
    }, []);

    return (
        <div className="component-name">
            <h2>{prop1}</h2>
            <p>{prop2}</p>
        </div>
    );
};

export default ComponentName;
```

### Using API Services
```jsx
import * as productService from '../services/productService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
```

---

## Backend Development

### Project Structure
```
server/
├── routes/       # API endpoints
├── controllers/  # Business logic
├── models/       # Data models
├── middleware/   # Auth, logging, etc.
├── utils/        # Helpers
└── config/       # Configuration
```

### Adding a New API Endpoint

1. **Create/Update Route** (`routes/resource.routes.js`):
   ```javascript
   router.get('/new', auth, resourceController.getNew);
   ```

2. **Create/Update Controller** (`controllers/resourceController.js`):
   ```javascript
   exports.getNew = async (req, res) => {
       try {
           // Logic here
           res.json({ message: 'Success', data: result });
       } catch (error) {
           res.status(500).json({ message: 'Error', error: error.message });
       }
   };
   ```

3. **Test with Postman/cURL**:
   ```bash
   curl -X GET http://localhost:5000/api/resource/new \
     -H "Authorization: Bearer <token>"
   ```

### Database Queries
Always use parameterized queries:
```javascript
// Good - Safe
const [result] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

// Bad - SQL Injection Risk
const [result] = await pool.query(`SELECT * FROM users WHERE id = ${userId}`);
```

### Error Handling
```javascript
exports.getUser = async (req, res) => {
    try {
        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
        
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({ message: 'User found', data: user[0] });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
```

---

## Database Development

### Adding a New Table
1. Update `database/schema.sql`
2. Test the script locally
3. Run script on all environments

### Example Table
```sql
CREATE TABLE IF NOT EXISTS feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    message TEXT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (userId)
);
```

### Add Sample Data
Update `database/seed.sql` with test data:
```sql
INSERT INTO feedback (userId, message, rating) VALUES
(1, 'Great service!', 5),
(2, 'Good quality', 4);
```

---

## Testing

### Frontend Testing
```bash
# Run tests (when setup)
npm test --prefix client

# Lint code
npm run lint --prefix client
```

### Backend Testing
Use Postman or similar tool:
1. Create collection with all endpoints
2. Set up environment variables
3. Test each endpoint
4. Check response codes and data

### API Testing Checklist
- [ ] All routes return correct HTTP status codes
- [ ] Authentication required endpoints reject unauthenticated requests
- [ ] Admin-only endpoints reject non-admin users
- [ ] Database changes are reflected in responses
- [ ] Error messages are clear and helpful

---

## Debugging

### Frontend
- Open DevTools: F12
- Check Console for errors
- Use React DevTools extension
- Check Network tab for API calls

### Backend
```javascript
// Add logging
console.log('Debug info:', variable);
console.error('Error:', error);

// Use debugger
debugger; // Pause execution in Node debugger
```

### Database
```sql
-- Check table structure
DESCRIBE table_name;

-- View all records
SELECT * FROM table_name;

-- Check indexes
SHOW INDEX FROM table_name;
```

---

## Performance Optimization

### Frontend
- Use React.memo for expensive components
- Lazy load images
- Code splitting with React.lazy()
- Minimize API calls

### Backend
- Use database indexes on frequently queried columns
- Implement pagination for large datasets
- Use connection pooling
- Cache frequently accessed data

### Database
- Create indexes on foreign keys
- Use EXPLAIN to analyze queries
- Archive old data regularly

---

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` file
   - Use strong, unique values
   - Rotate secrets regularly

2. **Authentication**
   - Use JWT tokens
   - Implement token expiration
   - Never store passwords in plain text
   - Hash passwords with bcrypt

3. **Database**
   - Use parameterized queries
   - Limit database user permissions
   - Backup regularly
   - Update MySQL regularly

4. **API**
   - Validate all inputs
   - Implement rate limiting
   - Use HTTPS in production
   - Add CORS restrictions

---

## Useful Commands

```bash
# Frontend
npm run dev --prefix client      # Start dev server
npm run build --prefix client    # Production build
npm run lint --prefix client     # Run linter

# Backend
npm run dev --prefix server      # Start with nodemon
npm start --prefix server        # Production start

# Database
mysql -u root -p < database/schema.sql  # Create tables
mysql -u root -p < database/seed.sql    # Populate data

# Git
git status                       # Check changes
git add .                        # Stage changes
git commit -m "message"          # Commit changes
git push origin branch-name      # Push to remote
```

---

## Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MySQL Documentation](https://dev.mysql.com/doc)
- [JWT.io](https://jwt.io)
- [Axios Documentation](https://axios-http.com)
- [Vite Documentation](https://vitejs.dev)

---

## Getting Help

1. Check documentation files
2. Review similar implementations
3. Check Git history for patterns
4. Ask team members
5. Open an issue on GitHub

---

**Last Updated**: April 2026
