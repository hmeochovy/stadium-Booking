'use strict';
const { QueryInterface, Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (QueryInterface, Sequelize) => {
    // hàm createTable để tạo bảng trong database 
    // statusID: DataTypes.STRING,
    // staffID: DataTypes.STRING,
    // guestID: DataTypes.STRING,
    // date: DataTypes.DATE,
    // timeType: DataTypes.STRING
    await QueryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      time: {
        type: Sequelize.STRING
      },
      nameStadium: {
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
    await queryInterface.dropTable('bookings');
  }
};