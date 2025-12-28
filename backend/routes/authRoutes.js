const express = require('express');
const { body } = require('express-validator');
const { login } = require('../controllers/authController');
const { register } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  [
    body('username', 'Username is required').notEmpty(),
    body('email', 'Valid email is required').isEmail(),
    body('password', 'Password min 6 chars').isLength({ min: 6 }),
  ],
  register
);

router.post(
  '/login',
  [
    body('email', 'Valid email is required').isEmail(),
    body('password', 'Password is required').notEmpty(),
  ],
  login
);

module.exports = router;
