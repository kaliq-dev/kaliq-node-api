'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            last_logged_in: {
                type: Sequelize.DATE,
                allowNull: false
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
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
        return queryInterface.dropTable('Users');
    }
};
