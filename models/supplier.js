'use strict';

const Brand = require('./brand');
const Category = require('./category');
const Product = require('./product');

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
                // Supplier.hasMany(models.Product, {
                //     foreignKey: 'supplier_id',
                //     constraints: false
                // })
            }
        }
    });

    return Supplier;
};