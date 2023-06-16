import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mapLocationsData } from 'src/app/Data/mapLocationsData';
import { mapLocations } from 'src/app/Model/mapLocations';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { OrderBuilderService } from 'src/app/services/order-builder.service';

@Component({
  selector: 'app-map-section',
  templateUrl: './map-section.component.html',
  styleUrls: ['./map-section.component.scss']
})
export class MapSectionComponent {

  isLinear = false;

  pointsOfInterest : mapLocations[] = [];
  closestLocations: mapLocations[] = [];

  start? : Date;
  end? : Date;
  location : string = '';
  age : number = -1;
  totalDays = -1;
  map?: L.Map

  constructor(mapLocations : mapLocationsData, private ob : OrderBuilderService, private _snackBar: MatSnackBar) {
    this.pointsOfInterest = mapLocations.pointsOfInterest;
  }

  ngOnInit() : void{
    this.start = this.ob.start;
    this.end = this.ob.end;
    this.location = this.ob.location;
    this.findMatches(this.location);
    setTimeout(() => {
      this.initializeMap();
    }, 0);
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
    if(this.closestLocations.length == 0){
      this.pointsOfInterest.forEach(poi => {
        if(this.map){
          const marker = L.marker(poi.coordinates).addTo(this.map);
          marker.on('click', () => {
            //this.showPOIDetails(poi);
          });
        }
      });
    }else{
      this.closestLocations.forEach(poi => {
        if(this.map){
          const marker = L.marker(poi.coordinates).addTo(this.map);
          marker.on('click', () => {
            //this.showPOIDetails(poi);
          });
        }
      });
    }
  }
  //Discomment this if you want to add logic when the user clicks on the map markers
  
  // showPOIDetails(poi: mapLocations): void {
  //   console.log(poi.name, poi.address);
  // }

  viewOnMap(selectedCoordinates : L.LatLngExpression): void {
    if (this.map) {
      this.map.setView(selectedCoordinates, 15);
    }
  }

  selectLocation(selectedCoordinates : L.LatLngExpression, selectedName : string, selectedAddress : string): void {
    // console.log(selectedCoordinates)
    // console.log(selectedName)
    // console.log(selectedAddress)
  }
  
  findMatches(city: string): void {
    console.log(city);
    const formattedLocation = this.location.toLowerCase().replace(/^(.)(.*)$/, (_, firstChar, rest) => firstChar.toUpperCase() + rest.toLowerCase());
    this.closestLocations = this.pointsOfInterest.filter(poi => {
      const formattedAddress = poi.address.toLowerCase();
      return formattedAddress.includes(formattedLocation.toLowerCase());
    });
  
    if (this.closestLocations.length === 0) {
      this._snackBar.open(`Sorry! We do not have any locations in ${city}`, 'Close', {
        duration: 30000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

}
