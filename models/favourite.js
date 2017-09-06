'use strict'
module.exports = function (sequelize, DataTypes) {
    var Favourite = sequelize.define('Favourite', {
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return Favourite;
};