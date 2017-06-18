'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Categories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            parent: {
                type: Sequelize.STRING
            },
            image_list: {
                type: Sequelize.JSON
            },
            sub_category: {
                type: Sequelize.JSON
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
            ,
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
            ;
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Categories');
    }
};
