const mongoose=require('mongoose');
const postSchema=mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,default:"here is the description!"}
});
module.exports=mongoose.model('Post',postSchema);