import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  formattedStartDate: string | null = null;
  formattedEndDate: string | null = null;
  isLoaderOpen : boolean = false;


  rental? : RentalOrder;

  constructor(private rs : RentalDetailsService, private ls : LoginService, private datePipe : DatePipe, private _snackBar : MatSnackBar){
  }

  ngOnInit() {
    this.rs.getRentalByCode(this.rs.rentalCode).subscribe({
      next: (response: RentalOrder) => {
        this.rental = response;
        this.formattedStartDate = this.datePipe.transform(this.rental.startDate, 'EEEE, MMM d yyyy');
        this.formattedEndDate = this.datePipe.transform(this.rental.endDate, 'EEEE, MMM d yyyy');
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
    this.isCancelModalOpen = true;
  }

  closeCancelModal(){
    this.isCancelModalOpen = false;
  }

  cancelRental() {
    if (this.rental !== undefined) {
      this.openLoader();
      this.rs.deleteRentalByCode(this.rental.trackingCode).subscribe({
        next: () => {
          this._snackBar.open('Your rental order was successfully canceled', 'Close', { duration: 30000, horizontalPosition: 'center', verticalPosition: 'bottom' });
          setTimeout(() => {
            this.closeCancelModal();
            this.logout();
          }, 5000);
        },
        error: (error) => {
          this._snackBar.open(`Something went wrong (${error}). Please call 1-800-999-9991`, 'Close', { duration: 30000, horizontalPosition: 'center', verticalPosition: 'bottom' });
        }
      });
    }
  }

  openLoader(){
    this.isLoaderOpen = true;
  }

  closeLoader(){
    this.isLoaderOpen = false;
  }

  printRental(){
    window.print();
  }

  logout(){
    this.ls.logout();
  }
}
