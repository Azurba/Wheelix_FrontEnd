import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RentalDetailsService } from '../services/rental-details.service';
import { LoginService } from '../services/login.service';

export const loginGuard: CanActivateFn = () => {
  const service = inject(LoginService);
  const router = inject(Router);

  if(service.isAuthenticated() == true){
    return true;
  }else{
    router.navigateByUrl('/rentalLogin')
    return false;
  }
};
