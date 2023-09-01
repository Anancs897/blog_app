const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decodedToken=jwt.verify(token,"This_is_a_very_very_long_string");
        req.userData={email:decodedToken.email,userId:decodedToken.userId}
        next();
    }
    catch(err){
        res.status(401).json({message:"Auth Failed"})
    }
}