'use strict';
module.exports = function (sequelize, DataTypes) {
    var CartItem = sequelize.define('CartItem', {
       productId: DataTypes.INTEGER,
       quantity: DataTypes.INTEGER,
       shoppingCartId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return CartItem;
};