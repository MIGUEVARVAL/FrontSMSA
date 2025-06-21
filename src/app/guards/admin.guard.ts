import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    const role = 'admin' // por ejemplo: 'admin' o 'user'
    if (role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/no-autorizado']); // o una página de inicio normal
      return false;
    }
  }
}
