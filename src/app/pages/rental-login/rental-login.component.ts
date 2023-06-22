import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RentalDetailsService } from 'src/app/services/rental-details.service';

@Component({
  selector: 'app-rental-login',
  templateUrl: './rental-login.component.html',
  styleUrls: ['./rental-login.component.scss']
})
export class RentalLoginComponent {

  loginForm! : FormGroup;

  constructor(private formBuilder: FormBuilder, private rd : RentalDetailsService, private guard : LoginService , ){}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      rentalCode: [''], 
      email: [''] 
    });
  }

  loginOnClick() {
    if (this.loginForm) {
      const rentalCode = this.loginForm.get('rentalCode')?.value;
      const email = this.loginForm.get('email')?.value;
      this.rd.login(rentalCode, email).subscribe({
        next: (response: string) => {
          // Handle the successful login case
          console.log("Login successful");
          this.rd.rentalCode = rentalCode;
          this.guard.login();
        },
        error: (error: any) => {
          // Handle the error case
          console.log("Login error:", error);
        }
      });
    }
  }
}
