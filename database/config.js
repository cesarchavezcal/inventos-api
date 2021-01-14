// 📦 Dependencies
const mongoose = require('mongoose');
// Environment variable
require('dotenv').config({ path: '.env' });

// Connecting to MongoAtlas
module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}