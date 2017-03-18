"use strict"
var db = require('./db');
var PointModel = require('../models/point');

class PointService {
  constructor() {
  }

  getPointsByTourId(tourId) {
    return new Promise((resolve, reject) => {
      db.any('SELECT * FROM points WHERE tour_id = $<tourId>', { tourId: tourId })
        .then(data => {
          if (data) {
            var allPoints = data.map((p) => new PointModel(p));
            resolve(allPoints.sort((a, b) => a.number < b.number ? -1 : 1));
          } else {
            resolve([]);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

}

module.exports = PointService;
