"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  service.init(
    {
      TenDichVu: DataTypes.STRING,
      Mota: DataTypes.STRING,
      Gia: DataTypes.INTEGER,
      Img: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "service",
      modelName: "service",
    }
  );
  return service;
};
