import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/APIs/backend/authentication/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as string[];

  if (!authService.isUserLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  const roleValue = authService.getUserInfo()?.nivel_permisos;
  const userRole = roleValue === 1 ? 'admin' : roleValue === 0 ? 'user' : '';
  if (expectedRoles && !expectedRoles.includes(userRole)) {
    return router.createUrlTree(['/']);
  }

  return true;
};