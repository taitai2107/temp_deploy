"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, { foreignKey: "groupId" }); //mối quan hệ 1-nhiều/đặt khóa ngoại ở user

      this.belongsToMany(models.role, { through: "groupRole" }); //mối quan hệ nhiều nhiều khóa ngoại ở groupRole
    }
  }
  group.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "group",
      modelName: "group",
    }
  );
  return group;
};
