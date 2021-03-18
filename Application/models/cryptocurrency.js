const fs = require("fs");
const path = require("path");
const { callbackify } = require("util");
const file = path.join(path.dirname(require.main.filename),"data","cryptos.json");

const readFromFile = callback => {
    let cryptos=[];
    fs.readFile(file,(err, fileContent)=>{
        if(!err) {
            cryptos = JSON.parse(fileContent);
            callback(cryptos);
        }
        else {
            callback([]);
        }
        
    });
    
}

module.exports = class CryptoCurrency {

    constructor(name, code, description, currentPrice, closingPrice, volume, change) {
        this.name = name;
        this.code = code;
        this.description = description,
        this.currentPrice = currentPrice,
        this.closingPrice = closingPrice,
        this.volume = volume,
        this.change = change
    }

    save() {
        console.log(file);
        readFromFile(cryptos => {
            cryptos.push(this);
            fs.writeFile(file,JSON.stringify(cryptos), err=> {
                console.log(err);
            });
        })
    }

    static findByCode(code, callback) {
        readFromFile(cryptos => {
            const crypto = cryptos.find(obj => obj.code === code);
            callback(crypto);
            
        })
    }

    static fetchAll(callback) {
        readFromFile(cryptos => {
            callback(cryptos);
        });  
    }

}