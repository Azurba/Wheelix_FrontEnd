import { Component } from '@angular/core';
import { CarModel } from 'src/app/Model/CarModel';
import { OrderBuilderService } from 'src/app/services/order-builder.service';

@Component({
  selector: 'app-vehicle-section',
  templateUrl: './vehicle-section.component.html',
  styleUrls: ['./vehicle-section.component.scss']
})
export class VehicleSectionComponent {

  vehicleArray : CarModel[] = [];

  totalDays : number = 1;

  constructor(private ob : OrderBuilderService) {
  }

  ngOnInit() : void{
    this.calculateTotalDays();
    this.getVehicles();
  }

  getVehicles() {
    this.ob.getAllVehicles().subscribe({
      next: (response: CarModel[]) => {
        this.vehicleArray = response;
      },
      error: (error) => {
        console.log('Error getting additionals', error);
      }
    });
  }

  calculateTotalDays() {
    let timeDiff = 0;
    if(this.ob.startDate != undefined && this.ob.endDate != undefined){
      timeDiff = Math.abs(this.ob.endDate.getTime() - this.ob.startDate.getTime());
    }
    this.totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //console.log(this.totalDays);
  }

  selectedVehicle(carType : string, manufacturer : string, model : string, price : number, img : string){
    this.ob.carName = manufacturer + " " + model;
    this.ob.carType = carType;
    this.ob.total = price * this.totalDays;
    this.ob.carImg = img;
    // console.log(this.ob.carName);
    // console.log(this.ob.carType);
    // console.log(this.ob.total);
  }
}
