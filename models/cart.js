'use strict';
module.exports = function (sequelize, DataTypes) {
    var Cart = sequelize.define('Cart', {
        user_id: DataTypes.STRING,
        product_list: DataTypes.JSON
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return Cart;
};