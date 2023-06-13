import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderBuilderService {

  //This property wil be set to true if the user has fullfilled the date, location and age
  //correctly in the home component
  private isAllowed = false;

  constructor() { }

  allow(){
    this.isAllowed = true;
  }

  isUserAllowed(){
    return this.isAllowed;
  }
}
