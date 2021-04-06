import Sequelize from 'sequelize';
import sequelize from '../util/dbconnection.js';

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

export default TransactionItem;