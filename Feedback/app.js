import express from "express";
import Sequelize from "sequelize";
import sequelize from "./dbconnection.js";
import User from "./models/user.js";
import Post from "./models/post.js";

User.hasMany(Post);

const app = express();

app.use(express.json());
app.post("/add-post", async (req,res,next) => {
    const obj = req.body;
    await Post.create(obj).catch(err => res.json(err));
    res.json({"response":"created successfully",obj});
});

sequelize
.sync()
.then(()=> {
    app.listen(3000);
})