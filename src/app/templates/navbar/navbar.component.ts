import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isLoggedIn = false;
  private subscription: Subscription = new Subscription();

  protected login: string | null = null;
  protected fullName: string | null = null;

  constructor(
    private authService: AuthenticationService,
    private route : Router
  ) {
    this.getInfoUser();
  }

  ngOnInit(): void {
    // Suscríbete al observable para recibir actualizaciones en tiempo real
    this.subscription = this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  getInfoUser(): void {
    // Obtiene la información del usuario desde el servicio de autenticación
    this.login = this.authService.getUserInfo()?.login || null;
    this.fullName = this.authService.getUserInfo()?.fullName || null;
  }

  onLogout(): void {
    this.authService.logout();
    // Redirige al usuario a la página de inicio después de cerrar sesión
    this.route.navigate(['/login']);
  }

  ngOnDestroy(): void {
    // Cancela la suscripción para evitar fugas de memoria
    this.subscription.unsubscribe();
  }

}
