import { Component} from '@angular/core';

import { NgForm } from '@angular/forms';
import { PostsServiceService } from 'src/app/services/posts-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  

  // @Output() postCreated=new EventEmitter<Post>();\
  constructor(public postService:PostsServiceService ){}

  onSave(form:NgForm){

    this.postService.addPost(form.value.title,form.value.description);
    console.log(form.value)
    // const post={
    //   title:form.value.title,
    //   description:form.value.description


    // this.postCreated.emit(post);
  }


}
