import { Component,OnInit} from '@angular/core';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostsServiceService } from 'src/app/services/posts-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';




@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  

  private mode='create';
  private postId:any=null
  public post:any;
  Loading=false;
  
  form!: FormGroup;
  imagePreview:any


  constructor(public postService:PostsServiceService, public route:ActivatedRoute ){}

  ngOnInit(): void {

    this.form=new FormGroup({
      title:new FormControl(null,{
        validators:[Validators.required]
      }),
      content:new FormControl(null,{
        validators:[Validators.required]
      }),
      imagePath: new FormControl(null,{
        validators:[Validators.required]
      })
    })

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId'))
      {
        this.mode='edit';
        this.postId=paramMap.get('postId');
       //this.Loading=true;
        // this.post=this.postService.getPost(this.postId)
        // this.Loading=false
        
        this.postService.getPost(this.postId).subscribe(postData=>{
          console.log(postData);
          
          //this.Loading=false
          this.post={
            id:postData._id,
            title:postData.title,
            content:postData.content,
            imagePath:postData.imagePath,
            creator:postData.creator
          }
          this.form.setValue({
            title:this.post.title,
           
            content:this.post.content,
            imagePath:this.post.imagePath,
          })
          console.log(this.post)
        })
      
        // this.form.setValue({
        //   title:this.post.title,
         
        //   content:this.post.content,
        //   image:this.post.imagePath,
        // })

        
      

      }
      else{
        this.mode='create';
        this.postId=null;
      }
    })
  }


  onImagePicked(event:Event){
    
    const fileInput = event.target as HTMLInputElement;
    const file= fileInput.files ? fileInput.files[0] : null;
    this.form.patchValue({imagePath:file});
    this.form.get('imagePath')?.updateValueAndValidity();
   

    const reader=new FileReader();
    reader.onload=()=>{
      this.imagePreview=reader.result;
    }
    console.log(file)
    if(file)
    {
      reader.readAsDataURL(file);
      console.log(file)
    }


  }

  // onImagePicked(event: Event) {
  //   const file=(event.target as HTMLInputElement).files[0]
    // const file = (event?.target? as HTMLInputElement).files[0];
    // this.form.patchValue({ image: file });
    // this.form.get("image").updateValueAndValidity();
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imagePreview = reader.result as string;
    // };
    // reader.readAsDataURL(file);
  

  

  onSave(){
    
    if(this.mode==='create')
    {
      this.postService.addPost(this.form.value.title,this.form.value.content,this.form.value.imagePath);
      this.Loading=true;
      
    }
    else{
      this.postService.updatePost(this.postId,this.form.value.title,this.form.value.content,this.form.value.imagePath)
      //this.Loading=true;
      
    }
    
    this.form.reset();
  }
}


  // enteredTitle = "";
  // enteredContent = "";
  // post: any;
  // isLoading = false;
  // form!: FormGroup;
  // imagePreview: any;
  // private mode = "create";
  // private postId: any;

  // constructor(
  //   public postsService: PostsServiceService,
  //   public route: ActivatedRoute
  // ) {}

  // ngOnInit() {
  //   this.form = new FormGroup({
  //     title: new FormControl(null, {
  //       validators: [Validators.required, Validators.minLength(3)]
  //     }),
  //     content: new FormControl(null, { validators: [Validators.required] }),
  //     image: new FormControl(null, {
  //       validators: [Validators.required],
        
  //     })
  //   });
  //   this.route.paramMap.subscribe((paramMap: ParamMap) => {
  //     if (paramMap.has("postId")) {
  //       this.mode = "edit";
  //       this.postId = paramMap.get("postId");
  //       this.isLoading = true;
  //       this.postsService.getPost(this.postId).subscribe(postData => {
  //         this.isLoading = false;
  //         this.post = {
  //           id: postData._id,
  //           title: postData.title,
  //           content: postData.content,
  //           imagePath: postData.imagePath
  //         };
  //         this.form.setValue({
  //           title: this.post.title,
  //           content: this.post.content,
  //           image: this.post.imagePath
  //         });
  //       });
  //     } else {
  //       this.mode = "create";
  //       this.postId = null;
  //     }
  //   });
  // }

  // onImagePicked(event: Event) {
  //     const fileInput = event.target as HTMLInputElement;
  //   const file= fileInput.files ? fileInput.files[0] : null;
  //   this.form.patchValue({image:file});
  //   this.form.get('image')?.updateValueAndValidity();
   

  //   const reader=new FileReader();
  //   reader.onload=()=>{
  //     this.imagePreview=reader.result;
  //   }
  //   if(file)
  //   {
  //     reader.readAsDataURL(file);
  //   }

  // }

  // onSavePost() {
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   this.isLoading = true;
  //   if (this.mode === "create") {
  //     this.postsService.addPost(
  //       this.form.value.title,
  //       this.form.value.content,
  //       this.form.value.image
  //     );
  //   } else {
  //     this.postsService.updatePost(
  //       this.postId,
  //       this.form.value.title,
  //       this.form.value.content,
  //       this.form.value.image
  //     );
  //   }
  //   this.form.reset();
  // }



