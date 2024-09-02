import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  let currentUser = inject(AuthService).session
  
  if(currentUser){

    if(!currentUser.isActive){
      inject(Router).navigateByUrl('/login')
      return false
    } else if (currentUser.isAdmin){
      inject(Router).navigateByUrl('/admin-dashboard')
      return false
    }
    else {return true} 
  } else
    {
      inject(Router).navigateByUrl('/login')
      return false};
};
