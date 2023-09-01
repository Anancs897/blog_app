const express=require('express');
const router=express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

const NewUser=require('../models/user-model')


router.post("/signup" , (req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user=new NewUser({
            email:req.body.email,
            password:hash
        });
        user.save().then(result=>{
            res.status(201).json({
                message:"user created successfully",
                result:result
            });
        }).catch(err=>{
            res.status(500).json({
                error:err
            })
        })
    })

} )


router.post('/login', (req,res,next)=>{
    let fetchedUser
    NewUser.findOne({email:req.body.email}).then(user=>{
        if(!user){
            return res.status(401).json({
                message:"Auth Failed"
            })
        }
        fetchedUser=user;
        //console.log(fetchedUser)
        return bcrypt.compare(req.body.password,user.password);
    })
    .then(result=>{
        if(!result)
        {
            return res.status(401).json({
                message:"Auth Failed"
            })
        }
        console.log(result)

        const token =jwt.sign({email:fetchedUser.email,userId:fetchedUser._id}, 'This_is_a_very_very_long_string',{expiresIn:"1h"} );
        
        res.status(200).json({
            token:token,
            expiresIn:3600000,
            userId:fetchedUser._id
        })

    })
    .catch(err=>{
        return res.status(401).json({
            message:"Auth Failed"
        })
    })
})

module.exports=router;