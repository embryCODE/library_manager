'use strict';
module.exports = function(sequelize, DataTypes) {
  var Loan = sequelize.define('Loan', {
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: DataTypes.DATE,
    return_by: DataTypes.DATE,
    returned_on: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return Loan;
};
