'use strict';

var express = require('express');
var router = express.Router();

/* GET books page. */
router.get('/', function(req, res, next) {
  res.render('all_patrons', { title: 'Patrons' });
});

module.exports = router;
