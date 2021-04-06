const {Sequelize} = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE,process.env.USERNAME,process.env.PASSWORD,{
    dialect:"mysql",
    host:"0.tcp.ngrok.io",
    port:15853
})

module.exports = sequelize;