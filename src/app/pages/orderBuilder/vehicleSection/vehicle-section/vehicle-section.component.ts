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

  start? : Date;
  end? : Date;
  totalDays = -1;

  constructor(private ob : OrderBuilderService) {
  }

  ngOnInit() : void{
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
    if(this.start != undefined && this.end != undefined){
      timeDiff = Math.abs(this.end.getTime() - this.start.getTime());
    }
    this.totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
}
