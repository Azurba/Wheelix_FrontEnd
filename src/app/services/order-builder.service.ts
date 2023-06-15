import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdditionalsModel } from 'src/app/Model/additionalsModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderBuilderService {

  //This property wil be set to true if the user has fullfilled the date, location and age
  //correctly in the home component
  private isAllowed = true;
  start? : Date;
  end? : Date;
  location : string = '';
  age : number = -1;

  constructor(private router : Router, private http : HttpClient) { }

  allow(){
    this.isAllowed = true;
    this.router.navigateByUrl('/orderBuilder');
  }

  isUserAllowed(){
    return this.isAllowed;
  }

  setUpInitialData(start : Date, end : Date, location : string, age : string){
    this.start = start;
    this.end = end;
    this.location = location;
    this.age = parseInt(age);
  }

  public getAllAdditionals() : Observable<AdditionalsModel[]>{
    return this.http.get<AdditionalsModel[]>("https://localhost:7220/api/Additional");
  }





}
