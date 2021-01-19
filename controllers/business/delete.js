// 📕 Glossary
const glossary = require('../../glossary');
// 💾 Database Model
const Business = require('../../models/business');

module.exports = async (req, res) => {
    // ⚙️ Async function to delete business
    try {
        // 🆔 Get ID from the product which should be update
        let business = await Business.findById(req.params.id);
        // ⚠️ Does the business exist?
        if (!business) {
            return res.status(404).json({
                message: `Business did not found`
            })
        }
        // ⚠️ Does the creator exists
        if (business.creator.toString() !== req.user.id) {
            return res.status(401).json({
                message: `Permission denied, not user`
            })
        }
        // 🗑 Delete business
        await Business.findOneAndRemove({ _id: req.params.id });

        return res.json({
            message: `Business deleted`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    }
}