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
 

 // myPosts:Post[]=this.postService.posts;
  

  //  fruits:String[]=['apple','mango']



  

    // this.http.get<{message:string,posts:any}>('http://localhost:3000/posts').pipe(map((postData)=>{
    //   return postData.posts.map((post: { title: any; description: any; _id: any; })=>{
    //     return{
    //       title:post.title,
    //       description:post.description,
    //       id:post._id
    //     }
    //   })
    // }))
    // .subscribe((transformedPosts)=>{
    //   this.posts=transformedPosts;
      
    // }); 
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


  // posts: Post[] = [];
  // private postsSub: Subscription;
  posts: Post[] = [];
  private postsSub: Subscription = new Subscription;
 
  constructor(public postService:PostsServiceService,public http:HttpClient){}
  

  ngOnInit() {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: any) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}

 



