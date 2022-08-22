'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment_methods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.payment_methods.hasMany(models.sales,{
        foreignKey: "paymentMethod_id"
      });
    }
  }
  payment_methods.init({
    active: DataTypes.BOOLEAN,
    additionalCharge: DataTypes.FLOAT,
    noSales: DataTypes.BOOLEAN,
    noTax: DataTypes.BOOLEAN,
    noServiceCharge: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'payment_methods',
  });
  return payment_methods;
};