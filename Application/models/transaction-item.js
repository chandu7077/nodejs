const Sequelize = require("sequelize");

const sequelize = require("../util/dbconnection");

const TransactionItem = sequelize.define("transactionitem", {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    quantity:{
        type:Sequelize.INTEGER,
        default:1
    }

},
{
    name: {
        singular: 'transactionitem',
        plural: 'transactionitems',
    }
});

module.exports = TransactionItem;