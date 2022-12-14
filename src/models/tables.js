'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tables.init({
    capacity: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    name: DataTypes.STRING,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tables',
  });
  return tables;
};