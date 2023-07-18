'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING, 
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    roleID: DataTypes.STRING, // xác định là nhân viên, khách hay là admin
    
    // rodeId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
// dùng lệnh npx sequelize db:migrate để tạo bảng khi sử dụng sequelize trong database
//npx sequelize-cli db:seed:all để chạy seeder người dùng fake tra trong sequelize seeder