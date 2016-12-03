'use strict';

module.exports = function(sequelize, DataTypes) {
  var Patron = sequelize.define('Patron', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "First Name is required"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Last Name is required"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Address is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Email is required"
        }
      }
    },
    library_id: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Library ID is required"
        }
      }
    },
    zip_code: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Zip Code is required"
        }
      }
    },
  }, {
    classMethods: {
      associate: function(models) {
        Patron.hasMany(models.Loan, {
          foreignKey: 'patron_id'
        });
      }
    },
    timestamps: false
  });
  return Patron;
};
