import Sequelize from 'sequelize';
import sequelize from '../dbconnection.js';

const Link = sequelize.define("link",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    url:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
},
{
    name: {
        singular: 'link',
        plural: 'links',
    }
})

export default Link