// const { request, response } = require("express");
import express from 'express';
import sock from "./socket.js";
import morgan from 'morgan';
const app = express();
import sequelize from './util/dbconnection.js';
import session from 'express-session';
import redis from 'redis';
const redisClient = redis.createClient();
import redisStoreFactory from 'connect-redis';
const redisStore = redisStoreFactory(session);
import csrf from 'csurf';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();
import cookieParser from 'cookie-parser';
import _ from 'lodash';
import {graphqlHTTP} from "express-graphql";
import buildSchema from "./graphql/schema.js";
import graphqlResolvers from "./graphql/resolvers.js";
// //Routes
// const adminRoutes = require("./routes/admin");
// const userRoutes = require("./routes/users");
// const errorRoutes = require("./routes/error");
// const cryptoRoutes = require("./routes/cryptocurrency");
// const cartRoutes = require("./routes/cart");
// const transactionRoutes = require("./routes/transaction");
// const authRoutes = require("./routes/auth");

//Models
import User from './models/user.js';
import helmet from "helmet";
import Cart from './models/cart.js';
import CartItem from './models/cart-item.js';
import CryptoCurrency from './models/cryptocurrency.js';
import Transaction from './models/transaction.js';
import TransactionItem from './models/transaction-item.js';
import { InvalidAccessTokenException } from './errors/names.js';

//associations
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(CryptoCurrency,{through:CartItem});
CryptoCurrency.belongsToMany(Cart,{through:CartItem});
User.hasMany(Transaction);
Transaction.belongsTo(User);
Transaction.belongsToMany(CryptoCurrency, {through:TransactionItem});

const homePage = (request,response,next) => {
    response.send("<h1>Welcome to Home Page</h1>");
}


const authentication =  (req,res,next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    
    if (_.isNil(token)) {
        req.isAuth = false;
        return next();
        // return res.sendStatus(401)
    }

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if(_.isNil(decodedToken)) {
            req.isAuth = false;
            return next();
        }
        else {
            req.email = decodedToken.email;
            req.isAuth = true;
            req.role = decodedToken.role;
            console.log(req);
            return next();
        }
    } 

    catch(err) {
        req.isAuth = false;
        return next();
    }

}

const csrfProtection = csrf({ cookie: true });
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Methods',"*");
     next();
 })
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(authentication);
app.use("/graphql", graphqlHTTP({
    schema:buildSchema,
    rootValue:graphqlResolvers,
    graphiql:true,
    formatError(err) {
        if(!err.originalError) {
            return err;
        }
        return {message:err.message, data:err.originalError.data, statusCode:err.originalError.code}
    }
}))

// app.use(csrfProtection);
// app.use(
//     session({
//         secret:"terces", 
//         resave:false, 
//         saveUninitialized:false,
//         store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
//     })
// );
// app.use("/auth",authRoutes);
// app.use("/cart",authentication,cartRoutes);
// app.use("/transaction",authentication,transactionRoutes)
// app.use("/admin",authentication,adminRoutes);
// app.use("/user",authentication,userRoutes);
// app.use("/",authentication,cryptoRoutes);
// app.get("/",homePage);

// app.use(errorRoutes);

app.use((error, req, res, next) => {
    if(_.isNil(error.status)) {
        error.status = 400;
    }
    res.status(error.status).send({description:error.message,error:error});
});

sequelize
// .sync({force:true})
// .sync({alter:true})
 .sync()
.then(result => {
    return User.findByPk(1);
})
.then(user => {
    if(!user) {
        return User.create({name:"chandu",password:"password",email:"btc@crypto.com",role:"USER"})
    }
    return user;
})
.then(user => {
    const server = app.listen(3000);
    const io = sock.init(server);
    io.on("connection", socket => {
        console.log("Client Connected");
    })
})


