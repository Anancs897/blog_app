import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PostsServiceService } from 'src/app/services/posts-service.service';

@Component({
  selector: 'app-current-post',
  templateUrl: './current-post.component.html',
  styleUrls: ['./current-post.component.css']
})
export class CurrentPostComponent implements OnInit {

  constructor(private postService:PostsServiceService,private authService:AuthService,private router:Router){}

  post:any;
  currentId:any=this.postService.getSinglePostId();;
  userIsAuthenticated=false;
  userId:any
  
  

  ngOnInit(): void {
    this.currentId=this.postService.getSinglePostId();

    this.postService.getPost(this.currentId).subscribe((singlePost)=>{
      this.post=singlePost
      console.log(this.post)
      this.userIsAuthenticated=this.authService.getIsAuth();
    })
    this.userId=this.authService.getUserId();
    
  }

  onDelete(postId: any) {
    //this.loading=true;
    //64f5c298621f2a8310ccfa19
    console.log(postId);
    this.postService.deletePost(postId).subscribe(()=>{
      console.log(postId)
      this.router.navigate(['/']);
      // this.postService.getPosts(this.postsPerPage,this.currentPage);
      
    })
  }

  
}
