const Transaction = require("../models/transaction");
const CryptoCurrency = require("../models/cryptocurrency");
var _ = require('lodash');
const { transaction } = require("../util/dbconnection");
const User = require("../models/user");

exports.createTransaction = async (request,response,next) => {

    const cart = await request.session.user.getCart();
    const cryptos = await cart.getCryptos();
    const transaction = await request.session.user.createTransaction({totalPrice:cart.totalPrice,paymentMode:request.params.paymentMode});
    await transaction.addCryptos(_.map(cryptos, (obj) => {
        obj.transactionitem = {quantity:obj.cartitem.quantity};
        return obj;
    }));
    response.json("Transaction Succesful");
}

exports.fetchAllTransactions  = async (request,response,next) => {

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
}