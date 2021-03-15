

const fetchData = () => {
    const promise = new Promise((resolve,reject) => {
        setTimeout(()=> {
            resolve(Date());
        },1000);
    });
    return promise;
}

setTimeout(()=>{
    console.log("HI, The Date after 3 seconds delay is:");
    fetchData().then((prom)=>{
        console.log(prom);
        return fetchData();
    }).then((prom)=>{
        console.log("HI, The Date after 4 seconds delay is:");
        console.log(prom);
    })
},2000)

console.log("Now, The time is : ", Date());