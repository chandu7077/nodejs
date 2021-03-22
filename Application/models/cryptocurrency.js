const fs = require("fs");
const path = require("path");
const db = require("../util/dbconnection");
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
        return db.execute(
            `INSERT INTO 
             cryptocurrency
             VALUES
             (?, ?, ?, ?, ?, ?, ?)`,
             [ this.code, this.name, this.description, this.currentPrice, this.closingPrice, this.volume, this.change]
             )
    }

    static findByCode(code) {
        return db.execute(
            `SELECT * FROM cryptocurrency where cryptocurrency.code = ?`,
             [code]
        )
    }

    static fetchAll() {
        return db.execute("SELECT * FROM cryptocurrency");   
    }

}