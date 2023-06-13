import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FaqData } from 'src/app/Data/FaqData';
import { Faq } from 'src/app/Model/Faq';
import { FleetModel } from 'src/app/Model/FleetModel';
import axios from 'axios';
import { IPStackAPI } from 'src/app/Model/IPStackAPI';
import { HomeService } from 'src/app/services/home.service';
import { FleetData } from 'src/app/Data/FleetData';

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
  panelOpenState = false;

  faqArray : Array<Faq> = [];
  fleetArray : Array<FleetModel> = [];
  apiKey = '';

  constructor(private _faq : FaqData, private homeService : HomeService, private _fleet : FleetData) {
    this.faqArray = _faq.faqArray;
    this.fleetArray = _fleet.fleetArray;
    this.getApiKey();
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
        // console.log(city);
        //this.myForm.patchValue({ city: city });
      })
      .catch(error => {
        console.error('Error getting location:', error);
      });
  }
}
