'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class warehouses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.warehouses.hasMany(models.stocks,{
        foreignKey: "warehouse_id"
      });
      models.warehouses.hasMany(models.items,{
        foreignKey: "salesWarehouse_id"
      });
    }
  }
  warehouses.init({
    active: DataTypes.BOOLEAN,
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'warehouses',
  });
  return warehouses;
};