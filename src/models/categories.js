'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.categories.hasOne(models.discounts,{
        foreignKey: "category1_id"
      });

      models.categories.hasOne(models.discounts,{
        foreignKey: "category2_id"
      });
      
      models.categories.hasOne(models.discounts,{
        foreignKey: "category3_id"
      });
      
      models.categories.hasMany(models.items,{
        foreignKey: "category_id"
      });
      
      models.categories.belongsTo(models.departments,{
        foreignKey: "department_id"
      });
    }
  }
  categories.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    department_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'categories',
  });
  return categories;
};