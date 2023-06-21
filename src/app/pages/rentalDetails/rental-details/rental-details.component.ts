import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { RentalDetailsService } from 'src/app/services/rental-details.service';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.scss']
})
export class RentalDetailsComponent {

  isModifyModalOpen : boolean = false;
  isCancelModalOpen : boolean = false;

  constructor(private rs : RentalDetailsService, private ls : LoginService){}

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

  cancelRental(code : string){
    this.rs.deleteRentalByCode(code);
  }

  logout(){
    this.ls.logout();
  }
}
