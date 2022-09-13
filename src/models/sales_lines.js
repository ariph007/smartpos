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
        foreignkey: "item_id",
      });

      models.sales_lines.belongsTo(models.employees,{
        foreignkey: "employee_id"
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
    created: DataTypes.STRING,
    description: DataTypes.STRING,
    discountAmount: DataTypes.DOUBLE,
    discountName: DataTypes.STRING,
    serviceCharge: DataTypes.DOUBLE,
    unitPrice: DataTypes.DOUBLE,
    itemId: {
      type: DataTypes.INTEGER,
      field: 'item_id',
      references: {
        model: 'items',
        key: 'id'
      }
    },
    quantity: DataTypes.INTEGER,
    employeeId: {
      type: DataTypes.INTEGER,
      field: 'employee_id',
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    discountId:{
      type: DataTypes.INTEGER,
      field: 'discount_id',
      references: {
        model: 'discounts',
        key: 'id'
      }
    },
    saleId: {
      type: DataTypes.INTEGER,
      field: 'sales_id',
      references: {
        model: 'sales',
        key: 'id'
      }
    },
    index: DataTypes.INTEGER,
    tax: DataTypes.DOUBLE,
    totalPrice: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'sales_lines'
    
  });
  return sales_lines;
};