'use strict';

var express = require('express');
var router = express.Router();
var Book = require('../models').Book;
var Loan = require('../models').Loan;

/* GET books page. */
router.get('/', function(req, res, next) {
  Book.findAll().then(function(results) {
    res.render('all_books', {
      books: results,
      title: 'Books'
    });
  });
});

/* GET checked out books page. */
router.get('/checked_out', function(req, res, next) {
  Book.findAll({
    include: [
      {model: Loan, where: {returned_on: null}}
    ]
  }).then(function(results) {
    res.render('checked_books', {
      books: results,
      title: "Checked Out Books"
    });
  });
});

/* GET overdue books page. */
router.get('/overdue', function(req, res, next) {
  Book.findAll({
    include: [
      {model: Loan, where: {return_by: {$lt: new Date()}}}
    ]
  }).then(function(results) {
    res.render('overdue_books', {
      books: results,
      title: "Overdue Books"
    });
  });
});

module.exports = router;
