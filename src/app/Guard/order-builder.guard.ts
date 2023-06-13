import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OrderBuilderService } from '../services/order-builder.service';

export const orderBuilderGuard: CanActivateFn = () => {
  const service = inject(OrderBuilderService);
  const router = inject(Router);

  if(service.isUserAllowed() == true){
    return true
  }else{
    router.navigateByUrl('');
    return false
  }
};
