'use strict';
module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define('Category', {
        name: DataTypes.STRING,
        parent: DataTypes.STRING,
        image_list: DataTypes.JSON,
        sub_category: DataTypes.JSON
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return Category;
};