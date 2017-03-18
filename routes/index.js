"use-strict"
var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('pages/index');
});

router.get('/editor', function(req, res) {
    res.render("pages/editor");
});

router.post('/editor', function(req, res) {
    console.log(req)
});


module.exports = router;