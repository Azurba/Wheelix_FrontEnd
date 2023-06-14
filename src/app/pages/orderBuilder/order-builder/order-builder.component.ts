import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { mapLocationsData } from 'src/app/Data/mapLocationsData';
import { mapLocations } from 'src/app/Model/mapLocations';


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

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  pointsOfInterest : mapLocations[] = [];

  constructor(private _formBuilder: FormBuilder, mapLocations : mapLocationsData ) {
    this.pointsOfInterest = mapLocations.pointsOfInterest;
    console.log(this.pointsOfInterest);
  }

  ngOnInit() : void{
    setTimeout(() => {
      this.initializeMap();
    }, 0);
  }

  initializeMap(): void {
    const map = L.map('map').setView([51.505, -0.09], 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(map);
  
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
    const marker = L.marker(poi.coordinates).addTo(map);
    marker.on('click', () => {
      this.showPOIDetails(poi);
    });
  });

  }

  showPOIDetails(poi: mapLocations): void {
    // Implement your logic to display the details of the point of interest
    console.log(poi.name, poi.address);
  }
  
}
