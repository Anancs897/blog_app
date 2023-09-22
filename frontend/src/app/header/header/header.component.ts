import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PostsServiceService } from 'src/app/services/posts-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
   userIsAuthenticated=false;

  private authListenerSubs!:Subscription
  public searchTerm:any="";
  constructor(private authService:AuthService,private postService:PostsServiceService){}

  ngOnInit(): void{
    this.userIsAuthenticated=this.authService.getIsAuth();
    this.authListenerSubs=this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
    })
    
  }

  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.postService.search.next(this.searchTerm)
  }

  ngOnDestroy(): void {
    
  }

  onLogout(){
    this.authService.logout();
  }
}
