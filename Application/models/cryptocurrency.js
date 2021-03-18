const cryptos = [];
module.exports = class CryptoCurrency {

    constructor(name, code) {
        this.name = name;
        this.code = code;
    }

    save() {
        cryptos.push(this);
    }

    static fetchAll() {
        return cryptos;
    }

}