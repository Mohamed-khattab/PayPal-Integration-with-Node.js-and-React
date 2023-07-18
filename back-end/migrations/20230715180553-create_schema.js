'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('Payment_integrations');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropSchema('Payment_integrations');
  }
};
