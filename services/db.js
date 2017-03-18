var pgp = require("pg-promise")();

var db = pgp(process.env.DATABASE_URL);

module.exports = db;
