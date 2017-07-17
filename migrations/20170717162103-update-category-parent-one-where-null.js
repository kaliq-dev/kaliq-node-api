'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.query("UPDATE Categories SET parent='1' WHERE parent IS NULL");
    },
    down: function (queryInterface, Sequelize) {}
};
