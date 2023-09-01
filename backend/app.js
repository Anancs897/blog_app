require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');

const postsRoutes=require('./routes/posts')
const userRoutes=require('./routes/user')

const bodyParser=require('body-parser');
const path=require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use("/images",express.static(__dirname+"/images"));

mongoose.connect(process.env.CONNECTION_URL).then(()=>{
    console.log('mongodb connection successful');
}).catch((err)=>{
    console.error(err);
})

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,PUT,OPTIONS" 
    );

    next();
});

app.use('/posts',postsRoutes);
app.use('/user',userRoutes )


module.exports=app;


