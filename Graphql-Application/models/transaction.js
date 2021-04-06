import Sequelize from 'sequelize';
import sequelize from '../util/dbconnection.js';

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

export default Transaction;