import Sequelize from "sequelize";
import sequelize from "../dbconnection.js";

const User = sequelize.define("user",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    role:{
        type:Sequelize.STRING,
        allowNull:false,
    }
},
{
    name: {
        singular: 'user',
        plural: 'users',
    }
})

export default User;