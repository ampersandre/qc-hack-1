"use strict"
var db = require('./db');
var PointModel = require('../models/point');
var pgp = db.$config.pgp;

var csPoints = new pgp.helpers.ColumnSet(['name', 'number', 'icon', 'lat', 'lng', 'tour_id'], {table : 'points'});

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
      if(points.length) {
        var insert = pgp.helpers.insert(points, csPoints) + 'RETURNING *';
        batchCommands.push(tx.many(insert));
      }
      return tx.batch(batchCommands);
    });
  }

}

module.exports = PointService;
