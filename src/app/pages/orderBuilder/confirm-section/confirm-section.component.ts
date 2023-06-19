import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  constructor(private _formBuilder: FormBuilder, ob : OrderBuilderService) {
    this.ob = ob;
  }

  ngOnInit() : void{
    this.contactForm = this._formBuilder.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }
}
