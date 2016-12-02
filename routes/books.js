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

module.exports = router;
