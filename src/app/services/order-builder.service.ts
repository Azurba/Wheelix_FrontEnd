import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderBuilderService {

  //This property wil be set to true if the user has fullfilled the date, location and age
  //correctly in the home component
  private isAllowed = false;

  constructor(private router : Router) { }

  allow(){
    this.isAllowed = true;
    this.router.navigateByUrl('/orderBuilder');
  }

  isUserAllowed(){
    return this.isAllowed;
  }
}
