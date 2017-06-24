'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            supplier_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Suppliers',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            category_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Categories',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            brand_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Brands',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            name: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.DOUBLE
            },
            vat: {
                type: Sequelize.DOUBLE
            },
            image_list: {
                type: Sequelize.JSON
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Products');
    }
};
