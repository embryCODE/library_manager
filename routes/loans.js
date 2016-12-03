'use strict';

var express = require('express');
var router = express.Router();
var Loan = require('../models').Loan;

/** GET loans page. */
router.get('/', function(req, res, next) {
  Loan.findAll({
    include: [{
      all: true
    }]
  }).then(function(results) {
    res.render('all_loans', {
      loans: results,
      title: 'Loans'
    });
  });
});

/** GET checked out loans page. */
router.get('/checked_out', function(req, res, next) {
  Loan.findAll({
    include: [{
      all: true
    }]
  }).then(function(results) {
    res.render('checked_loans', {
      loans: results,
      title: "Checked Out Loans"
    });
  });
});

/** GET overdue loans page. */
router.get('/overdue', function(req, res, next) {
  Loan.findAll({
    include: [{
      all: true
    }]
  }).then(function(results) {
    res.render('overdue_loans', {
      loans: results,
      title: "Overdue Loans"
    });
  });
});

module.exports = router;
