import Sequelize from 'sequelize';
import sequelize from '../util/dbconnection.js';

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

export default CartItem;