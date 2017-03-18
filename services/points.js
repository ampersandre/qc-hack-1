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

  savePointsForTour(points, tourId) {
    return new Promise((resolve, reject) => {
      db.tx(tx => {
        var batchCommands = [
          tx.none(`DELETE FROM points WHERE tour_id = $<tour_id>`, { tour_id: tourId })
        ];
        for (var i = 0; i < points.length; i++) {
          batchCommands.push(tx.none(`INSERT INTO points (name, number, icon, lat, lng, tour_id)
                  VALUES $<name>, $<number>, $<icon>, $<lat>, $<lng>, $<tour_id>
                  RETURNING id`,
            point));
        }
        return tx.batch(batchCommands);
      }).then(data => {
        resolve(data);
      });
    });
  }


}

module.exports = PointService;
