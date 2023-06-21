import { Component } from '@angular/core';
import { RentalOrder } from 'src/app/Model/RentalOrder';
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
  

  rental? : RentalOrder;

  constructor(private rs : RentalDetailsService, private ls : LoginService){
  }

  ngOnInit() {
    console.log(this.rs.rentalCode);
    this.rs.getRentalByCode(this.rs.rentalCode).subscribe({
      next: (response: RentalOrder) => {
        this.rental = response;
        console.log(this.rental);
      },
      error: (error: any) => {
        console.log("Error fetching rental details:", error);
      }
    });
  }
  

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

  printRental(){
    window.print();
  }

  logout(){
    this.ls.logout();
  }
}
