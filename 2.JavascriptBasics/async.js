const fetchData = callback => {
    setTimeout(()=>{
        callback(Date());
    },1000);
}

setTimeout(()=>{
    console.log("HI, The Date after 3 seconds delay is:");
    fetchData((text)=> {
        console.log(text);
    })
},2000)

console.log("Now, The time is : ", Date());