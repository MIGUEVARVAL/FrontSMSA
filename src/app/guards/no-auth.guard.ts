import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/APIs/backend/authentication/auth.service';
import { CanActivateFn } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isUserLoggedIn()) {
    // Si el usuario ya está autenticado, redirige a /home
    router.navigate(['/home']);
    return false;
  }
  // Si no está autenticado, permite el acceso
  return true;
};