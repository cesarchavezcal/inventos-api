// 📕 Glossary
const glossary = require('./../../glossary');
// 📦 Dependencies
const express = require('express');
const { check } = require('express-validator');
// ⚙️ Controllers
const businessController = require('./businessController');
// 🔧 Middlewares
const auth = require('../../middlewares/auth');

// ⚙️ Using router functionality
const router = express.Router();

// ⚙️ Defining CRUD methods
router.post('/',
    [ check('name', 'Name is required').not().isEmpty() ],
    auth,
    businessController.postBusiness,
);

router.get('/',
    auth,
    businessController.getBusiness,
);

module.exports = router;