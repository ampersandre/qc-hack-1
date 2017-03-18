"use strict"
var db = require('./db');
var TourModel = require('../models/tour');
var PointService = require('./points');

class TourService {
  constructor() {
  }

  getAllToursAndPoints() {
    var self = this;
    var pointService = new PointService();

    return new Promise((resolve, reject) => {
      self.getAllTours()
        .then(tours => {
          var tourPointLookups = tours.map(tour => {
            return new Promise((resolve, reject) => {
              pointService.getPointsByTourId(tour.id)
                .then(points => {
                  tour.points = points;
                  resolve(tour);
                }).catch(reject);
            })
          });

          Promise.all(tourPointLookups).then(resolve).catch(reject);
        });
      });
  }

  getAllTours() {
    return db.map('SELECT * FROM tours ORDER BY id', [], t => new TourModel(t));
  }

  getTourAndPointsById(tourId) {
    var self = this;
    var pointService = new PointService();
    return new Promise((resolve, reject) => {
      self.getTourById(tourId).then(tour => {
        pointService.getPointsByTourId(tourId)
          .then(points => {
            tour.points = points;
            resolve(tour);
          }).catch(reject);
      }).catch(reject);
    });
  }

  getTourById(tourId) {
    return db.one('SELECT * FROM tours WHERE id = $<tourId>', { tourId: tourId }, t => new TourModel(t));
  }

  createTour(tour) {
    return db.one('INSERT INTO tours (name, icon) VALUES $<name>, $<icon> RETURNING id', tour);
  }

  updateTour(tour) {
    return db.none('UPDATE tours SET name = $<name>, icon = $<icon>, up_votes = $<up_votes>, down_votes = $<down_votes> WHERE id = $<id>', tour);
  }

}

module.exports = TourService;
