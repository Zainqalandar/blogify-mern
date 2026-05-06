const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {
	register,
	emailVerify,
	getAllUsers,
	login,
} = require('../controllers/auth.controller');

// router.get('/', getAllUsers);
router.route('/').get(authMiddleware, getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.post('/verify/:token', emailVerify);

module.exports = router;
