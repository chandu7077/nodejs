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
    response.send("Transaction Succesful");
}

exports.fetchAllTransactions  = async (request,response,next) => {

    const transactions = await request.session.user.getTransactions({include:CryptoCurrency});
    response.json(transactions);
}