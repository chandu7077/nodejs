const Cart = require("../models/cart");
const CryptoCurrency = require("../models/cryptocurrency");

exports.addCryptoToCart = (request,response,next) => {

    const code = request.body.code;
    const quantity = request.body.quantity;
    CryptoCurrency.findByCode(code, crypto => {
        Cart.addCryptoToCart(code, quantity, crypto.currentPrice, respMsg => {
            response.send(respMsg);
        });
    })
}

exports.deleteByCode =  (request,response,next) => {
    const code = request.params.code;
    Cart.deleteByCode(code, msg => {
        response.send(msg);
    });
}

exports.getCart = (request,response,next) => {
    Cart.fetchAll(cart => {
        response.send(cart);
    })
    
}