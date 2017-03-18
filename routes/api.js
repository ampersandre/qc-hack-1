"use-strict"
var express = require('express');
var router = express.Router();
var TourService = require('../services/tours');
var PointService = require('../services/points');


router.get('/tours', function(req, res) {
  const tourService = new TourService();
  const pointService = new PointService();

  tourService.getAllTours()
    .then(tours => {
      tourPointLookups = tours.map(tour => {
        return new Promise((resolve, reject) => {
          pointService.getPointsByTourId(tour.id)
            .then(points => {
              tour.start_point = points[0];
              resolve(tour);
            });
        });
      });

      Promise.all(tourPointLookups)
        .then(tours => {
          res.json(tours);
        });
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

router.post('/tours/:id/vote_up', function(req, res) {
  const tourId = req.params.id;
  const tourService = new TourService();
  tourService.getTourById(tourId)
    .then(tour => {
      tour.up_votes += 1;
      console.log('voting up', tour);
      tourService.updateTour(tour);
      res.status(200).send();
    });
});
router.post('/tours/:id/vote_down', function(req, res) {
  const tourId = req.params.id;
  const tourService = new TourService();
  tourService.getTourById(tourId)
    .then(tour => {
      tour.down_votes += 1;
      console.log('voting down', tour);
      tourService.updateTour(tour);
      res.status(200).send();
    });
});

module.exports = router;
