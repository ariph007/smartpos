'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sales_lines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sales_lines.init({
    amount: DataTypes.DOUBLE,
    created: DataTypes.DATE,
    description: DataTypes.STRING,
    discountAmount: DataTypes.DOUBLE,
    discountName: DataTypes.STRING,
    discountValue: DataTypes.FLOAT,
    unitPrice: DataTypes.DOUBLE,
    item_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER,
    discount_id: DataTypes.INTEGER,
    paymentMethod_id: DataTypes.INTEGER,
    sales_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sales_lines',
  });
  return sales_lines;
};