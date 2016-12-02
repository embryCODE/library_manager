'use strict';

var express = require('express');
var router = express.Router();

/* GET books page. */
router.get('/', function(req, res, next) {
  res.render('all_loans', { title: 'Loans' });
});

module.exports = router;
