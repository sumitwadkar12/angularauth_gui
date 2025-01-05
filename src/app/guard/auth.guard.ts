import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/message.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);
  if (authService.isloggedIn()) {
    return true
  } else {
    toastService.showWarning('hey', 'Please Login First')
    router.navigate(['login'])
    return false
  }
};
