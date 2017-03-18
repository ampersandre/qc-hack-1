"use strict"
var db = require('./db');
var TourModel = require('../models/tour');

class TourService {
  constructor() {
  }

  getAllTours() {
    return db.manyOrNone('SELECT * FROM tours', [], t => new TourModel(t));
  }

  getTourById(tourId) {
    return db.one('SELECT * FROM tours WHERE id = $<tourId>', { tourId: tourId }, t => new TourModel(t));
  }

  createTour(tour) {
    return db.one('INSERT INTO tours (name, icon) VALUES $<name>, $<icon> RETURNING id', tour);
  }

  updateTour(tour) {
    return db.none('UPDATE SET name = $<name>, icon = $<icon>, up_votes = $<up_votes>, down_votes = $<down_votes>', tour);
  }

}

module.exports = TourService;
