
import UserModel from './models/user'
import ItemModel from './models/item'
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mydb','root','Metin.234',{
  host:'localhost',
  dialect:'mysql'
})

const User = UserModel(sequelize, Sequelize);
const Item = ItemModel(sequelize,Sequelize);

sequelize.authenticate()
.then(()=>{
  console.log('Connection with sequelize has been established successfully');
})
.catch(err=>{
  console.error('Unable to connect',err)
})

module.exports.User = User;
module.exports.Item = Item;