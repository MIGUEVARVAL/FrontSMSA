import { Component, ViewContainerRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/APIs/backend/authentication/auth.service';
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
  protected nivel_permisos: number | null = null;

  /**
   * @param {AuthService} authService - Servicio de autenticación.
   * @param {Router} route - Servicio de enrutamiento para redirección.
   */
  constructor(
    private authService: AuthService,
    private route : Router
  ) {
  }

  /**
   * Función que se ejecuta al inicializar el componente.
   * @returns {void}
   * @ngOnInit
   */
  ngOnInit(): void {
    this.getInfoUser();
  }

  /**
   * Método para obtener la información del usuario logueado.
   * @returns {void}
   * @protected
   */
  protected getInfoUser(): void {
    // Se suscribe al observable del servicio de autenticación para obtener la información del usuario.
    this.subscriptionUserInfo = this.authService.userInfo$.subscribe((user) => {
      this.login = user?.username ?? null;
      const fullName = user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : null;
      this.fullName = fullName;
      this.nivel_permisos = user?.nivel_permisos ?? null;
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
    this.nivel_permisos = null;
  }

  /**
   * Se cancela la suscripción para evitar fugas de memoria.
   * @returns {void}
   * @ngOnDestroy
   */
  ngOnDestroy(): void {
    this.subscriptionUserInfo.unsubscribe();
    
  }

}
