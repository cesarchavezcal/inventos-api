// 📕 Glossary
const glossary = require('../../glossary')
// 💾 Database Model
const Business = require('../../models/business');
// 📦 Dependencies
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    // ⚠️ Do we have errors from req?
    const errors = validationResult(req);
    // ⚙️ Check if we have errors and stop process
    if (!errors.isEmpty) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // ✅ We don't have errors, continue 👨🏻‍🔧
    // Get info from body
    const { name } = req.body;
    // 🛢 Creating duplicated business object
    const newBusiness = {
        updated_at: Date.now()
    };
    // ✏️ Updated fields
    if (name) {
        newBusiness.name = name;
    }
    // ⚙️ Async function to update business
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
        // 📥 Save updated business and populate creator data
        business = await Business.findByIdAndUpdate({ _id: req.params.id }, { $set: newBusiness }, { new: true }).populate("creator");
        return res.json({
            business,
            message: `Business updated`
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    }
}