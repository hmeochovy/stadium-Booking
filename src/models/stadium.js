'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stadium extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stadium.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
    // rodeId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stadium',
  });
  return Stadium;
};
// dùng lệnh npx sequelize db:migrate để tạo bảng khi sử dụng sequelize trong database