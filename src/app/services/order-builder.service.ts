import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdditionalsModel } from 'src/app/Model/additionalsModel';
import { Observable } from 'rxjs';
import { CarModel } from '../Model/CarModel';
import { DatePipe } from '@angular/common';
import { RentalOrder } from '../Model/RentalOrder';
import { ConfirmSectionComponent } from '../pages/orderBuilder/confirm-section/confirm-section.component';

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
  driverPhone? : string;
  driverEmail? : string;
  additionals : string = '';
  startDate? : Date;
  endDate? : Date;
  total? : number;
  payment : string = 'Not payed yet';
  trackingCode? : string;

  formattedStartDate: string | undefined;
  formattedEndDate: string | undefined;
  additionalsArray: AdditionalsModel[] = [];

  constructor(private router : Router, private http : HttpClient, private datePipe : DatePipe) { }

  allow(){
    this.isAllowed = true;
    this.router.navigateByUrl('/orderBuilder');
  }

  isUserAllowed(){
    return this.isAllowed;
  }

  setUpInitialData(start: Date, end: Date, location: string, age: string) {
    this.startDate = start;
    this.endDate = end;

    // Format the dates as strings
    const formattedStart = this.datePipe.transform(start, 'EEEE, MMM d yyyy');
    const formattedEnd = this.datePipe.transform(end, 'EEEE, MMM d yyyy');

    this.formattedStartDate = formattedStart !== null ? formattedStart : undefined;
    this.formattedEndDate = formattedEnd !== null ? formattedEnd : undefined;

    this.location = location;
    this.age = parseInt(age);
  }
  

  // setUpInitialData(start : Date, end : Date, location : string, age : string){
  //   this.startDate = start;
  //   this.endDate = end;
  //   this.location = location;
  //   this.age = parseInt(age);
  // }

  generateTrackingCode(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    
    this.trackingCode = code;
  }

  public getAllAdditionals() : Observable<AdditionalsModel[]>{
    return this.http.get<AdditionalsModel[]>("https://localhost:7220/api/Additional");
  }
 
  public getAllVehicles() : Observable<CarModel[]>{
    return this.http.get<CarModel[]>("https://localhost:7220/api/Car");
  }

  public submitRentalOrder(){
    this.generateTrackingCode();
    if(this.startDate != undefined && this.endDate != undefined){
      const rentalData = {
        id: 0,
        trackingCode: this.trackingCode,
        locationName: this.locationName,
        locationAddress: this.locationAddress,
        carName: this.carName,
        carType: this.carType,
        driverName: this.driverName,
        driverPhone: this.driverPhone,
        driverEmail: this.driverEmail,
        additionals: this.additionals,
        startDate: this.startDate.toISOString(), // Convert to ISO 8601 string
        endDate: this.endDate.toISOString(),
        totalCost: this.total,
        payment: this.payment
      }

    this.http.post('https://localhost:7220/api/Rental', rentalData)
      .subscribe({
        next: (response) => {
          // Handle success response
          console.log('Rental order submitted successfully:', response);
        },
        error: (error) => {
          // Handle error response
          console.error('Failed to submit rental order:', error);
        }
      });
    }
  }
  
}
