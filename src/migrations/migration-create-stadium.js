'use strict';
const { QueryInterface, Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (QueryInterface, Sequelize) => {
    // address: DataTypes.STRING,
    // description: DataTypes.TEXT,
    // image: DataTypes.STRING
    await QueryInterface.createTable('Stadia', {
      id: {
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      // rodeId: {
      //   type: Sequelize.STRING
      // },
      
      
    })
  },
  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stadia');
  }
};