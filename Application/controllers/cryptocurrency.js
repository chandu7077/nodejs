
const CryptoCurrency = require("../models/cryptocurrency");

exports.addCrypto = (request,response,next) => {
    const name = request.body.name;
    const code = request.body.code;
    const description = request.body.description;
    const currentPrice = request.body.currentPrice;
    const closingPrice = request.body.closingPrice;
    const volume = request.body.volume;
    const change = request.body.change;

    const crypto = new CryptoCurrency(name, code, description, currentPrice, closingPrice, volume, change);
    crypto.save()
    .then(()=> {
        response.status(201).send({"response":"Added Successfully"});
    })
    .catch(err=> {
        console.log(err);
    });
    
}

exports.getCryptoByCode = (request,response,next) => {
    const code = request.params.code;
    CryptoCurrency.findByCode(code).then(([cryptos, fieldData]) => {
        crypto = cryptos[0];
        if(crypto)
        response.status(200).send(crypto);
        else
        response.status(204).send("Cryptocurrency Not Found");
    });
}

exports.getCryptoCurrencies = (request,response,next) => {
    CryptoCurrency.fetchAll().then( ([cryptos, fieldData]) => {
        response.send(cryptos);
    })
}