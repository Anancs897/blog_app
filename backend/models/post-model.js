const mongoose=require('mongoose');
const postSchema=mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,default:"here is the description!"},
    imagePath:{type:String,required:true},
    creator:{type:mongoose.Schema.Types.ObjectId, ref:"NewUser", required:true}
});
module.exports=mongoose.model('MyPost',postSchema);