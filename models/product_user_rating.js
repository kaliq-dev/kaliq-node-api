'use strict'
module.exports = function(sequelize, DataTypes){
    var ProductUserRating = sequelize.define('ProductUserRating',{
        productId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        rating: DataTypes.INTEGER
    });
    return ProductUserRating;
};