import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rental-login',
  templateUrl: './rental-login.component.html',
  styleUrls: ['./rental-login.component.scss']
})
export class RentalLoginComponent {

  loginForm! : FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      rentalCode: [''], 
      email: [''] 
    });
  }

  login(){
    if(this.loginForm){
      const rentalCode = this.loginForm.get('rentalCode')?.value;
      const email = this.loginForm.get('email')?.value;
      console.log('Rental Code:', rentalCode);
      console.log('Email:', email);
    }
  }

}
