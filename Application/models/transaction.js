const Sequelize = require("sequelize");

const sequelize = require("../util/dbconnection");

const Transaction = sequelize.define("transaction", {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    totalPrice:{
        type:Sequelize.DOUBLE
    },
    paymentMode:{
        type:Sequelize.STRING
    }
},
{
    name: {
        singular: 'transaction',
        plural: 'transactions',
    }
}
);

module.exports = Transaction;