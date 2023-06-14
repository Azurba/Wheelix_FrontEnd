import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { mapLocationsData } from 'src/app/Data/mapLocationsData';
import { mapLocations } from 'src/app/Model/mapLocations';
import { OrderBuilderService } from 'src/app/services/order-builder.service';


@Component({
  selector: 'app-order-builder',
  templateUrl: './order-builder.component.html',
  styleUrls: ['./order-builder.component.scss']
})
export class OrderBuilderComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  pointsOfInterest : mapLocations[] = [];

  start? : Date;
  end? : Date;
  location : string = 'Fort Collins';
  age : number = -1;

  map?: L.Map

  constructor(private _formBuilder: FormBuilder, mapLocations : mapLocationsData, private ob : OrderBuilderService) {
    this.pointsOfInterest = mapLocations.pointsOfInterest;
    console.log(this.pointsOfInterest);
  }

  ngOnInit() : void{
    setTimeout(() => {
      this.initializeMap();
    }, 0);
    this.start = this.ob.start;
    this.end = this.ob.end;
    this.location = this.ob.location;
    // this.age = this.ob.age;
    // console.log(this.start);
    // console.log(this.end);
    // console.log(this.location);
    // console.log(this.age);
  }

  initializeMap(): void {
    // const map = L.map('map').setView([39.658775, -98.333763], 13);
    this.map = L.map('map');
    const usaBounds = L.latLngBounds([[49.384358, -125.000000], [24.396308, -66.934570]]);
    this.map.fitBounds(usaBounds);
    this.map.setZoom(4);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(this.map);
  
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
  });
  Marker.prototype.options.icon = iconDefault;
  this.pointsOfInterest.forEach(poi => {
    if(this.map){
      const marker = L.marker(poi.coordinates).addTo(this.map);
      marker.on('click', () => {
        this.showPOIDetails(poi);
      });
    }
  });
  }
  showPOIDetails(poi: mapLocations): void {
    // Implement your logic to display the details of the point of interest
    console.log(poi.name, poi.address);
  }

  selectLocation(selectedCoordinates : L.LatLngExpression): void {
    if (this.map) {
      this.map.setView(selectedCoordinates, 15);
    }
  }
  
  
}
