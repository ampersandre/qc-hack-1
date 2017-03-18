"use strict"
var db = require('./db');
var PointModel = require('../models/point');

class PointService {
  constructor() {
  }

  getPointsByTourId(tourId) {
    return db.manyOrNone('SELECT * FROM points WHERE tour_id = $<tourId>', { tourId: tourId }, p => new PointModel(p));
  }

  savePointsForTour(points, tourId) {
    return db.tx(tx => {
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
    });
  }

}

module.exports = PointService;
