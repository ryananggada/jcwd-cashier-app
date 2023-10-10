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
      User.hasOne(models.Cart, {
        foreignKey: "userId",
        as: "cartData",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "cashier"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
