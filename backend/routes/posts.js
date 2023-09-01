const express=require('express');
const MyPost=require('../models/post-model')
const router=express.Router();

const multer=require('multer');
const checkAuth=require('../middleware/check-auth')

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



router.post("",checkAuth,multer({storage:storage}).single("image") , (req, res, next) => {
    const url=req.protocol + '://' + req.get('host');
    const post = new MyPost({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      creator:req.userData.userId
      
    });
    console.log(req.filename)
    post.save().then(createdPost => {
      res.status(201).json({
        message: "MyPost added successfully",
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
  //console.log(req.query);
  const pageSize=req.query.pagesize;
  const currentPage=req.query.page;
  const postQuery=MyPost.find();
  let fetchedPosts;
  if(pageSize && currentPage)
  {
    postQuery.skip(pageSize * (currentPage-1)).limit(pageSize);
  }
    await postQuery.then((docs)=>{

      fetchedPosts=docs
      return MyPost.count().then(count=>{
        res.status(200).json({
          message:"posts fetched successfully",
          posts:fetchedPosts,
          maxPosts:count
      });
      })
       
        console.log(docs);
    
    })

});

router.get("/:id", (req, res, next) => {
  MyPost.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "MyPost not found!" });
    }
  });
});


router.put('/:id',checkAuth,multer({storage:storage}).single("imagePath"),(req,res,next)=>{

  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }


    // const url=req.protocol + '://' + req.get('host');
    const post = new MyPost({
      title: req.body.title,
      content: req.body.content,
      _id:req.body.id,
      imagePath: imagePath,
      creator:req.userData.userId
      //url + "/images/" + req.file.filename
      
    });

    MyPost.updateOne({_id:req.params.id,creator:req.userData.userId},post).then(result=>{
      if(result.modifiedCount>0){
        res.status(200).json({ message: "MyPost updated successfully" });
        }
        else{
          res.status(401).json({message:"not authorized!"});
        }
    })
})


// router.put('/:id', checkAuth, multer({ storage: storage }).single("imagePath"), (req, res, next) => {
//   let imagePath = req.body.imagePath;
//   if (req.file) {
//     const url = req.protocol + "://" + req.get("host");
//     imagePath = url + "/images/" + req.file.filename;
//   }

//   const post = new MyPost({
//     title: req.body.title,
//     content: req.body.content,
//     _id: req.body.id,
//     imagePath: imagePath,
//     creator: req.userData.userId
//   });

//   console.log("UserID:", req.userData.userId); // Log the user ID for debugging

//   MyPost.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
//     console.log("Update result:", result); // Log the update result for debugging
//     if (result.nModified > 0) {
//       res.status(200).json({ message: "MyPost updated successfully" });
//     } else {
//       res.status(401).json({ message: "Not authorized!" });
//     }
//   }).catch(error => {
//     console.error("Update error:", error); // Log any errors that occur during the update
//     res.status(500).json({ message: "Update failed" });
//   });
// });

router.delete("/:id",checkAuth , (req, res, next) => {
    MyPost.deleteOne({ _id: req.params.id, creator:req.userData.userId }).then(result => {
      //console.log(result);
      if(result.deletedCount>0){
      res.status(200).json({ message: "MyPost deleted!" });
      }
      else{
        res.status(401).json({message:"not authorized!"});
      }
    });
  });

  module.exports=router;