import { Component,OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsServiceService } from 'src/app/services/posts-service.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnDestroy,OnInit{

  //  posts:Post[] = [
  //   {title:"",description:""}
  // ]
  posts: Post[] = [];
  private postsSub: Subscription = new Subscription;
 
  constructor(public postService:PostsServiceService,public http:HttpClient){}

  myPosts:Post[]=this.postService.posts;
  

  //  fruits:String[]=['apple','mango']



  ngOnInit(){

    this.http.get<{message:string,posts:Post[]}>('http://localhost:3000/posts').subscribe((postData)=>{
      this.posts=postData.posts
      console.log(this.posts);
      //console.log(this.postsUpdated);
    })
  //   this.postService.getPosts();
  //   console.log(this.postService.posts)
  //  // this.posts=this.postService.posts
  //   // console.log(this.posts)
    
  //   // console.log(this.posts);
  //   this.postsSub=this.postService.getPostUpdateListener().subscribe((posts:Post[])=>{
  //     this.posts=posts;
  //     console.log('hello')
  //     console.log(this.posts);
  //   })  
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }



}
