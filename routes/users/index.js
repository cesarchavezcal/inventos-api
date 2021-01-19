// 📕 Glossary
const glossary = require('./../../glossary');
// 📦 Dependencies
const express = require('express');
const { check } = require('express-validator');
// ⚙️ Controllers
const createUserController = require('./../../controllers/users/create');
const getUserController = require('./../../controllers/users/read');
// 🔧 Middlewares
const auth = require('../../middlewares/auth');

// ⚙️ Using router functionality
const router = express.Router();

// ⚙️ Defining CRUD methods
router.post(
    '/',
    [
        check('firstName', 'Name is required').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required and should be at least 6 characters').isLength({ min: 6 })
    ],
    createUserController,
);

router.get(
    '/',
    auth,
    getUserController,
);

module.exports = router;

// TODO Create update service
// TODO Create delete service