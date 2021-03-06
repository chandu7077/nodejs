const Sequelize = require("sequelize");

const sequelize = require("../util/dbconnection");

const Cart = sequelize.define("cart", {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    totalPrice:{
        type:Sequelize.DOUBLE
    }
},
{
    name: {
        singular: 'cart',
        plural: 'carts',
    }
}
);

module.exports = Cart;