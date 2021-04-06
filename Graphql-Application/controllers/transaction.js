import Transaction from '../models/transaction';
import CryptoCurrency from '../models/cryptocurrency';
import _ from 'lodash';
import { transaction } from '../util/dbconnection';
import User from '../models/user';

export const createTransaction = async (request,response,next) => {

    const cart = await request.session.user.getCart();
    const cryptos = await cart.getCryptos();
    const transaction = await request.session.user.createTransaction({totalPrice:cart.totalPrice,paymentMode:request.params.paymentMode});
    await transaction.addCryptos(_.map(cryptos, (obj) => {
        obj.transactionitem = {quantity:obj.cartitem.quantity};
        return obj;
    }));
    response.json("Transaction Succesful");
};

export const fetchAllTransactions = async (request,response,next) => {

    // const transactions = await request.session.user.getTransactions({include:CryptoCurrency});
    const limit=5;
    let page = parseInt(request.params.page);
    const transactions  = await Transaction.findAndCountAll({where:{userId:request.session.user.id},include:CryptoCurrency,limit:limit,offset:(page-1)*limit});
    const count = transactions["count"];
    const pageLimit = (_.divide(count,5) + 1)
    if(page>pageLimit) {
        page = pageLimit;
        
    }
    response.json(transactions["rows"]);
};