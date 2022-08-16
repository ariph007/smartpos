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
      models.sales_lines.belongsTo(models.items,{
        foreignkey: "item_id"
      });

      models.sales_lines.belongsTo(models.employees,{
        foreignkey: "employee_id"
      });

      models.sales_lines.belongsTo(models.payment_methods,{
        foreignkey: "paymentMethod_id"
      });

      models.sales_lines.belongsTo(models.discounts,{
        foreignkey: "discount_id"
      });

      models.sales_lines.belongsTo(models.sales,{
        foreignkey: "sales_id"
      });
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