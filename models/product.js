'use strict';
const Supplier = require('./supplier');
const Brand = require('./brand');
const Category = require('./category');


module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define('Product', {
        supplier_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Supplier,
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: 'id'
            }
        },
        brand_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Brand,
                key: 'id'
            }
        },
        name: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        vat: DataTypes.DOUBLE,
        image_list: DataTypes.JSON
    }, {
        classMethods: {
            associate: function (models) {
                Product.belongsTo(models.Supplier, {
                    foreign_key: 'supplier_id'
                });
            }
        }
    });

    return Product;
};