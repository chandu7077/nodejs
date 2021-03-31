import { request, response } from 'express';
import express from 'express';
import morgan from 'morgan';
const app = express();

import adminRoutes from './routes/admin';
import userRoutes from './routes/users';
import errorRoutes from './routes/error';
import cryptoRoutes from './routes/cryptocurrency';
import cartRoutes from './routes/cart';

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
app.use(authentication);
app.use("/cart",cartRoutes);
app.use("/admin",adminRoutes);
app.use("/user",userRoutes);
app.get("/",homePage);
app.use(errorRoutes);


app.listen(3000);

