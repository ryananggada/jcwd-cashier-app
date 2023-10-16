"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsToMany(models.Product, {
        through: "TransactionItem",
        foreignKey: "transactionId",
      });
    }
  }
  Transaction.init(
    {
      totalPrice: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      transactionDate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
