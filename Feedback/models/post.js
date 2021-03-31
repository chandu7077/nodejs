import Sequelize from "sequelize";
import sequelize from "../dbconnection.js";

const Post = sequelize.define("post", {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    feedback:{
        type:Sequelize.TEXT,
        allowNull:false
    }

})

export default Post;