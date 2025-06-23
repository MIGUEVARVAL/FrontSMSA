import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './templates/footer/footer.component';
import { HeaderComponent } from './templates/header/header.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { AuthService } from './services/APIs/backend/authentication/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FrontSMSA';

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
   * @param {AuthService} authService - Servicio de autenticación.
   */
  constructor(
    private authService: AuthService
  ) 
  { }

  /**
   * Función que se ejecuta al inicializar el componente.
   * @returns {void}
   * @ngOnInit
   */
  ngOnInit(): void {
  this.subscriptionLoggedIn = this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
    console.log('isLoggedIn$ emitió:', loggedIn);
    this.isLoggedIn = loggedIn;
  });
}

  /**
   * Se cancela la suscripción para evitar fugas de memoria.
   * @returns {void}
   * @ngOnDestroy
   */
  ngOnDestroy(): void {
    this.subscriptionLoggedIn.unsubscribe();
    
  }
  
}
