"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.group); //mối quan hệ 1-1/đặt khóa ngoại ở User
      this.belongsToMany(models.project, { through: "projectUser" }); //mối quan hệ nhiều nhiều khóa ngoại ở projectUser
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: {
        type: DataTypes.STRING,
        validate: {
          isUnique: async (value) => {
            const existingUser = await User.findOne({
              where: {
                phone: value,
              },
            });
            if (existingUser) {
              // throw new Sequelize.ValidationError("Username must be unique");
              // return { error: "Username must be unique" };
              throw new Error("phone đã tồn tại");
            }
          },
        },
      },
      sex: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isUnique: async (value) => {
            const existingUser = await User.findOne({
              where: {
                email: value,
              },
            });
            if (existingUser) {
              // throw new Sequelize.ValidationError("Username must be unique");
              // return { error: "Username must be unique" };
              throw new Error("email đã tồn tại");
            }
          },
        },
      },

      password: DataTypes.STRING,
      groupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "User",
      modelName: "User",
    }
  );
  return User;
};
