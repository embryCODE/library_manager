'use strict';

var express = require('express');
var router = express.Router();

var Book = require('../models').Book;
var Loan = require('../models').Loan;
var Patron = require('../models').Patron;

/** GET patrons page. */
router.get('/', function(req, res, next) {
  Patron.findAll().then(function(patrons) {
    res.render('all_patrons', {
      patrons: patrons,
      title: 'Patrons'
    });
  }).catch(function(error){
      res.send(500, error);
   });
});

/** GET new patron form page. */
router.get('/new', function(req, res, next) {
  res.render('new_patron', {
    title: "New Patron"
  }).catch(function(error){
      res.send(500, error);
   });
});

/** POST create new patron. */
// router.post('/new', function(req, res, next) {
//   Book.create(req.body).then(function(book) {
//     res.redirect("/books/" + book.id);
//   }).catch(function(error){
//       res.send(500, error);
//    });
// });

/** GET patron detail page. */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id).then(function(results) {
    if (results) {
      res.render('patron_detail', {
        patron: results,
        title: results.title
      });
    } else {
      res.sendStatus(404);
    }
  }).catch(function(error){
      res.send(500, error);
   });
});

module.exports = router;
