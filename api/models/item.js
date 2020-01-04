'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    price:{
      type:DataTypes.STRING,
      defaultValue:false
    },
    description:{
      type:DataTypes.STRING,
      allowNull:false
    },
    userId:{
      type:DataTypes.INTEGER
    }
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.User,{
      foreignKey:'userId',
      as:'user',
      onDelete:'CASCADE'
    })
  };
  return Item;
};