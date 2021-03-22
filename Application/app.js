const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require("./util/dbconnection");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");
const errorRoutes = require("./routes/error");
const cryptoRoutes = require("./routes/cryptocurrency");
const cartRoutes = require("./routes/cart");

const homePage = (request,response,next) => {
    response.send("<h1>Welcome to Home Page</h1>");
}


const authentication =  (request,response,next) => {
    console.log("error");
    // response.status(404).send("print");
    next();
}

app.use(morgan("dev"))
app.use(express.json())
app.use(cryptoRoutes);
// app.use(authentication);
app.use("/cart",cartRoutes);
app.use("/admin",adminRoutes);
app.use("/user",userRoutes);
app.get("/",homePage);
app.use(errorRoutes);


app.listen(3000);

