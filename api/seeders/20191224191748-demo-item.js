'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items', [{
        name: 'Item 2',
        price: '5',
        description: 'Test 1',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Item 1',
        price: '5',
        description: 'Test 2',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};