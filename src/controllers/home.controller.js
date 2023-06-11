/** @type {import("express").RequestHandler} */
exports.homePage = (req, res) => {
    if(!req.session.user) {
        res.render('index', { user: undefined });
    } else {
        res.render('index', { user: req.session.user });
    }
}

/** @type {import("express").RequestHandler} */
exports.dashboard = (req, res) => {
    console.log(req.session);
    res.render('dashboard', { user: req.session.user });
}


/** @type {import("express").RequestHandler} */
exports.greenHouses = (req, res) => {
    res.render('greenhouse');
}
