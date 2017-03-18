"use-strict"
var express = require('express');
var bodyParser = require('body-parser');
var Tour = require('../models/tour');
var Point = require('../models/point');
var TourService = require('../services/tours');

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
    // get it 
    var t = new Tour({ name: "test", points: [] });
    res.render("pages/editor", t);

    router.get('/tourlist', function(req, res) {
        const tourService = new TourService();

        tourService.getAllToursAndPoints()
            .then(tours => {
                res.render('pages/tourlist', { tours: tours });
            });
    });

});

router.post('/editor', urlencodedParser, function(req, res) {
    var results = req.body;
    var t = {};
    if (results.id) {
        // do an update
        t = formDataToModel(results);
        // update
    } else {
        // do a create
        t = formDataToModel(results);
        TourServ.createTour(t).then(function(id) {
            PointServ.savePointsForTour(t.points, id);
        });
    }
    res.render("pages/editor", t);
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
        name: results.name,
        icon: results.imageUrl,
        points: points
    });
    return t;
}

module.exports = router;