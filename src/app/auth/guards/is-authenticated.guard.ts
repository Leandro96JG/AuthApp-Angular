import { AuthStatus } from './../interfaces/auth-status.enum';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authServices.service';


export const isAuthenticatedGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  const router      = inject(Router);

  if(authService.authStatus() === AuthStatus.authenticated){
    return true;
  }

  const url = state.url;
  localStorage.setItem('url',url);
  router.navigateByUrl('/auth/login');

  return false;
};