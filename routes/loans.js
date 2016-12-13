'use strict';

var express = require('express');
var router = express.Router();
var moment = require('moment');

var Book = require('../models').Book;
var Loan = require('../models').Loan;
var Patron = require('../models').Patron;

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
  }).catch(function(error) {
    res.send(500, error);
  });
});

/** GET checked out loans page. */
router.get('/checked_out', function(req, res, next) {
  Loan.findAll({
    include: [{
      all: true
    }],
    where: {
      returned_on: {
        $or: ['', null]
      }
    }
  }).then(function(results) {
    res.render('checked_loans', {
      loans: results,
      title: "Checked Out Loans"
    });
  }).catch(function(error) {
    res.send(500, error);
  });
});

/** GET overdue loans page. */
router.get('/overdue', function(req, res, next) {
  Loan.findAll({
    include: [{
      all: true
    }],
    where: {
      return_by: {
        $lt: moment().format('YYYY-MM-DD').toString()
      },
      returned_on: {
        $or: ['', null]
      }
    }
  }).then(function(results) {
    res.render('overdue_loans', {
      loans: results,
      title: "Overdue Loans"
    });
  }).catch(function(error) {
    res.send(500, error);
  });
});

/** GET new loan form page. */
router.get('/new', function(req, res, next) {

  var allBooks, allPatrons;

  Book.findAll().then(function(results) {
    allBooks = results;
  }).then(
    Patron.findAll().then(function(results) {
      allPatrons = results;
    }).then(function() {
      res.render('new_loan', {
        books: allBooks,
        patrons: allPatrons,
        loaned_on: moment().format('YYYY-MM-DD'),
        return_by: moment().add(7, 'days').format('YYYY-MM-DD'),
        title: "New Loan"
      });
    }).catch(function(error) {
      res.send(500, error);
    })
  );
});

/** POST create new loan. */
router.post('/new', function(req, res, next) {
  Loan.create(req.body).then(function(results) {
    res.redirect("/loans/");
  }).catch(function(error) {
    if (error.name === 'SequelizeValidationError') {
      var allBooks, allPatrons;

      Book.findAll().then(function(results) {
        allBooks = results;
      }).then(
        Patron.findAll().then(function(results) {
          allPatrons = results;
        }).then(function() {
          res.render('new_loan', {
            books: allBooks,
            patrons: allPatrons,
            loaned_on: moment().format('YYYY-MM-DD'),
            return_by: moment().add(7, 'days').format('YYYY-MM-DD'),
            title: "New Loan",
            error: error
          });
        }).catch(function(error) {
          res.send(500, error);
        })
      );
    } else {
      res.send(500, error);
    }
  });
});

module.exports = router;
