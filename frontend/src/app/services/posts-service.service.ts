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

  private postsUpdated=new Subject<Post[]>();
  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/posts"
      )
      .pipe(map((postData) => {
        return postData.posts.map((post: { title: any; content: any; _id: any,imagePath:any }) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath:post.imagePath
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }


  getPostUpdateListener(){
      return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string,image:File) {
    // const post: Post = { id: "", title: title, content: content };
    console.log(image);
    const postData=new FormData();//blob +text
    postData.append('title',title);
    postData.append('content',content);
    postData.append('image',image,title);
    this.http
      .post<{ message: string, post: Post }>("http://localhost:3000/posts", postData)
      .subscribe(responseData => {
        const post:Post={
          id:responseData.post.id,
          title:title,
          content:content,
          imagePath:responseData.post.imagePath
        }

     

        console.log(post.imagePath)
        
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
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


  updatePost(id:string,title:string,content:string,image:string){
    const post:Post={id:id,title:title,content:content,imagePath:image};
    this.http.put("http://localhost:3000/posts/"+id,post).subscribe((res)=>{
      this.router.navigate(["/"]);
    });
    
  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        console.log(updatedPosts)
        this.posts = updatedPosts;
        console.log(this.posts)
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id:string){
    return  {...this.posts.find(p=>p.id===id)}

  }


}
