import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FaqData } from 'src/app/Data/FaqData';
import { Faq } from 'src/app/Model/Faq';
import { FleetModel } from 'src/app/Model/FleetModel';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  fleetArray : Array<FleetModel> = [
    {
      type: 'Compart Car',
      img: 'https://www.enterprise.com/en/home/_jcr_content/root/container/container/container_1250852314/sliding_carousel/teaser.coreimg.82.1920.png/1678300354749/compact-nissan-versa.png'
    },
    {
      type: 'Luxury Car',
      img: 'https://www.enterprise.com/en/home/_jcr_content/root/container/container/container_1250852314/sliding_carousel/teaser_671932157.coreimg.82.1920.png/1678909944677/luxury-cadi-xts.png'
    },
    {
      type: 'SUV Car',
      img: 'https://www.enterprise.com/en/home/_jcr_content/root/container/container/container_1250852314/sliding_carousel/teaser_1243252545.coreimg.82.1920.png/1678300372044/suv-santa-fe.png'
    },
    {
      type: 'Minivan',
      img: 'https://www.enterprise.com/en/home/_jcr_content/root/container/container/container_1250852314/sliding_carousel/teaser_1685349612.coreimg.82.1920.png/1678300379302/van-chrysler-pacifica.png'
    },
    {
      type: 'Pickup Truck',
      img: 'https://www.enterprise.com/en/home/_jcr_content/root/container/container/container_1250852314/sliding_carousel/teaser_1983068224.coreimg.82.1920.png/1678300346889/truck-ford-f150.png'
    },
    {
      type: 'Electric Cars',
      img: 'https://www.cars.com/i/xxlarge/in/v2/stock_photos/2c547665-9c0f-4bac-af02-35e15e5c0f1f/812aadc3-5be2-49b6-8337-22336619c613.png'
    },
    {
      type: 'Jeeps and 4X4 Cars',
      img: 'https://pngimg.com/d/jeep_PNG23.png'
    },
    {
      type: 'Moving Truck',
      img: 'https://elitetruckrental.com/wp-content/uploads/2020/04/AdobeStock_10725907geo-605x341.jpg'
    },
  ];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  panelOpenState = false;

  faqArray : Array<Faq> = [];

  constructor(_faq : FaqData) {
    this.faqArray = _faq.faqArray;
  }

  getLocation() {
    axios.get('http://api.ipstack.com/check?access_key=6317d28f0cb5d50fdabca3349bd707b2')
      .then(response => {
        const city = response.data.city;
        console.log(city);
        //this.myForm.patchValue({ city: city });
      })
      .catch(error => {
        console.error('Error getting location:', error);
      });
  }
}
