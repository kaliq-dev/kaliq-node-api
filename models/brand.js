'use strict';
module.exports = function (sequelize, DataTypes) {
    var Brand = sequelize.define('Brand', {
        name: DataTypes.STRING,
        image_list: DataTypes.JSON
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return Brand;
};