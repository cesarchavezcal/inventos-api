// 📕 Glossary
const glossary = require('./../../glossary')
// 💾 Database Model
const User = require('./../../models/users');
// 📦 Dependencies
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.userAuth = async (req, res) => {
    // ⚠️ Do we have errors from req?
    const errors = validationResult(req);
    // ⚙️ Check if we have errors and stop process
    if (!errors.isEmpty) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    // ✅ We don't have errors, continue 👨🏻‍🔧
    // ⚙️ Async function to auth user
    try {
        // Extracting body data
        const { email, password } = req.body;
        // ⚠️ Do we have this user registered?
        let user = await User.findOne({ email });
        // Check if user is registered and stop process
        if(!user) {
            return res.status(400).json({
                message: 'User is not registered',
            })
        }
        // ✅ User exists, continue 👨🏻‍🔧
        // ⚙️ Verify password
        const verifyPassword = await bcryptjs.compare(password, user.password);
        // Check if password is correct or stop process
        if(!verifyPassword) {
            return res.status(400).json({
                message: 'Password is not correct',
            })
        }

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
                message: 'User Logged Succesfully'
            });
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    }
}