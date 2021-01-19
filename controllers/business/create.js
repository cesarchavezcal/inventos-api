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
    // ⚙️ Async function to create business
    try {
        // 🛢 Creating new business object
        const business = new Business(req.body);
        // 👉🏻 Set creator ID to be used to populate
        business.creator = req.user.id;
        // 📥 Save new business and populate creator data
        business.save().then(() => {
            Business.populate(business, { path: "creator" })
                .then(business => {
                    res.json({
                        business,
                        message: `Business created`
                    })
                })
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    }
};