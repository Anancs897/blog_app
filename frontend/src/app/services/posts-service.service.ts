import { Injectable } from '@angular/core';
import { Post } from '../posts/post.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {

  constructor(private http:HttpClient) { }



  private posts:Post[]=[];

  private postsUpdated=new Subject<Post[]>();
  getPosts(){
    this.http.get<{id:string,message:string,posts:Post[]}>('http://localhost:3000/posts').subscribe((postData)=>{
      this.posts=postData.posts
    })
  }

  getPostUpdateListener(){
      return this.postsUpdated.asObservable();
  }

  addPost(title:string,description:string){
    const post:Post={title:title,description:description}

    this.http.post<{message:string}>('http://localhost:3000/posts',post).subscribe((responseData)=>{
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    })


  
  }

}
