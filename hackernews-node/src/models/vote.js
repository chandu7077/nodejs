import Sequelize from 'sequelize';
import sequelize from '../dbconnection.js';

const Vote = sequelize.define("vote",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
},
{
    name: {
        singular: 'vote',
        plural: 'votes',
    }
})

export default Vote;