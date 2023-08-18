import { Component,OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsServiceService } from 'src/app/services/posts-service.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit,OnDestroy{

  //  posts:Post[] = [
  //   {title:"",description:""}
  // ]
  posts: Post[] = [];
  private postsSub!: Subscription;
 
  constructor(private postService:PostsServiceService){}

  ngOnInit():void {
    this.postService.getPosts();
    this.postsSub=this.postService.getPostUpdateListener().subscribe((posts:Post[])=>{
      this.posts=posts;
    })  
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }



}
