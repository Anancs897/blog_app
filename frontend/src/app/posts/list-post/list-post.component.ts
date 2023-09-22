import { Component,OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsServiceService } from 'src/app/services/posts-service.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';


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
  totalPosts=0;
  postsPerPage=10;
  pageSizeOptions=[2,5,10];
  currentPage=1;
  loading=false;
  userId:any;
  formattedText:any;

  private authStatusSub:Subscription=new Subscription;
  userIsAuthenticated=false;
  searchKey:any=""
  
  constructor(public postService:PostsServiceService,public http:HttpClient,private authService:AuthService){}
  

  ngOnInit() {
    console.log(this.posts)
    this.loading=true
    this.postService.getPosts(this.postsPerPage,1);
    this.userId=this.authService.getUserId();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((postData:{posts:Post[],maxPost:number}) => {
        this.loading=false;
        this.posts = postData.posts;
        this.totalPosts=postData.maxPost;
      });
      this.userIsAuthenticated=this.authService.getIsAuth();
      this.authStatusSub=this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
        this.userIsAuthenticated=isAuthenticated  
        this.userId=this.authService.getUserId();
      })
      this.postService.search.subscribe((val)=>{
        this.searchKey=val;
      })
  }

  onChangedPage(page:PageEvent)
  {
    this.loading=true;
    this.currentPage=page.pageIndex+1;
    this.postsPerPage=page.pageSize
    this.postService.getPosts(this.postsPerPage,this.currentPage);
    
    //console.log(page)
  }

  onDelete(postId: string) {
    this.loading=true;
    this.postService.deletePost(postId).subscribe(()=>{
      this.postService.getPosts(this.postsPerPage,this.currentPage);
    })
  }

  openCurrentPost(id:any){
    this.postService.getCurrentPostId(id);
  }

  ngOnDestroy() {
    this.loading=false
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}

 



