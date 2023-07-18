'use strict';

// firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     password: DataTypes.STRING,
//     email: DataTypes.STRING,
//     address: DataTypes.STRING, 
//     gender: DataTypes.BOOLEAN,
// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        email: 'admin@gmail.com',
        password: '123456', //hast pastword de bao mat
        firstName: 'hmeo',
        lastName: 'chovy',
        address: 'vinh',
        gender: 1,
        typeRole: 'ROLE', // xác định là nhân viên, khách hay là admin
        keyRole: 'R1',
        createdAt: new Date(),
        updatedAt: new Date()
        
        
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
