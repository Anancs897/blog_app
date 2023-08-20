import { Component,OnInit} from '@angular/core';

import { NgForm } from '@angular/forms';
import { PostsServiceService } from 'src/app/services/posts-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';



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
  // @Output() postCreated=new EventEmitter<Post>();\
  constructor(public postService:PostsServiceService, private route:ActivatedRoute ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId'))
      {
        this.mode='edit';
        this.postId=paramMap.get('postId');
        // this.Loading=true;
        this.post=this.postService.getPost(this.postId)
        // this.Loading=false;

      }
      else{
        this.mode='create';
        this.postId=null;
      }
    })
  }


  

  onSave(form:NgForm){

    
    
    if(this.mode==='create')
    {
      this.postService.addPost(form.value.title,form.value.content);
      this.Loading=true;
    }
    else{
      this.postService.updatePost(this.postId,form.value.title,form.value.content)
      this.Loading=true;
    }
    form.resetForm();
    //console.log(form.value)
    // const post={
    //   title:form.value.title,
    //   description:form.value.description


    // this.postCreated.emit(post);
  }


}
