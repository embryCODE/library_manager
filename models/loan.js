'use strict';

module.exports = function(sequelize, DataTypes) {
  var Loan = sequelize.define('Loan', {
    book_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Book ID is required"
        }
      }
    },
    patron_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Patron ID is required"
        }
      }
    },
    loaned_on: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: "Loaned On Date is required"
        }
      }
    },
    return_by: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: "Return By Date is required"
        }
      }
    },
    returned_on: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Loan.belongsTo(models.Patron, {
          foreignKey: 'patron_id'
        });
        Loan.belongsTo(models.Book, {
          foreignKey: 'book_id'
        });
      }
    },
    timestamps: false
  });
  return Loan;
};
