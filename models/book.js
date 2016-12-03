'use strict';

module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Author is required"
        }
      }
    },
    genre: {
   type: DataTypes.STRING,
   validate: {
     notEmpty: {
       msg: "Genre is required"
     }
   }
 },
    first_published: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
				Book.hasMany(models.Loan, {foreignKey: 'book_id'});
			}
    },
    timestamps: false
  });
  return Book;
};
