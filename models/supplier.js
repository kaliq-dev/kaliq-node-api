'use strict';
module.exports = function (sequelize, DataTypes) {
    var Supplier = sequelize.define('Supplier', {
        name: DataTypes.STRING,
        contact_no: DataTypes.STRING,
        email: DataTypes.STRING,
        attachment_list: DataTypes.JSON
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return Supplier;
};