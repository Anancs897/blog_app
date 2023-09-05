import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {

  Loading=false;
  private authStatusSub=new Subscription();
  constructor(public authService:AuthService){}

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




  onSignup(form:NgForm){
     //console.log(form.value)
  
     
    if(!form.valid)
    return;
  this.Loading=true;
    this.authService.createUser(form.value.email,form.value.password);

    



    

  }


}
