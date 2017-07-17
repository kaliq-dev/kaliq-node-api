'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return [
            queryInterface.changeColumn(
                'Categories',
                'parent',
                {
                    type: Sequelize.STRING,
                    allowNull: false,
                    defaultValue: 1
                }
            ),

            queryInterface.changeColumn(
                'Categories',
                'name',
                {
                    type: Sequelize.STRING,
                    allowNull: false,
                    defaultValue: ""
                }
            )
        ]
    },

    down: function (queryInterface, Sequelize) {

    }
};
