'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.employees.hasMany(models.sales_lines,{
        foreignKey: "employee_id"
      });
      models.employees.hasMany(models.sales,{
        foreignKey: "employee_id"
      });
    }
  }
  employees.init({
    active: DataTypes.BOOLEAN,
    jobTitle: DataTypes.STRING,
    joined: DataTypes.DATEONLY,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
		role: DataTypes.ENUM('manager', 'cashier'),

  }, {
    sequelize,
    modelName: 'employees',
  });
  return employees;
};