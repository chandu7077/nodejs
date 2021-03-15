const transaction = {
    name:"MARS SMARTPHONE",
    price:21000,
    offer() {
        console.log("WITHOUT OFFER -> Price:",this.price,"\nWITH OFFER -> Price:",19000);
    }
}

console.log(transaction);
transaction.offer();

const cryptos = ["Bitcoin","Ethereum","Ripple"];
const payments = [cryptos,"COD","UPI","Credit Card","Debit Card","Wallet","Bank Transfer"];

console.log("***Payments Available***");
console.log(payments.map(payment => "Pay with "+payment));

console.log("***Card Payments Available***");
console.log(payments.filter(payment => {
    if(payment.indexOf("Card")>0) {
        return payment;
    }
}));

console.log("***Crypto Payments Available***");
payments[0].forEach(crypto => console.log(crypto));

payments.push("Coupons");
console.log("***Payments Available***");
console.log(payments.map(payment => "Pay with "+payment));

const newPayments = [...payments]
console.log(newPayments);

const toArray = (...args) => {
    return args;
}
console.log(...toArray(payments));

//{} for object destructuring
const displayPrice = ({price,name}) => price;
const {price,offer} = transaction;
console.log(price,displayPrice(transaction));
offer();

//square brackets for array destructuring
const [coins,cod] = payments;
console.log(coins,cod);

