'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.sales.hasOne(models.sales_lines,{
        foreignKey: "sales_id"
      });

      models.sales.belongsTo(models.invoices,{
        foreignKey: "invoice_id"
      });
    }
  }
  sales.init({
    closedTime: DataTypes.DATE,
    created: DataTypes.DATE,
    CustomerName: DataTypes.STRING,
    discountAmount: DataTypes.DOUBLE,
    extraCharge: DataTypes.DOUBLE,
    rounding: DataTypes.BOOLEAN,
    subtotal: DataTypes.DOUBLE,
    total: DataTypes.DOUBLE,
    invoice_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sales',
  });
  return sales;
};