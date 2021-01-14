// 📦 Dependencies
const mongoose = require('mongoose')

// Defining schema
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    admin: {
        type: Boolean,
        default: true,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('User', UserSchema);