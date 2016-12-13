'use strict';

var express = require('express');
var router = express.Router();
var moment = require('moment');

var Book = require('../models').Book;
var Loan = require('../models').Loan;
var Patron = require('../models').Patron;

/** GET books page. */
router.get('/', function(req, res, next) {
  Book.findAll().then(function(results) {
    res.render('all_books', {
      books: results,
      title: 'Books'
    });
  }).catch(function(error) {
    res.send(500, error);
  });
});

/** GET checked out books page. */
router.get('/checked_out', function(req, res, next) {
  Book.findAll({
    include: [{
      model: Loan,
      where: {
        returned_on: {
          $or: ['', null]
        }
      }
    }]
  }).then(function(results) {
    res.render('checked_books', {
      books: results,
      title: "Checked Out Books"
    });
  }).catch(function(error) {
    res.send(500, error);
  });
});

/** GET overdue books page. */
router.get('/overdue', function(req, res, next) {
  Book.findAll({
    include: [{
      model: Loan,
      where: {
        return_by: {
          $lt: moment().format('YYYY-MM-DD')
        },
        returned_on: {
          $or: ['', null]
        }
      }
    }]
  }).then(function(results) {
    res.render('overdue_books', {
      books: results,
      title: "Overdue Books"
    });
  }).catch(function(error) {
    res.send(500, error);
  });
});

/** GET new book form page. */
router.get('/new', function(req, res, next) {
  res.render('new_book', {
    title: "New Book"
  }).catch(function(error) {
    res.send(500, error);
  });
});

/** POST create new book. */
router.post('/new', function(req, res, next) {
  Book.create(req.body).then(function(results) {
    res.redirect("/books/");
  }).catch(function(error) {
    if (error.name === 'SequelizeValidationError') {
      res.render('new_book', {
        title: "New Book",
        error: error
      }).catch(function(error) {
        res.send(500, error);
      });
    } else {
      res.send(500, error);
    }
  });
});

/** GET book detail page */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, {
    include: [{
      model: Loan,
      include: [{
        model: Patron
      }]
    }]
  }).then(function(results) {
    if (results) {
      res.render('book_detail', {
        book: results,
        title: results.title
      });
    } else {
      res.sendStatus(404);
    }
  });
});

/** PUT edit book */
router.put('/:id', function(req, res, next) {
  Book.findById(req.params.id).then(function(results) {
    if (results) {
      return Book.update(req.body, {
        where: {
          id: req.params.id
        }
      });
    } else {
      res.send(404);
    }
  }).then(function(results) {
    res.redirect("/books/");
  }).catch(function(error) {
    Book.findById(req.params.id, {
      include: [{
        model: Loan,
        include: [{
          model: Patron
        }]
      }]
    }).then(function(results) {
      if (results) {
        res.render('book_detail', {
          book: results,
          title: results.title,
          error: error
        });
      } else {
        res.sendStatus(404);
      }
    });
  });
});

/** GET return book form page. */
router.get('/:id/return', function(req, res, next) {
  Loan.findAll({
    include: [{
      model: Book,
      where: {
        id: req.params.id
      },
    }, {
      model: Patron
    }]
  }).then(function(results) {
    res.render('return_book', {
      loan: results[0],
      title: 'Return Book',
      today: moment().format('YYYY-MM-DD')
    });
  });
});

/** PUT return book. */
router.put('/:id/return', function(req, res, next) {

  Loan.update({
    returned_on: req.body.returned_on,
  }, {
    where: {
      book_id: req.params.id
    }
  }).then(function(results) {
    res.redirect('/loans');
  }).catch(function(error) {
    if (error.name === 'SequelizeValidationError') {
      Loan.findAll({
        include: [{
          model: Book,
          where: {
            id: req.params.id
          },
        }, {
          model: Patron
        }]
      }).then(function(results) {
        res.render('return_book', {
          loan: results[0],
          title: 'Return Book',
          today: moment().format('YYYY-MM-DD'),
          error: error
        });
      });
    } else {
      res.send(500, error);
    }
  });
});

module.exports = router;
