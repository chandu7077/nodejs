const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const app = express();

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");
const errorRoutes = require("./routes/error");
const cryptoRoutes = require("./routes/cryptocurrency");

const homePage = (request,response,next) => {
    response.send("<h1>Welcome to Home Page</h1>");
}
app.use(morgan("dev"))
app.use(express.json())
app.use(cryptoRoutes);
app.use("/admin",adminRoutes);
app.use("/user",userRoutes);
app.get("/",homePage);
app.use(errorRoutes);


app.listen(3000);

