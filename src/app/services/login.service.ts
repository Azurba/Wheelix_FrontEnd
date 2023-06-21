import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isUserLoggedIn = false;

  constructor(private router : Router) { }

  login(){
    this.isUserLoggedIn = true;
    this.router.navigateByUrl('/rentalDetails')
  }

  logout(){
    this.isUserLoggedIn = false;
    location.reload();
  }

  isAuthenticated() : boolean{
    return this.isUserLoggedIn;
  }
}
