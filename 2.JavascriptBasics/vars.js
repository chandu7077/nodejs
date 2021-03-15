var name = "Smartphone";
var price = 21000;
var paid = false;

function executeTranscation(name, price, paid) {
    console.log("Before:","\nName:",name,"\nPrice:",price,"\nPaid:",paid);
    paid=true;
    console.log("***********************");
    return "After:\nName:"+name+"\nPrice:"+price+"\nPaid:"+paid;
}
console.log(executeTranscation(name,price,paid));

