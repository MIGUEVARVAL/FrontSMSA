import { Component, ViewContainerRef } from '@angular/core';
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
  private subscriptionLoggedIn: Subscription = new Subscription();

  /**
   * Suscripción para manejar la información del usuario.
   * @type {Subscription}
   * @private
   */
  private subscriptionUserInfo: Subscription = new Subscription();

  /**
   * Información del usuario logueado.
   * @type {string | null}
   * @protected
   */
  protected login: string | null = null;
  protected fullName: string | null = null;
  protected role: string | null = null;

  /**
   * @param {AuthenticationService} authService - Servicio de autenticación.
   * @param {Router} route - Servicio de enrutamiento para redirección.
   * @param {ViewContainerRef} viewContainerRef - Referencia al contenedor de vistas para limpiar la vista al cerrar sesión.
   */
  constructor(
    private authService: AuthenticationService,
    private route : Router,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  /**
   * Función que se ejecuta al inicializar el componente.
   * @returns {void}
   * @ngOnInit
   */
  ngOnInit(): void {
    this.getInfoUser();
    //Se suscribe al observable del servicio de autenticación para recibir actualizaciones en tiempo real.
    this.subscriptionLoggedIn = this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  /**
   * Método para obtener la información del usuario logueado.
   * @returns {void}
   * @protected
   */
  protected getInfoUser(): void {
    // Se suscribe al observable del servicio de autenticación para obtener la información del usuario.
    this.subscriptionUserInfo = this.authService.userInfo$.subscribe((userInfo) => {
      this.login = userInfo?.login ?? null;
      this.fullName = userInfo?.fullName ?? null;
      this.role = userInfo?.role ?? null;
    });
  }

  /**
   * Método para cerrar sesión del usuario.
   * @returns {void}
   * @protected
   */
  protected onLogout(): void {
    this.authService.logout();
    this.route.navigate(['/login']);
    //Se elimina la información del usuario
    this.login = null;
    this.fullName = null;
    this.role = null;
  }

  /**
   * Se cancela la suscripción para evitar fugas de memoria.
   * @returns {void}
   * @ngOnDestroy
   */
  ngOnDestroy(): void {
    this.subscriptionLoggedIn.unsubscribe();
    this.subscriptionUserInfo.unsubscribe();
    
  }

}
