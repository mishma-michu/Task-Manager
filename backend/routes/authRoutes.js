const express = require('express');
const { body } = require('express-validator');
const { login } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/login',
  [
    body('email', 'Valid email is required').isEmail(),
    body('password', 'Password is required').notEmpty(),
  ],
  login
);

module.exports = router;
