import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  
  let currentUser = inject(AuthService).session
  
  if(currentUser){

    if(!currentUser.isActive){
      return true
    }
    
    if(currentUser.isAdmin){
      inject(Router).navigateByUrl('/admin-dashboard')
    } else inject(Router).navigateByUrl('/dashboard')

    return false }

  else
    {
      return true};

};
