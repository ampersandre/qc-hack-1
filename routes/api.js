var express = require('express');
var router = express.Router();
var TourService = require('../services/tours');


router.get('/tours', function(req, res) {
  var tourService = new TourService();

  tourService.getAllTours()
    .then(tours => {
      res.json(tours);
    });
});

module.exports = router;
