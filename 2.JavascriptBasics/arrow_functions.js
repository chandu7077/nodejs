const add = (a,b) => a+b;
const print = x => console.log(x);
const printf = x => console.log("Value is:",x);
const execute = (add,print) => {
    print(add(3,4));
}
console.log(add(3,4));
print("hello");
print(add(1,2));
execute(add,printf);