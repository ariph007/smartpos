'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class departments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.departments.hasOne(models.discounts,{
        foreignKey: "department1_id"
      });
      models.departments.hasOne(models.discounts,{
        foreignKey: "department2_id"
      });
      models.departments.hasOne(models.discounts,{
        foreignKey: "department3_id"
      });
      models.departments.hasMany(models.categories,{
        foreignKey: "department_id"
      });
    }
  }
  departments.init({
    code: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'departments',
  });
  return departments;
};