"use-strict"
var express = require('express');
var bodyParser = require('body-parser');
var Tour = require('../models/tour');
var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

router.get('/', function(req, res) {
    res.render('pages/index');
});

router.get('/editor', function(req, res) {
    res.render("pages/editor");
});

router.post('/editor', urlencodedParser, function(req, res) {
    var results = req.body;
    t = new Tour({
        name: results.name,
        icon: results.icon,
        points: {}
    });

    // do the thing that creates stuff
    res.render("pages/editor-success", t);
});


module.exports = router;