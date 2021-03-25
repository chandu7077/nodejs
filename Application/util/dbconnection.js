const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("exchange","root","ep34408",{
    dialect:"mysql",
    host:"localhost",
})

module.exports = sequelize;