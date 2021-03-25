const Sequelize = require("sequelize");

const sequelize = require("../util/dbconnection");

const CartItem = sequelize.define("cartitem", {
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
        singular: 'cartitem',
        plural: 'cartitems',
    }
});

module.exports = CartItem;