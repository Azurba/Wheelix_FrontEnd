import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdditionalsModel } from 'src/app/Model/additionalsModel';
import { Observable } from 'rxjs';
import { CarModel } from '../Model/CarModel';

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

  //Used to build the rental object
  locationName?: string;
  locationAddress?: string;
  carName? : string;
  carType? : string;
  carImg? : string;
  driverName? : string;
  additionals? : string;
  startDate? : Date;
  endDate? : Date;
  total? : number;
  payment? : string;

  constructor(private router : Router, private http : HttpClient) { }

  allow(){
    this.isAllowed = true;
    this.router.navigateByUrl('/orderBuilder');
  }

  isUserAllowed(){
    return this.isAllowed;
  }

  setUpInitialData(start : Date, end : Date, location : string, age : string){
    this.startDate = start;
    this.endDate = end;
    this.location = location;
    this.age = parseInt(age);
  }

  buildRentalObject(){
    console.log("test");
  }

  public getAllAdditionals() : Observable<AdditionalsModel[]>{
    return this.http.get<AdditionalsModel[]>("https://localhost:7220/api/Additional");
  }
 
  public getAllVehicles() : Observable<CarModel[]>{
    return this.http.get<CarModel[]>("https://localhost:7220/api/Car");
  }
}
