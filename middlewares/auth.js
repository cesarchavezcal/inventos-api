// 📕 Glossary
const glossary = require('./../glossary');
// 📦 Dependencies
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // 👀 Read token
    const token = req.header('x-auth-token');
    // ⚙️ Check if token is stored
    if(!token) {
        return res.status(401).json({
            message: 'Permission Denied'
        })
    }

    // ✅ We don't have errors, continue 👨🏻‍🔧
    // ⚙️ Validate token
    try {
        // 🔓 Decode token
        const decodeToken = jwt.verify(token, process.env.SECRET_WORD);
        // 👉🏻 Set user data from decoded token
        req.user = decodeToken.user;
        // ✅ We don't have errors, next step!
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Token invalid'
        })
    }
}