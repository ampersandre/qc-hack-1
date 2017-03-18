var express = require('express');
var router = express.Router();
var TourModel = require('../models/tour');


router.get('/tours', function(req, res) {
  var tours = [
    new TourModel({
      name: 'Test',
      icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png',
      up_votes: 17,
      down_votes: 3,
      points: [{ lat: 50.455594, lng: -104.608749 }],
    })
  ];

  res.json(tours);
});

module.exports = router;
