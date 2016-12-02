'use strict';

var express = require('express');
var router = express.Router();

/* GET home (index) page. */
router.get('/', function(req, res, next) {
  res.send('home page');
  // res.render('index', { title: 'Library Manager' });
});

module.exports = router;
