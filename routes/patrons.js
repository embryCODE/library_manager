'use strict';

var express = require('express');
var router = express.Router();
var Patron = require('../models/index').Patron;

/* GET patrons page. */
router.get('/', function(req, res, next) {
  Patron.findAll().then(function(patrons) {
    res.render('all_patrons', { patrons: patrons, title: 'Patrons' });
  });
});

module.exports = router;
