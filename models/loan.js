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
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "Loaned On date is required"
        }
      }
    },
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "Return By date is required"
        }
      }
    },
    returned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: 'A valid "Returned On" date must be entered.'
        }
      }
    }
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
