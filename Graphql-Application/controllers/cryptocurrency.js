
import CryptoCurrency from '../models/cryptocurrency.js';
import { validationResult } from 'express-validator';
import sock from '../socket.js';
import _ from 'lodash';
import { InvalidAccessTokenException } from '../errors/names.js';

export const addCrypto = ({crypto},request) => {
    if(!request.isAuth || !(_.isEqual(request.role,"ADMIN"))) {
        throw InvalidAccessTokenException;
    }

    const name = crypto.name;
    const code = crypto.code;
    const description = crypto.description;
    const currentPrice = crypto.currentPrice;
    const closingPrice = crypto.closingPrice;
    const volume = crypto.volume;
    const change = crypto.change;

    return CryptoCurrency.create({
        name, code, description, currentPrice, closingPrice, volume, change}
    )
    .then(()=> {
        return {"response":"Added Successfully","statusCode":201};
    })
    .catch(err=> {
        throw err;
    });
    
};

export const editCrypto = async ({obj},request) => {
    if(!request.isAuth || !(_.isEqual(request.role,"ADMIN"))) {
        throw InvalidAccessTokenException;
    }

    const crypto = await CryptoCurrency.findOne({where:{id:obj.id}});
   
    _.transform(obj, function(result, value, key) {
        crypto[key] = value;
    },{})

    console.log(crypto.id)
    return CryptoCurrency
    .update(obj,{where:{id:crypto.id}})
    .then(async ()=> {
        let io = sock.getIO();
        await io.emit("message", obj);
        return ({statusCode:201, response:"Edited Successfully"});
    })
    .catch(err=> {
        throw err;
    });
};

export const getCryptoByCode = ({code},request) => {
    if(!request.isAuth) {
        throw InvalidAccessTokenException;
    }
    return CryptoCurrency
    .findAll({where:{code:code}})
    .then((cryptos) => {
        const crypto = cryptos[0];
        if(crypto)
        return crypto;
        else
        return {response:"Cryptocurrency Not Found",statusCode:204};
    })
    .catch(err => {
        throw new Error(err);
    })
};

export const getCryptoCurrencies = ({}, request) => {
    if(!request.isAuth) {
        throw InvalidAccessTokenException;
    }
    return CryptoCurrency
    .findAll()
    .then( (cryptos) => {
        return cryptos;
    })
    .catch(err => {
       throw err;
    })
};

export const deleteCryptoByCode = ({code}, request) => {
    
    return CryptoCurrency
    .destroy({where:{code:code}}
    )
    .then(()=> {
        return ({"response":"Deleted Successfully", statusCode:200});
    })
    .catch(err=> {
        throw err;
    });
};