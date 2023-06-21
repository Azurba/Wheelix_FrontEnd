import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RentalDetailsService } from '../services/rental-details.service';

export const loginGuard: CanActivateFn = () => {
  const service = inject(RentalDetailsService);
  const router = inject(Router);

  if(service.isAuthenticated() == true){
    router.navigateByUrl('/rentalDetails')
    return true;
  }else{
    router.navigateByUrl('/rentalLogin')
    return false;
  }
};
