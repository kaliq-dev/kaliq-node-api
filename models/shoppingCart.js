'use strict';
module.exports = function (sequelize, DataTypes) {
    var ShoppingCart = sequelize.define('ShoppingCart', {
        userId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return ShoppingCart;
};