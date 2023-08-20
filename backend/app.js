require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Post=require('./models/post-model');


const bodyParser=require('body-parser');

app.use(bodyParser.json());


mongoose.connect(process.env.CONNECTION_URL).then(()=>{
    console.log('mongodb connection successful');
}).catch((err)=>{
    console.error(err);
})

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,PUT,OPTIONS" 
    );

    next();
})

app.post('/posts',(req,res,next)=>{
    const post=new Post({
        title:req.body.title,
        description:req.body.description
    })
    console.log(post);
    post.save();
    res.status(201).json({
        message:'post added successfully'
    });
})

app.get('/posts',async (req,res,next)=>{
    await Post.find().then((docs)=>{
        res.status(200).json({
            message:"posts fetched successfully",
            posts:docs
        });
        console.log(docs);
    
    })

});

module.exports=app;


