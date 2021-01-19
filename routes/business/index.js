// 📕 Glossary
const glossary = require('./../../glossary');
// 📦 Dependencies
const express = require('express');
const { check } = require('express-validator');
// ⚙️ Controllers CRUD
const deleteBusinessController = require('../../controllers/business/delete');
const readBusinessController = require('../../controllers/business/read');
const updateBusinessController = require('../../controllers/business/update');
const createBusinessController = require('../../controllers/business/create');
// 🔧 Middlewares
const auth = require('../../middlewares/auth');

// ⚙️ Using router functionality
const router = express.Router();

// ⚙️ Defining CRUD methods
router.post('/',
    [check('name', 'Name is required').not().isEmpty()],
    auth,
    createBusinessController
);

router.get('/',
    auth,
    readBusinessController
);

router.put('/:id',
    [check('name', 'Name is required').not().isEmpty()],
    auth,
    updateBusinessController
);

router.delete('/:id',
    auth,
    deleteBusinessController
);

module.exports = router;