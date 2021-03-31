// const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const app = express();
const sequelize = require("./util/dbconnection");
const session = require("express-session");
const redis = require("redis");
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);
const csrf = require('csurf');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const dotenv = require('dotenv');
dotenv.config();
var cookieParser = require('cookie-parser');
const _ = require("lodash");

//Routes
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");
const errorRoutes = require("./routes/error");
const cryptoRoutes = require("./routes/cryptocurrency");
const cartRoutes = require("./routes/cart");
const transactionRoutes = require("./routes/transaction");
const authRoutes = require("./routes/auth");

//Models
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const CryptoCurrency = require("./models/cryptocurrency");
const Transaction = require("./models/transaction");
const TransactionItem = require("./models/transaction-item");

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
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

        if (err) return res.sendStatus(403)
        if(req.session.user)
        {
            console.log(req.session.user);
            req.session.user = User.build(req.session.user);
            console.log(req.session.user);
        }
        next();
    })
}

const csrfProtection = csrf({ cookie: true });

// app.use((req,res,next) => {
//     res.setHeader('Access-Control-Allow-Origin',"*");
//     req.setHeader('Access-Control-Allow-Origin',"*");
//     res.setHeader('Access-Control-Allow-Methods',"*");
//     req.setHeader('Access-Control-Allow-Methods',"*");
//      next();
//  })

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
// app.use(csrfProtection);
app.use(
    session({
        secret:"terces", 
        resave:false, 
        saveUninitialized:false,
        store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
    })
);

app.use("/auth",authRoutes);
app.use("/cart",authentication,cartRoutes);
app.use("/transaction",authentication,transactionRoutes)
app.use("/admin",authentication,adminRoutes);
app.use("/user",authentication,userRoutes);
app.use("/",authentication,cryptoRoutes);
// app.get("/",homePage);

app.use(errorRoutes);

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
    const io = require("./socket").init(server);
    io.on("connection", socket => {
        console.log("Client Connected");
    })
})


