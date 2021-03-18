
const CryptoCurrency = require("../models/cryptocurrency");

exports.addCrypto = (request,response,next) => {
    const name = request.body.name;
    const code = request.body.code;

    const crypto = new CryptoCurrency(name,code);
    crypto.save();
    response.status(201).send({"response":"Added Successfully"});
}

exports.getCryptoCurrencies = (request,response,next) => {
    let cryptos = CryptoCurrency.fetchAll()
    let data={cryptos};
    response.send(data);
}