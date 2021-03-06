"use-strict"
var express = require('express');
var router = express.Router();
var TourService = require('../services/tours');


router.get('/tours', function(req, res) {
  const tourService = new TourService();

  tourService.getAllToursAndPoints()
    .then(tours => {
      tours.forEach(t => {
        t.start_point = t.points[0];
        t.points = undefined;
      })
      res.json(tours);
    });
});

router.get('/tours/:id', function(req, res) {
  const tourId = req.params.id;
  const tourService = new TourService();

  tourService.getTourAndPointsById(tourId)
    .then(tour => {
      res.json(tour);
    });
});

router.post('/tours/:id/vote_up', function(req, res) {
  const tourId = req.params.id;
  const tourService = new TourService();
  tourService.getTourById(tourId)
    .then(tour => {
      tour.up_votes += 1;
      console.log('voting up', tour);
      tourService.updateTour(tour).then(() => {
        res.status(200).send();
      });
    });
});
router.post('/tours/:id/vote_down', function(req, res) {
  const tourId = req.params.id;
  const tourService = new TourService();
  tourService.getTourById(tourId)
    .then(tour => {
      tour.down_votes += 1;
      console.log('voting down', tour);
      tourService.updateTour(tour).then(() => {
        res.status(200).send();
      });
    });
});

module.exports = router;
