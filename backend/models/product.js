"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Product.belongsTo(models.category, {
      //   foreignKey: "category",
      //   as: "categoryData",
      // });
    }
  }
  Product.init(
    {
      productName: DataTypes.STRING,
      productPrice: DataTypes.INTEGER,
      productImage: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
