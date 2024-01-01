"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  account.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUnique: async (value) => {
            const existingUser = await account.findOne({
              where: {
                username: value,
              },
            });
            if (existingUser) {
              // throw new Sequelize.ValidationError("Username must be unique");
              // return { error: "Username must be unique" };
              throw new Error("đã có");
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        // validate: {
        //   // len: {
        //   //   args: [8, undefined], // Độ dài tối thiểu là 3 ký tự
        //   //   msg: "String length is not in this range",
        //   // },
        //   // isEmail: {
        //   //   args: true,
        //   //   msg: "not a email",
        //   // },
        // },
      },
    },
    {
      sequelize,
      tableName: "account",
      modelName: "account",
    }
  );
  return account;
};
