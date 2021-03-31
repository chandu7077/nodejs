
const CryptoCurrency = require("../models/cryptocurrency");
const { validationResult } = require('express-validator');
const sock = require("../socket");
const _ = require("lodash");

exports.addCrypto = (request,response,next) => {
    const name = request.body.name;
    const code = request.body.code;
    const description = request.body.description;
    const currentPrice = request.body.currentPrice;
    const closingPrice = request.body.closingPrice;
    const volume = request.body.volume;
    const change = request.body.change;

    CryptoCurrency.create({
        name, code, description, currentPrice, closingPrice, volume, change}
    )
    .then(()=> {
        response.status(201).send({"response":"Added Successfully"});
    })
    .catch(err=> {
        console.log(err);
    });
    
}

exports.editCrypto = async (request,response,next) => {
    const obj = request.body;
    const crypto = await CryptoCurrency.findOne({where:{id:obj.id}});
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    _.transform(obj, function(result, value, key) {
        crypto[key] = value;
    },{})

    await CryptoCurrency
    .update(crypto,{where:{id:obj.id}})
    .then(async ()=> {
        let io = sock.getIO();
        await io.emit("message", obj);
        response.status(201).send({new:crypto, "response":"Edited Successfully"});
    })
    .catch(err=> {
        console.log(err);
    });
}

exports.getCryptoByCode = (request,response,next) => {
    const code = request.params.code;
    CryptoCurrency
    .findAll({where:{code:code}})
    .then((cryptos) => {
        crypto = cryptos[0];
        if(crypto)
        response.status(200).send(crypto);
        else
        response.status(204).send("Cryptocurrency Not Found");
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getCryptoCurrencies = (request,response,next) => {
    CryptoCurrency
    .findAll()
    .then( (cryptos) => {
        console.log(request.session.isLoggedIn);
        response.send(cryptos);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.deleteCryptoByCode = (request,response,next) => {
    const code = request.params.code;
    CryptoCurrency
    .destroy({where:{code:code}}
    )
    .then(()=> {
        response.status(201).send({"response":"Deleted Successfully"});
    })
    .catch(err=> {
        console.log(err);
    });
}