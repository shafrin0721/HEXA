import express from 'express';
import { register, login } from '../controller/authController.js';

const router = express.Router();

// මෙතන අමතර '/api/auth' කෑල්ලක් ලියන්න එපා. 
// '/' එක විතරක් පාවිච්චි කරන්න.
router.post('/register', register);
router.post('/login', login);

export default router;