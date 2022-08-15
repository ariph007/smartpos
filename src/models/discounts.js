'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  discounts.init({
    active: DataTypes.BOOLEAN,
    amount: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    value: DataTypes.FLOAT,
    department1_id: DataTypes.INTEGER,
    department2_id: DataTypes.INTEGER,
    department3_id: DataTypes.INTEGER,
    category1_id: DataTypes.INTEGER,
    category2_id: DataTypes.INTEGER,
    category3_id: DataTypes.INTEGER,
    item1_id: DataTypes.INTEGER,
    item2_id: DataTypes.INTEGER,
    item3_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'discounts',
  });
  return discounts;
};