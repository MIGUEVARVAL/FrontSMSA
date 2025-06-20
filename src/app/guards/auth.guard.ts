import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as string[];

  if (!authService.isUserLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = authService.getUserInfo()?.role ?? '';
  if (expectedRoles && !expectedRoles.includes(userRole)) {
    router.navigate(['/']);
    return false;
  }

  return true;
};