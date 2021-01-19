// 📕 Glossary
const glossary = require('../../glossary')
// 💾 Database Model
const User = require('../../models/users');


module.exports = async (req, res) => {
    // ⚙️ Async function to get user data
    try {
        // Getting user data
        const user = await User.find({_id: req.user.id});
        // Count the number of objects
        const count = await User.countDocuments();
        return res.json({
            user,
            count,
            message: `User obtained`
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    }
}