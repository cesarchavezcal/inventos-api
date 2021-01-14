// 📕 Glossary
const glossary = require('./../../glossary')
// 💾 Database Model
const Business = require('./BusinessModel');
const User = require('./../users/UserModel');
// 📦 Dependencies
const { validationResult } = require('express-validator');

exports.postBusiness = async (req, res) => {
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
        // 🛢 Creating new user object
        const business = new Business(req.body);
        // 👉🏻 Set creator ID
        business.creator = req.user.id;
        // 🕵🏻‍♂️ Search for creator info
        const creator = await User.findById(business.creator);
        // Replace creator data
        business.creator = creator;
        // 📥 Save new business and populate creator data
        business.save().then(() => {
            Business.populate(business, {path: "creator"})
            .then(business => {
                res.json({
                    business
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

exports.getBusiness = async (req, res) => {
    try {
        // ⚙️ Async function to look for business related to one ID
        // and populate creator
        const business = await Business
            .find({ creator: req.user.id })
            .populate("creator") // key to populate

        return res.json({ 
            business
         });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: '⚠️ Something happened!'
        });
    }
}