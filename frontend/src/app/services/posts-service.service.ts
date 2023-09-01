import { Injectable } from '@angular/core';
import { Post } from '../posts/post.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {

  constructor(private http:HttpClient,private router:Router) { }



  public posts:Post[]=[];

  private postsUpdated=new Subject<{posts:Post[],maxPost:number}>();
  getPosts(postsPerPage: number,currentPage:number) {
    const queryParams=`?pagesize=${postsPerPage}&page=${currentPage}`
    this.http
      .get<{ message: string; posts: any;maxPosts:number }>(
        "http://localhost:3000/posts" + queryParams
      )
      .pipe(map((postData) => {
        console.log(postData);
        
        return { posts:postData.posts.map((post: { title: any; content: any; _id: any,imagePath:any,creator:any })  => {
          
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath:post.imagePath,
            creator:post.creator
          };
        }),maxPosts:postData.maxPosts};
      }))
      .subscribe(transformedPostData => {
        // console.log(transformedPostData)
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts:[...this.posts],
          maxPost:transformedPostData.maxPosts

        });
        console.log(this.posts);
        
      });
  }


  getPostUpdateListener(){
      return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string,imagePath:File) {
    // const post: Post = { id: "", title: title, content: content };
    //console.log(image);
    const postData=new FormData();//blob +text
    postData.append('title',title);
    postData.append('content',content);
    postData.append('image',imagePath,title);
    this.http
      .post<{ message: string, post: Post }>("http://localhost:3000/posts", postData)
      .subscribe(responseData => {
        //console.log(responseData)
        // const post:Post={
        //   id:responseData.post.id,
        //   title:title,
        //   content:content,
        //   imagePath:responseData.post.imagePath
        // }

     

        // console.log(post.imagePath)
        
        // this.posts.push(post);
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"])
      });
  }



  // addPost(title: string, content: string, image: File) {
  //   const postData = new FormData();
  //   postData.append("title", title);
  //   postData.append("content", content);
  //   postData.append("image", image, title);
  //   this.http
  //     .post<{ message: string; post: Post }>(
  //       "http://localhost:3000/api/posts",
  //       postData
  //     )
  //     .subscribe(responseData => {
  //       const post: Post = {
  //         id: responseData.post.id,
  //         title: title,
  //         content: content,
  //         imagePath: responseData.post.imagePath
  //       };
  //       this.posts.push(post);
  //       this.postsUpdated.next([...this.posts]);
  //       this.router.navigate(["/"]);
  //     });
  // }


  updatePost(id: string, title: string, content: string, imagePath: any) {
    let postData: Post | FormData;
    if (typeof imagePath === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("imagePath", imagePath);
      //console.log(postData)
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: imagePath,
        creator:null
      };
      //console.log(postData)
    }

    try {
      this.http
      .put("http://localhost:3000/posts/" + id, postData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
    } catch (error) {
      console.log(error);
    }

   
  }

  deletePost(postId: string) {
    return this.http.delete("http://localhost:3000/posts/" + postId)
      // .subscribe(() => {
      //   const updatedPosts = this.posts.filter(post => post.id !== postId);
      //   console.log(updatedPosts)
      //   this.posts = updatedPosts;
      //   console.log(this.posts)
      //   this.postsUpdated.next([...this.posts]);
      // });
  }

  // getPost(id:string){
  //   return  {...this.posts.find(p=>p.id===id)}

  // }

  getPost(id:any){
    return this.http.get<{
      _id:any,
      title:string,
      content:string,
      imagePath:any,
      creator:any
    }>("http://localhost:3000/posts/" + id)
  }


}
