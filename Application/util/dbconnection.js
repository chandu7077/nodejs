const mysql = require("mysql2");

// create database exchange;
// CREATE TABLE `exchange`.`cryptocurrency` ( `code` VARCHAR(3) NOT NULL , `name` VARCHAR(255) NOT NULL , `description` TEXT NOT NULL , `currentprice` DECIMAL NOT NULL , `closingprice` DECIMAL NOT NULL , `volume` VARCHAR(255) NOT NULL , `change` VARCHAR(5) NOT NULL , PRIMARY KEY (`code`(3))) ENGINE = InnoDB;
// INSERT INTO cryptocurrency VALUES ('BTC','Bitcoin','Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto. The currency began use in 2009 when its implementation was released as open-source software',59000,58000,'100 billion','+1.02%');
// INSERT INTO cryptocurrency VALUES ('ETH','Ethereum','Ethereum is a decentralized, open-source blockchain featuring smart contract functionality. Ether is the native cryptocurrency of the platform. It is the second-largest cryptocurrency by market capitalization, after Bitcoin. Ethereum is the most actively used blockchain',1853,1797.15,'24.68 billion','-1.68%');

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    database:"exchange",
    password:"ep34408"
})

module.exports = pool.promise();