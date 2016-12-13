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
  }).catch(function(error) {
    res.send(500, error);
  });
});

/** GET new patron form page. */
router.get('/new', function(req, res, next) {
  res.render('new_patron', {
    title: "New Patron"
  }).catch(function(error) {
    res.send(500, error);
  });
});

/** POST create new patron. */
router.post('/new', function(req, res, next) {
  Patron.create(req.body).then(function(results) {
    res.redirect("/patrons/");
  }).catch(function(error) {
    if (error.name === 'SequelizeValidationError') {
      res.render('new_patron', {
        title: "New Patron",
        error: error
      }).catch(function(error) {
        res.send(500, error);
      });
    } else {
      res.send(500, error);
    }
  });
});

/** GET patron detail page. */
router.get('/:id', function(req, res, next) {
  Patron.findById(req.params.id, {
    include: [{
      model: Loan,
      include: {
        model: Book
      }
    }]
  }).then(function(results) {
    if (results) {
      res.render('patron_detail', {
        patron: results,
        title: results.title
      });
    } else {
      res.sendStatus(404);
    }
  });
});

/** PUT edit patron */
router.put('/:id', function(req, res, next) {
  Patron.findById(req.params.id).then(function(results) {
    if (results) {
      return Patron.update(req.body, {
        where: {
          id: req.params.id
        }
      });
    } else {
      res.send(404);
    }
  }).then(function(results) {
    res.redirect("/patrons/");
  }).catch(function(error) {
    if (error.name === 'SequelizeValidationError') {
      Patron.findById(req.params.id, {
        include: [{
          model: Loan,
          include: {
            model: Book
          }
        }]
      }).then(function(results) {
        if (results) {
          res.render('patron_detail', {
            patron: results,
            title: results.title,
            error: error
          });
        } else {
          res.sendStatus(404);
        }
      });
    } else {
      res.send(500, error);
    }
  });
});

module.exports = router;
