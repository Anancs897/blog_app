import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  Loading=false;


  constructor(public authService:AuthService){}



  private authStatusSub=new Subscription();
 

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
 

  ngOnInit(): void {
    this.authStatusSub=this.authService.getAuthStatusListener().subscribe(
      authStatus=>{
        this.Loading=false;
      }
    )
  }


  onLogin(form:NgForm)
  {
    //console.log(form.value)
    this.Loading=true;
    this.authService.login(form.value.email,form.value.password);

  }


}
