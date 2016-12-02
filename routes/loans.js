'use strict';

var express = require('express');
var router = express.Router();
var Loan = require('../models/index').Loan;

/* GET loans page. */
router.get('/', function(req, res, next) {
  Loan.findAll().then(function(loans) {
    res.render('all_loans', { loans: loans, title: 'Loans' });
  });
});

module.exports = router;
