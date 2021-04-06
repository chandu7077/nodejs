import Sequelize from 'sequelize';
import sequelize from '../util/dbconnection.js';

const CryptoCurrency = sequelize.define("cryptocurrency", {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    code:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    description:{
        type:Sequelize.TEXT,
        allowNull:true,
    },
    currentPrice: {
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    closingPrice: {
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    volume:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    change:{
        type:Sequelize.STRING,
        allowNull:false,
    }
},
{
    name: {
        singular: 'crypto',
        plural: 'cryptos',
    }
}
)

export default CryptoCurrency;