'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  items.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    openPrice: DataTypes.BOOLEAN,
    price1: DataTypes.DOUBLE,
    price2: DataTypes.DOUBLE,
    price3: DataTypes.DOUBLE,
    purchased: DataTypes.BOOLEAN,
    purchasedToInventoryConversion: DataTypes.FLOAT,
    purchasePrice: DataTypes.FLOAT,
    purchaseUom: DataTypes.STRING,
    recipeUom: DataTypes.STRING,
    averageCost: DataTypes.FLOAT,
    barcode: DataTypes.STRING,
    serviceCharge: DataTypes.BOOLEAN,
    tax: DataTypes.BOOLEAN,
    category_id: DataTypes.INTEGER,
    salesWarehouse_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'items',
  });
  return items;
};