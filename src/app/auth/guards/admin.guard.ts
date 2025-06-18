import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.getUserRole() === 'admin') {
      return true;
    } else {
      // Redirige si no tiene permisos
      this.router.navigate(['/home']);
      return false;
    }
  }
}
