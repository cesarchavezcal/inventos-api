// 📕 Glossary
const glossary = require('./glossary/');
// 📦 Dependencies
const express = require('express');

// ======= Functions
// ⚙️ Defining express app
const app = express();
// Using body parser to read json data
app.use(express.json({
    extended: true,
}));
// ⚙️ Connecting to Database
const connectDatabase = require('./database/config');
connectDatabase().then(() => {
    console.log(glossary.english.server.database);
});

// ⚙️ Starting server
const PORT = process.env.PORT || 4000;

// Defining Routes
app.use('/api/users', require('./routes/users/'));
app.use('/api/auth', require('./routes/auth/'));
app.use('/api/business', require('./routes/business/'));

app.listen(PORT, () => {
    console.log(glossary.english.server.running);
});