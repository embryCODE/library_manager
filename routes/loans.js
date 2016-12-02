'use strict';

var express = require('express');
var router = express.Router();
var Loan = require('../models').Loan;

/* GET loans page. */
router.get('/', function(req, res, next) {
  Loan.findAll({ include: [{ all: true }] }).then(function(loans) {
    res.render('all_loans', {
      loans: loans,
      title: 'Loans'
    });
  });
});

/* GET checked out loans page. */
router.get('/checked_out', function(req, res, next) {

  res.render('checked_loans', {
    title: "Checked Out Loans"
  });

});

/* GET overdue loans page. */
router.get('/overdue', function(req, res, next) {

  res.render('overdue_loans', {
    title: "Overdue Loans"
  });

});

module.exports = router;
