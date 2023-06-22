import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdditionalsModel } from 'src/app/Model/additionalsModel';
import { OrderBuilderService } from 'src/app/services/order-builder.service';

@Component({
  selector: 'app-confirm-section',
  templateUrl: './confirm-section.component.html',
  styleUrls: ['./confirm-section.component.scss']
})
export class ConfirmSectionComponent {

  contactForm: FormGroup = new FormGroup({});
  ob : OrderBuilderService;
  grandTotal? : number;
  isModalOpen : boolean = false;
  
  driverAcknowledged : boolean = false;
  paymentAcknowledged : boolean = false;
  licenseAcknowledged : boolean = false;


  constructor(private _formBuilder: FormBuilder, private ob_ : OrderBuilderService, private router : Router) {
    this.ob = ob_;
  }

  ngOnInit() : void{
    this.contactForm = this._formBuilder.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  confirmOrder(){
    if (this.contactForm.valid) {
      const fullName = this.contactForm.get('fullName')?.value;
      const phone = this.contactForm.get('phone')?.value;
      const email = this.contactForm.get('email')?.value;
      // Store the form values in your desired location
      // For example, you can set them in the OrderBuilderService
      this.ob.driverName = fullName;
      this.ob.driverPhone = phone;
      this.ob.driverEmail = email;

      this.ob.submitRentalOrder();
      this.openModal();
    }
  }

  printOrder(){
    window.print();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.router.navigateByUrl('/home');
  }
}