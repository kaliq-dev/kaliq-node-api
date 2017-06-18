'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('Suppliers', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          name: {
              type: Sequelize.STRING
          },
          contact_no: {
              type: Sequelize.STRING
          },
          email: {
              type: Sequelize.STRING
          },
          attachment_list: {
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
      return queryInterface.dropTable('Suppliers');
  }
};
