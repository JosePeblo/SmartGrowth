const Greenhouse = require("../models/greenhouse");
const Logs = require("../models/logs");
const UserGreenhouse = require("../models/userGreenhouse");

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
    res.render('dashboard', { user: req.session.user, greenhouses: req.session.greenhouses });
}


/** @type {import("express").RequestHandler} */
exports.greenHouses = (req, res) => {
    let succ = false;
    if(!req.session.greenhouses){
        res.redirect('/dashboard');
        return; 
    }
    req.session.greenhouses.forEach(elem => {
        if(elem.id === req.params.id){
            res.render('greenhouse', { user: req.session.user, greenhouse: elem });
            succ = true;
            return;
        }
    });
    if(succ === false){
        res.redirect('/dashboard');
        return; 
    }
}

/** @type {import("express").RequestHandler} */
exports.sensorData = (req, res) => {
    Logs.getGreenhouseReadings(req.query.q, (err, rows) => {
        const resobj = {}
        rows.forEach(elem => {
            if(!resobj[elem.time]){
                resobj[elem.time] = {};
            }
            resobj[elem.time][elem.senoract] = elem.reading;
        });
        res.json(resobj);
    });

}
