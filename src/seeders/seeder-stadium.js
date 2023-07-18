'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stadiums', [{
        name: 'old Trafford stadium',
        address: 'manchester',
        description: 'the theatre of dream',
        image : 'https://www.usatoday.com/story/sports/soccer/2017/01/25/manchester-united-old-trafford-largest-stadium-england/97032978/', 
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
    return queryInterface.bulkDelete('Stadiums', null, {});
  }
};
