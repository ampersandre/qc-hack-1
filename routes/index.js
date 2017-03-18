"use-strict"
var express = require('express');
var bodyParser = require('body-parser');
var Tour = require('../models/tour');
var Point = require('../models/point');
var TourService = require('../services/tours');
var PointService = require("../services/points");

var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

router.get('/', function(req, res) {
    res.render('pages/index');
});

router.get('/create', function(req, res) {
    res.render("pages/editor", new Tour({}));
});

router.get('/editor/:id', function(req, res) {
    const tourService = new TourService();
    var t = tourService.getTourAndPointsById(req.params.id).then(function(tour) {
        res.render("pages/editor", tour);
    });
});

router.get('/tourlist', function(req, res) {
    const tourService = new TourService();

    tourService.getAllToursAndPoints()
        .then(tours => {
            res.render('pages/tourlist', { tours: tours });
        });
});

router.post('/editor', urlencodedParser, function(req, res) {
    var results = req.body;
    var t = {};
    var tourService = new TourService();
    var pointService = new PointService();
    if (results.id) {
        // do an update
        t = formDataToModel(results);
        var tourService = new TourService();
        tourService.updateTour(t).then(function() {
            pointService.savePointsForTour(t.points, t.id).then(function() {
                res.redirect("/editor/" + t.id);
            });
        });
    } else {
        // do a create
        t = formDataToModel(results);
        tourService.createTour(t).then(function(id) {
            pointService.savePointsForTour(t.points, id).then(function() {
                res.redirect("/editor/" + t.id);
            });
        });
    }
    res.render("pages/editor-fail", t);
});

function formDataToModel(results) {
    var points = [];
    for (var pIdx in results.points) {
        var pointFromForm = results.points[pIdx];
        var result = pointFromForm.split(',').map(function(x) {
            return parseFloat(x);
        });
        // we get an array of lat first then long second
        points.push(new Point({
            lat: result[0],
            lng: result[1]
        }));
    }
    t = new Tour({
        id: results.id,
        name: results.name,
        icon: results.imageUrl,
        points: points
    });
    return t;
}

module.exports = router;