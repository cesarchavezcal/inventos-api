// 📕 Glossary
const glossary = require('./../../glossary')
// 💾 Database Model
const User = require('./UserModel');
// 📦 Dependencies
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
    // ⚠️ Do we have errors from req?
    const errors = validationResult(req);
    // ⚙️ Check if we have errors and stop process
    if (!errors.isEmpty) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    // ✅ We don't have errors, continue 👨🏻‍🔧
    // ⚙️ Async function to create user
    try {
        // Extracting body data
        const { email, password } = req.body;
        // ⚠️ Do we have already have a user with that info?
        let user = await User.findOne({
            email
        });
        // Check if user is registered and stop process
        if (user) {
            return res.status(400).json({
                message: 'User already exists',
            })
        }
        // ✅ We don't have a user, continue 👨🏻‍🔧
        // 🛢 Creating new user object
        user = new User(req.body);
        // Tokenizing password for protection
        const saltPassword = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, saltPassword);
        // 📥 Save new user
        await user.save();
        // 🔑 JSON WEB TOKEN creation
        // Steps:
        // 1. Create and firm JWT
        const payload = {
            user: {
                id: user.id,
            },
        }
        jwt.sign(payload, process.env.SECRET_WORD, {
            // 1 hour
            expiresIn: 3600
        }, (error, token) => {
            // ⚠️ In case we have problems
            if (error) throw error;
            // 🔑 Give me the token
            res.json({
                user,
                token,
                message: 'User created Succesfully'
            });
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    }
}
