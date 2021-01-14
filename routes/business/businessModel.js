// 📦 Dependencies
const mongoose = require('mongoose')

// Defining schema
const BusinessSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Business', BusinessSchema);