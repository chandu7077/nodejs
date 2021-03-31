import Cart from '../models/cart';
import CryptoCurrency from '../models/cryptocurrency';

export const addCryptoToCart = (request,response,next) => {

    const code = request.body.code;
    const quantity = request.body.quantity;
    CryptoCurrency.findByCode(code, crypto => {
        Cart.addCryptoToCart(code, quantity, crypto.currentPrice, respMsg => {
            response.send(respMsg);
        });
    })
};

export const deleteByCode = (request,response,next) => {
    const code = request.params.code;
    Cart.deleteByCode(code, msg => {
        response.send(msg);
    });
};

export const getCart = (request,response,next) => {
    Cart.fetchAll(cart => {
        response.send(cart);
    })
    
};