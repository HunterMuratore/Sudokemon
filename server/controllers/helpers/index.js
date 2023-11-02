const { User } = require('../../models');

async function isLoggedIn(req, res, next) {
    const user_id = req.session.user_id;

    if(user_id) {
        const user = await User.findById(user_id);
        const login = req.body.login;
        let email;
        let username;
        const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(login);

        if (isEmail) {
            email = login;
        } else {
            username = login;
        }

        if(user.email !== email || user.username !== username) return next();

        return res.json(user);
    }

    next();
}

function isAuthenticated(req, res, next) {
    const user_id = req.session.user_id;

    if(!user_id) return res.status(401).send({
        message: 'Not Authorized'
    });

    next();
}

// Attach the user to the request object
async function authenticate(req, res, next) {
    const user = await User.findById(req.session.user_id);

    req.user = user;

    next();
}

module.exports = { isLoggedIn, isAuthenticated, authenticate }