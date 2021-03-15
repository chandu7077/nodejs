let name = "Smartphone";
const price = 21000;
let paid = false;
//price=20000;
function executeTranscation(name, price) {
    console.log("Before:","\nName:",name,"\nPrice:",price,"\nPaid:",paid);
    paid=true;
    console.log("***********************");
    return "After:\nName:"+name+"\nPrice:"+price+"\nPaid:"+paid;
}

console.log(executeTranscation(name,price,paid));