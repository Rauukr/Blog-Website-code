const express = require( "express");
const mongoose = require("mongoose");
const Article=require("./models/article");
const methodOverride=require("method-override")
mongoose.connect("mongodb://localhost:27017/BolgWebsiteDatabase");

const articleRouter = require("./routes/articles");
const app=express();
const port=3000;


app.set("view engine" , "ejs");
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"))
app.get("/" , async(req ,res)=>{
    const articles=await Article.find().sort({createdAt:"desc"})
    res.render("articles/index" , {articles:articles});
})
app.use("/articles" , articleRouter);
app.listen(port , (res,req)=>{
    console.log(`server is runnig on port ${port}`);
})