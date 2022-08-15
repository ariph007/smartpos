'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  settings.init({
    companyName: DataTypes.STRING,
    address: DataTypes.STRING,
    logo: DataTypes.STRING,
    phone: DataTypes.STRING,
    rounding: DataTypes.FLOAT,
    serviceChargeRate: DataTypes.FLOAT,
    taxRate: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'settings',
  });
  return settings;
};