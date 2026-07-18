const express = require('express');
const { login, logout } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public route to establish session
router.post('/login', login);

// Protected route to destroy session
router.post('/logout', verifyToken, logout);

module.exports = router;
