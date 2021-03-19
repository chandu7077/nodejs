const payments = ["COD","UPI","Credit Card","Debit Card","Wallet","Bank Transfer"];
const cryptos = ["Bitcoin","Ethereum","Ripple"];

exports.getPayments = (request,response,next) => {
    let data={payments,cryptos};
    response.send({
        pageTitle:"Choose Payment",
        data,
        path:"/admin/payments",
    });
}