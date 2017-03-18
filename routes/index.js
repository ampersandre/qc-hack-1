var express = require('express');
var router = express.Router();

// Car brands page
router.get('/', function(req, res) {
  res.render('pages/index');
});

module.exports = router;
