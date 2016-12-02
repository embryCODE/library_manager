'use strict';

var express = require('express');
var router = express.Router();

/* GET books page. */
router.get('/books', function(req, res, next) {
  res.send('books page');
  // res.render('index', { title: 'Books' });
});

module.exports = router;
