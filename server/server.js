const express = require('express');
const session = require('express-session');

const api_routes = require('./controllers');

require('dotenv').config();

const db = require('./config/db');

const app = express();

const PORT = process.env.PORT || 3333;

// Load JSON Middleware
app.use(express.json());

// Load Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: true
    }
}));

// Load in api routes
app.use('/', api_routes);

// Catch any unknown routes and throw a 404 custom page
app.get('*', (req, res) => {
    // res.render('/error');
    res.status(404).send({
        message: 'That route is incorrect',
        error: 404
    });
});

db.on('open', () => {
    console.log('Database Connected!');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
