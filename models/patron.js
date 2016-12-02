'use strict';

module.exports = function(sequelize, DataTypes) {
  var Patron = sequelize.define('Patron', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    library_id: DataTypes.STRING,
    zip_code: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Patron.hasMany(models.Loan, {foreignKey: 'patron_id'});
      }
    },
    timestamps: false
  });
  return Patron;
};
