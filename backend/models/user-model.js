    const mongoose=require('mongoose');

    const uniqueValidator=require('mongoose-unique-validator');

    const newuserSchema=mongoose.Schema({
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true}
        
    });

    newuserSchema.plugin(uniqueValidator);

    module.exports=mongoose.model('NewUser',newuserSchema);