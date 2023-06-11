const User = require("../models/user");
const { comparePasswords } = require("../utils/password");

/** @type {import("express").RequestHandler} */
exports.login = (req, res) => {
    res.render('login');
}

/** @type {import("express").RequestHandler} */
exports.logUser = (req, res) => {
    const { email, password } = req.body;
    User.getByEmail(email, (err, user) => {
        // TODO handle database error with 500 page
        if(!user[0]){
            res.redirect('/auth/login');
            return
        }
        if(!comparePasswords(password, user[0].password)){
            res.redirect('/auth/login');
            return
        }
        req.session.user = { email: user[0].email, name: user[0].name };
        req.session.save(err => {
            res.redirect('/');
        });

    })
}

/** @type {import("express").RequestHandler} */
exports.signup = (req, res) => {
    res.render('signup');
}

/** @type {import("express").RequestHandler} */
exports.signUser = (req, res) => {
    const { email, password, name } = req.body;
    const usr = new User(email, name, password);
    usr.save();
    res.send('Yay');
}

/** @type {import("express").RequestHandler} */
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}
