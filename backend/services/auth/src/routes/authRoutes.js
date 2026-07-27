const express = require('express');
const router = express.Router();
const {
  register,
  login,
  refresh,
  logout,
  getProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
} = require('../controllers/authController');
const authMiddleware = require('../../../../shared/middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/profile', authMiddleware, getProfile);
router.post('/change-password', authMiddleware, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);

module.exports = router;
