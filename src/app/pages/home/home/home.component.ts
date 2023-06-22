import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaqData } from 'src/app/Data/FaqData';
import { Faq } from 'src/app/Model/Faq';
import { FleetModel } from 'src/app/Model/FleetModel';
import axios from 'axios';
import { IPStackAPI } from 'src/app/Model/IPStackAPI';
import { HomeService } from 'src/app/services/home.service';
import { FleetData } from 'src/app/Data/FleetData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderBuilderService } from 'src/app/services/order-builder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  driverForm: FormGroup;

  panelOpenState = false;

  faqArray : Array<Faq> = [];
  fleetArray : Array<FleetModel> = [];
  apiKey = '';
  city = '';

  constructor(private _faq : FaqData, private homeService : HomeService, private _fleet : FleetData, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private ob : OrderBuilderService) {
    this.faqArray = _faq.faqArray;
    this.fleetArray = _fleet.fleetArray;
    this.getApiKey();
  
    this.driverForm = this.formBuilder.group({
      location: [null, Validators.required],
      age: [null, Validators.required]
    });
  }
  getApiKey(){
    this.homeService.getApiKey().subscribe({
      next: (response: IPStackAPI[]) => {
        this.apiKey = response[0].apiKey;
      },
      error: (error) => {
        console.error('Error getting API key:', error);
      }
    });
  }

  getLocation() {  
    axios.get(`http://api.ipstack.com/check?access_key=${this.apiKey}`)
      .then(response => {
        const city = response.data.city;
        this.city = city;
        this.driverForm.patchValue({ location: city });
      })
      .catch(error => {
        console.error('Error getting location:', error);
      });
  }

  browseVehicles(){
    if(this.driverForm.value.location != null && this.driverForm.value.age != null && this.range.value.start != null && this.range.value.end != null){
      if(this.driverForm.value.age < 20){
        this._snackBar.open('Drivers under 20 years old are not allowed to rent cars.', 'Close', { duration: 30000, horizontalPosition: 'center', verticalPosition: 'bottom' });
      }else{
        this.ob.allow();
        this.ob.setUpInitialData(this.range.value.start, this.range.value.end, this.driverForm.value.location, this.driverForm.value.age);
      }
      //console.log(this.range.value);
      //console.log('Location:', this.driverForm.value.location);
      //console.log('Driver\'s Age:', this.driverForm.value.age);
    }else{
      if(this.range.value.start === null || this.range.value.end === null){
        this._snackBar.open('Missing Information: Pick-up and Return Date', 'Close', { duration: 30000, horizontalPosition: 'center', verticalPosition: 'bottom' });
      }
      if(this.driverForm.value.location === null || this.driverForm.value.age === null){
        this._snackBar.open('Missing Information: Location and/or Driver\'s age', 'Close', { duration: 30000, horizontalPosition: 'center', verticalPosition: 'bottom' });
      }
    }
  }
}
