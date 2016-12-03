'use strict';

module.exports = function(sequelize, DataTypes) {
  var Patron = sequelize.define('Patron', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "First name is required"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Last name is required"
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
        isEmail: {
          msg: "A valid email address is required"
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
          msg: "Zip code is required"
        },
        len: {
          args: [5],
          msg: "A valid zip code is required"
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
