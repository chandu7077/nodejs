
import CryptoCurrency from '../models/cryptocurrency';

export const addCrypto = (request,response,next) => {
    const name = request.body.name;
    const code = request.body.code;
    const description = request.body.description;
    const currentPrice = request.body.currentPrice;
    const closingPrice = request.body.closingPrice;
    const volume = request.body.volume;
    const change = request.body.change;

    const crypto = new CryptoCurrency(name, code, description, currentPrice, closingPrice, volume, change);
    crypto.save();
    response.status(201).send({"response":"Added Successfully"});
};

export const getProductByCode = (request,response,next) => {
    const code = request.params.code;
    CryptoCurrency.findByCode(code, crypto => {
        if(crypto)
        response.status(200).send(crypto);
        else
        response.status(204).send("Cryptocurrency Not Found");
    })
};

export const getCryptoCurrencies = (request,response,next) => {
    CryptoCurrency.fetchAll(cryptos => {
        let data={cryptos};
        response.send(data);
    })
};