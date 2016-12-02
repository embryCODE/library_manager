'use strict';

var express = require('express');
var router = express.Router();
var Book = require('../models/index').Book;

/* GET books page. */
router.get('/', function(req, res, next) {
  Book.findAll().then(function(books) {
    res.render('all_books', { books: books, title: 'Books' });
  });
});

/* GET checked out books page. */
router.get('/checked_out', function(req, res, next) {

    res.render('checked_books', { title: "Checked Out Books"});

});

/* GET overdue books page. */
router.get('/overdue', function(req, res, next) {

    res.render('overdue_books', { title: "Overdue Books"});

});

module.exports = router;
