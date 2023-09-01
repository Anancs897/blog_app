import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: any;
  private authStatusListenener = new Subject<boolean>();
  private isAuthenticated = false
  private tokenTimer: any
  private userId: any

  constructor(private http: HttpClient, private router: Router) { }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    if (!authInformation)
      return;
    if (authInformation?.expirationDate && authInformation.expirationDate.getTime() - now.getTime() > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId
      this.setAuthTimer(authInformation.expirationDate.getTime() - now.getTime())
      this.authStatusListenener.next(true);
    }
    // this.getAuthData();
    // const now=new Date();
    // if(this.getAuthData()?.expirationDate?>new Date()){

    // }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration)
  }

  getIsAuth() {
    return this.isAuthenticated;
  }



  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post('http://localhost:3000/user/signup', authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/login'])
      })
  }
  
  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    //console.log(authData)

    this.http.post<{ token: string, expiresIn: number, userId: any }>('http://localhost:3000/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn
          this.setAuthTimer(expiresInDuration)
          // this.tokenTimer = setTimeout(() => {
          //   this.logout();
          // }, expiresInDuration)
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListenener.next(true);

          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration)

          this.saveAuthData(token, expirationDate, this.userId)


          this.router.navigate(['/']);

        }

        //console.log(response);

      })
  }

  getUserId() {
    return this.userId
  }

  getToken() {
    return this.token
  }

  getAuthStatusListener() {
    return this.authStatusListenener.asObservable();
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListenener.next(false);
    clearTimeout(this.tokenTimer)
    this.clearAuthData();
    this.userId = null
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: any) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString())
    localStorage.setItem("userId", userId)

  }

  private clearAuthData() {
    localStorage.removeItem("token")
    localStorage.removeItem("expiration")
    localStorage.removeItem("userId")
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate)
      return;
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }

  }





}
