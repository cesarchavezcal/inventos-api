// 📕 Glossary
const glossary = require('../../glossary')
// 💾 Database Model
const Business = require('../../models/business');


module.exports = async (req, res) => {
    try {
        // ⚙️ Async function to look for business related to one ID
        // and populate creator
        const business = await Business
            .find({ creator: req.user.id })
            .populate("creator") // key to populate
        // Count the number of objects
        const count = await Business.countDocuments();
        return res.json({
            business,
            count,
            message: `Business obtained`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    }
}