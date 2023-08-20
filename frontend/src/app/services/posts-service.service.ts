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
        return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
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

  addPost(title: string, content: string) {
    const post: Post = { id: "", title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>("http://localhost:3000/posts", post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"])
      });
  }


  updatePost(id:string,title:string,content:string){
    const post:Post={id:id,title:title,content:content};
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
