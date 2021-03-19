const e = require("express");
const fs = require("fs");
const path = require("path");
const CryptoCurrency = require("./cryptocurrency");

const file = path.join(path.dirname(require.main.filename),"data","cart.json");

const readFromFile = callback => {
    
    fs.readFile(file,(err, fileContent)=>{
        let cart = {cryptos:[],totalPrice:0};
        if(!err) {
            cart = JSON.parse(fileContent);
            callback(cart);
        }
        else {
            callback({});
        }
    });
}

module.exports = class Cart {
    static addCryptoToCart(code, quantity, currentPrice, callback) {
        readFromFile(cart => {
            const index = cart.cryptos.findIndex(obj => obj.code === code);
            if(index>=0) {
                const existing = cart.cryptos[index];
                existing.quantity = existing.quantity + quantity;
                cart.cryptos[index] = existing;
            }
            else {
                const newCrypto = {code,quantity};
                const cryptos = [...cart.cryptos,newCrypto];
                cart.cryptos = cryptos;
            }
            cart.totalPrice = cart.totalPrice + currentPrice * quantity;
            cart.lastModified = new Date();
            fs.writeFile(file,JSON.stringify(cart), err=> {
                console.log(err);
                if(!err)
                callback("Added Successfully");
                else
                callback("Error");
            });
        })
    }

    static deleteByCode(code,callback) {
        readFromFile(cart => {
            const cartItem = cart.cryptos.find(obj => obj.code === code);
            CryptoCurrency.findByCode(code, crypto => {
                if(!cartItem)
                callback("Error");
                else {
                    const extraPrice = crypto.currentPrice * cartItem.quantity;
                cart.totalPrice = cart.totalPrice -  extraPrice;
                cart.cryptos = cart.cryptos.filter(obj => obj.code !== code);
                cart.lastModified = new Date();
                fs.writeFile(file,JSON.stringify(cart), err=> {
                    console.log(err);
                    if(!err)
                    callback("Deleted Successfully");
                    else
                    callback("Error");
                });
                }
                
            });
            
        })
    }

    static fetchAll(callback) {
        readFromFile(cart => {
            
            cart.cryptos.map((obj,index) =>{
                CryptoCurrency.findByCode(obj.code, crypto => {
                    cart.cryptos[index] = {...obj,...crypto}
                })
            })
            callback(cart);
        });  
    }

}