"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cars.init(
    {
      NameCar: DataTypes.STRING,
      MperGalon: DataTypes.INTEGER,
      Cylinders: DataTypes.INTEGER,
      Horsepower: DataTypes.INTEGER,
      Weight: DataTypes.INTEGER,
      Acceleration: DataTypes.FLOAT,
      Year: DataTypes.STRING,
      Origin: DataTypes.STRING,
      Code: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "cars",
      modelName: "cars",
    }
  );
  return cars;
};
