var pgp = require('pg-promise')();
var TourModel = require('../models/tour');

class TourService {
  constructor() {
  }

  getAllTours() {
    return new Promise((resolve, reject) => {
      var db = pgp(process.env.DATABASE_URL);
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

}

module.exports = TourService;
