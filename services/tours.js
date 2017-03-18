"use strict"
var db = require('./db');
var TourModel = require('../models/tour');

class TourService {
  constructor() {
  }

  getAllTours() {
    return new Promise((resolve, reject) => {
      db.any('SELECT * FROM tours')
        .then(data => {
          var allTours = data.map((t) => new TourModel(t));
          resolve(allTours);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getTourById(tourId) {
    return new Promise((resolve, reject) => {
      db.any('SELECT * FROM tours WHERE id = $<tourId>', { tourId: tourId })
        .then(data => {
          var tour = new TourModel(data[0]);
          resolve(tour);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

}

module.exports = TourService;
