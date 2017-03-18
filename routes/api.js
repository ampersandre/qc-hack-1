"use-strict"
var express = require('express');
var router = express.Router();
var TourService = require('../services/tours');
var PointService = require('../services/points');


router.get('/tours', function(req, res) {
  const tourService = new TourService();

  tourService.getAllTours()
    .then(tours => {
      res.json(tours);
    });
});

router.get('/tours/:id', function(req, res) {
  const tourId = req.params.id;
  const tourService = new TourService();
  const pointService = new PointService();

  tourService.getTourById(tourId)
    .then(tour => {
      if (tour) {
        pointService.getPointsByTourId(tourId)
          .then(points => {
            tour.points = points;
            res.json(tour);
          });
      } else {
        res.status(404).send();
      }
    });
});

module.exports = router;
