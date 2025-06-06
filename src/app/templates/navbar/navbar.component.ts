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

  /**
   * Variable para indicar si el usuario está logueado.
   * @type {boolean}
   * @protected
   */
  protected isLoggedIn = false;

  /**
   * Suscripción para manejar el estado de autenticación del usuario.
   * @type {Subscription}
   * @private
   */
  private subscription: Subscription = new Subscription();

  /**
   * Información del usuario logueado.
   * @type {string | null}
   * @protected
   */
  protected login: string | null = null;
  protected fullName: string | null = null;

  /**
   * @param {AuthenticationService} authService - Servicio de autenticación.
   * @param {Router} route - Servicio de enrutamiento para redirección.
   */
  constructor(
    private authService: AuthenticationService,
    private route : Router
  ) {
    this.getInfoUser();
  }

  /**
   * Función que se ejecuta al inicializar el componente.
   * @returns {void}
   * @ngOnInit
   */
  ngOnInit(): void {
    //Se suscribe al observable del servicio de autenticación para recibir actualizaciones en tiempo real.
    this.subscription = this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  /**
   * Método para obtener la información del usuario logueado.
   * @returns {void}
   * @protected
   */
  protected getInfoUser(): void {
    this.login = this.authService.getUserInfo()?.login || null;
    this.fullName = this.authService.getUserInfo()?.fullName || null;
  }

  /**
   * Método para cerrar sesión del usuario.
   * @returns {void}
   * @protected
   */
  protected onLogout(): void {
    this.authService.logout();
    this.route.navigate(['/login']);
  }

  /**
   * Se cancela la suscripción para evitar fugas de memoria.
   * @returns {void}
   * @ngOnDestroy
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
