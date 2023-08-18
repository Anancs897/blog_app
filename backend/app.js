const express=require('express');
const app=express();

const Post=require('./models/post-model');

const bodyParser=require('body-parser');

app.use(bodyParser.json());

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
    res.status(201).json({
        message:'post added successfully'
    });
})

app.get('/posts',(req,res,next)=>{
    const posts=[
        {
            id:123,
            title:'title1',
            description:'des1'
        },
        {
            id:124,
            title:'title2',
            description:'des2'
        }
    ];
    res.status(200).json({
        message:"posts fetched successfully",
        posts:posts
    });

});

module.exports=app;

