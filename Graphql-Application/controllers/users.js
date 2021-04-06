export const choosePayment = (request,response,next) => {
    console.log(request.body);
    if(request.body.payment.length >0 )
    response.send(request.body.payment+" Selected");
    else
    response.send(request.body.crypto+" Selected");
};

