import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderBuilderService } from 'src/app/services/order-builder.service';

@Component({
  selector: 'app-confirm-section',
  templateUrl: './confirm-section.component.html',
  styleUrls: ['./confirm-section.component.scss']
})
export class ConfirmSectionComponent {

  contactForm: FormGroup = new FormGroup({});
  ob : OrderBuilderService;
  // locationName?: string;
  // locationAddress?: string;
  // carName? : string;
  // carType? : string;
  // carImg? : string;
  // driverName? : string;
  // additionals? : string;
  // startDate? : Date;
  // endDate? : Date;
  // total? : number;
  // payment? : string;
  
  constructor(private _formBuilder: FormBuilder, ob : OrderBuilderService) {
    this.ob = ob;
    // this.locationName = ob.locationName;
    // this.locationAddress = ob.locationAddress;
    // this.carName = ob.carName;
    // this.carType = ob.carType;
    // this.carImg = ob.carImg;
    // this.additionals = ob.additionals;
    // this.startDate = ob.startDate;
    // this.endDate = ob.endDate;
    // this.total = ob.total;

  }

  ngOnInit() : void{
    this.contactForm = this._formBuilder.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

}
