const Cart = require("../models/cart");
const CryptoCurrency = require("../models/cryptocurrency");
var _ = require('lodash');

exports.addCryptoToCart = async (request,response,next) => {
    const cart = await request.session.user.getCart();
    // console.log(request.session);
    const cryptos = await cart.getCryptos();
    const code = request.body.code;
    let quantity = parseInt( request.body.quantity);
    let crypto = await cryptos.find(obj => obj.code === code);

    if(crypto) {
        console.log(crypto);
        cart.totalPrice = parseFloat( cart.totalPrice +  crypto.currentPrice * quantity);
        quantity = crypto.cartitem.quantity + quantity;
        await cart.addCrypto(crypto,{through:{quantity:quantity}});
        await cart.update({totalPrice:cart.totalPrice});
        response.send("Added Successfully");
    }

    else {
        crypto = await CryptoCurrency.findOne({where:{code:code}});
        cart.totalPrice = parseFloat( cart.totalPrice +  crypto.currentPrice * quantity);
        await cart.update({totalPrice:cart.totalPrice});
        await cart.addCrypto(crypto,{through:{quantity:quantity}});
        response.send("Added Successfully");
    }
}

exports.deleteByCode =  async (request,response,next) => {
    const cart = await request.user.getCart();
    const cryptos = await cart.getCryptos();
    const code = request.params.code;
    let crypto = await cryptos.find(obj => _.isEqual(obj.code,code));
    const quantity = crypto.cartitem.quantity;
    cart.totalPrice = parseFloat(cart.totalPrice - crypto.currentPrice * quantity);
    await crypto.cartitem.destroy();
    await cart.save();
    response.send("Deleted Successfully");
}

exports.getCart = async (request,response,next) => {
    console.log(request.user);
    const cart = await request.session.user.getCart({include:CryptoCurrency});
    const cryptos = await cart.getCryptos();
    if(cart)
    response.send(cart);
    else
    response.status(204).send("Not Found");
}