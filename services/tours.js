"use strict"
var db = require('./db');
var TourModel = require('../models/tour');

class TourService {
  constructor() {
  }

  getAllTours() {
    return new Promise((resolve, reject) => {
      db.any('SELECT * FROM tours')
        .then(rows => {
          var allTours = rows.map((t) => new TourModel(t));
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
        .then(rows => {
          var tour = new TourModel(rows[0]);
          resolve(tour);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  createTour(tour) {
    return new Promise((resolve, reject) => {
      db.any('INSERT INTO tours (name, icon) VALUES $<name>, $<icon> RETURNING id',
        tour)
        .then(resolve);
    });
  }

  updateTour(tour) {
    return new Promise((resolve, reject) => {
      db.any('UPDATE SET name = $<name>, icon = $<icon>, up_votes = $<up_votes>, down_votes = $<down_votes>',
        tour)
        .then(resolve);
    });
  }

}

module.exports = TourService;
