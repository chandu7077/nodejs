const fs = require("fs");

const cryptos = ["Bitcoin","Ethereum","Ripple"];
const payments = [cryptos,"COD","UPI","Credit Card","Debit Card","Wallet","Bank Transfer"];

const requestHandler = (request,response) => {
    list=""
    console.log(request.url);
    if(request.url === "/") {
        payments.map((payment,index) => {
            if(index==0)
            list=list+"<li><a href='cryptos'>CryptoCurrency</a></li>";
            else
            list=list+"<li>"+payment+"</li>";
        });
    }
    
    else if(request.url === "/cryptos") {
        cryptos.map((payment,index) => {
            list=list+"<li>"+payment+"</li>";
        });
    }

    else if(request.url === "/send" && request.method=="POST") {
        const data=[];
        request.on("data",(chunk)=>{
            console.log("chunk",chunk);
            data.push(chunk);
        });

        return request.on("end",()=>{
            const parsedAmount = Buffer.concat(data).toString();
            console.log(parsedAmount);
            const amount = parsedAmount.split("=")[1];
            fs.writeFile("transactions.txt",amount, err => {
                response.setHeader("Location","/");
                response.statusCode = 302;
                return response.end();
            });
        });
        
    }

    response.write("<html>");
    response.write("<body>");
    response.write("<h1>Available Payments</h1>")
    response.write("<ul>");
    response.write(list);
    response.write("</ul>");
    response.write("<form action='/send' method='POST'><input name='amt' type='number'><button type='submit'>Send</button></form>");
    response.write("</body>");
    response.write("</html>");
    return response.end();
}

// module.exports = requestHandler;
// module.exports.handler = requestHandler;
// module.exports.name = "routes";
// exports.payments = payments;

module.exports = {
    handler:requestHandler
}
    