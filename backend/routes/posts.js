const express=require('express');
const Post=require('../models/post-model')
const router=express.Router();

const multer=require('multer');

const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'

}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"../backend/images");
    },
    filename:(req,file,cb)=>{
        const name=file.originalname.toLowerCase().split(' ').join('-');
        const ext=MIME_TYPE_MAP[file.mimetype];
        cb(null,name+'-'+Date.now() + '.' + ext);
    }
});



router.post("",multer({storage:storage}).single("image") , (req, res, next) => {
    const url=req.protocol + '://' + req.get('host');
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename
      
    });
    console.log(req.filename)
    post.save().then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
            ...createdPost,
             id:createdPost._id

            // title:createdPost.title,
            // content:createdPost.content,
            // imagePath:createdPost.imagePath
        }
      });
    });
  });

router.get('',async (req,res,next)=>{
    await Post.find().then((docs)=>{
        res.status(200).json({
            message:"posts fetched successfully",
            posts:docs
        });
        console.log(docs);
    
    })

});


router.put('/:id',multer({storage:storage}).single("image"),(req,res,next)=>{
    const url=req.protocol + '://' + req.get('host');
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      _id:req.body.id,
      imagePath: url + "/images/" + req.file.filename
      
    });

    Post.updateOne({_id:req.params.id},post).then(result=>{
        res.status(200).json({message:"post updated successfully"});
    })
})

router.delete("/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
  });

  module.exports=router;