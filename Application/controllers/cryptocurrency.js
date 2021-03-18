
const CryptoCurrency = require("../models/cryptocurrency");

exports.addCrypto = (request,response,next) => {
    const name = request.body.name;
    const code = request.body.code;

    const crypto = new CryptoCurrency(name,code);
    crypto.save();
    response.status(201).send({"response":"Added Successfully"});
}

exports.getProductByCode = (request,response,next) => {
    const code = request.params.code;
    CryptoCurrency.findByCode(code, crypto => {
        response.send(crypto);
    })
}

exports.getCryptoCurrencies = (request,response,next) => {
    CryptoCurrency.fetchAll(cryptos => {
        let data={cryptos};
        response.send(data);
    })
  
}