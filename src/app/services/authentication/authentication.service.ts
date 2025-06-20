import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {


  /**
   * BehaviorSubject que mantiene el estado de autenticación del usuario.
   * @private
   * @type {BehaviorSubject<boolean>}
   */
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); 

  /**
   * Observable que emite la información del usuario logueado.
   * Permite a los componentes suscribirse para recibir actualizaciones.
   * @type {Observable<{ login: string; fullName: string; role: string } | null>}
   * @public
   */
  private userInfo: { login: string; fullName: string, role: string } | null = null; 
  private userInfoSubject = new BehaviorSubject<{ login: string; fullName: string; role: string } | null>(null);
  public userInfo$: Observable<{ login: string; fullName: string; role: string } | null> = this.userInfoSubject.asObservable();

  constructor() {

    // Verifica el estado de autenticación al iniciar el servicio
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedInSubject.next(isLoggedIn);

    // Si hay información del usuario en sessionStorage, la carga
    const userInfo = sessionStorage.getItem('userInfo');
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }

  }

  /**
   * Observable que emite el estado de autenticación del usuario.
   * Permite a los componentes suscribirse para recibir actualizaciones.
   * @type {Observable<boolean>}
   * @public
   */
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  /**
   * Funcón que guarda la información del usuario y cambia el estado de autenticación.
   * @param {string} login - Login institucional del usuario.
   * @param {string} fullName - Nombre completo del usuario.
   * @param {string} role - Rol del usuario (admin o user).
   * @returns {void}
   * @public
   */
  public login(login: string, fullName: string, role: string): void {
    this.userInfo = { login, fullName, role };
    this.isLoggedInSubject.next(true);
    this.userInfoSubject.next(this.userInfo);
    sessionStorage.setItem('isLoggedIn', 'true'); 
    sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo)); 
  }

  /**
   * Función que cierra la sesión del usuario y cambia el estado de autenticación.
   * @returns {void}
   * @pulic
   */ 
  public logout(): void {
    this.userInfo = null;
    this.isLoggedInSubject.next(false);
    this.userInfoSubject.next(null);
    sessionStorage.setItem('isLoggedIn', 'false');

  }

  /**
   * Método para obtener el estado de autenticación del usuario.
   * @returns {Observable<boolean>} Observable que emite el estado de autenticación.
   * @public
   */
  public isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  /**
   * Método para obtener el Observable del estado de autenticación del usuario.
   * @returns {{ login: string; fullName: string, role: string } | null} 
   * @public
   */
  public getUserInfo(): { login: string; fullName: string; role: string } | null {
    return this.userInfoSubject.getValue();
  }
    
}