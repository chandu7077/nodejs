import Sequelize from 'sequelize';
import sequelize from '../util/dbconnection.js';

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

export default Cart;