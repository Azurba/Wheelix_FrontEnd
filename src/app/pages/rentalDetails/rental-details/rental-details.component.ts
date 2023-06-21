import { Component } from '@angular/core';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.scss']
})
export class RentalDetailsComponent {

  isModifyModalOpen : boolean = false;
  isCancelModalOpen : boolean = false;

  openModifyModal(){
    this.isModifyModalOpen = true;
  }

  closeModifyModal(){
    this.isModifyModalOpen = false;
  }

  openCancelModal(){
    console.log("clicked" + this.isCancelModalOpen)
    this.isCancelModalOpen = true;
    console.log(this.isCancelModalOpen);
  }

  closeCancelModal(){
    this.isCancelModalOpen = false;
  }
}
