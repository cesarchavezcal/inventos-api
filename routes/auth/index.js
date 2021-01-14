// 📕 Glossary
const glossary = require('./../../glossary');
// 📦 Dependencies
const express = require('express');
const { check } = require('express-validator');
// ⚙️ Controllers
const authController = require('./authController');

// ⚙️ Using router functionality
const router = express.Router();

// ⚙️ Defining CRUD methods
router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required and should be at least 6 characters').isLength({ min: 6 })
    ],
    authController.userAuth,
);

module.exports = router;