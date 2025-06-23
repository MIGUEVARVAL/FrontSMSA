import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, LoginRequest } from './auth.model';
import { UrlBackendService } from '../url-backend.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../models/User/user.service';
import { User } from '../models/User/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /**
     * BehaviorSubject que mantiene el estado de autenticación del usuario.
     * @private
     * @type {BehaviorSubject<boolean>}
     */
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  /**
   * Observable que emite la información del usuario logueado.
   * Permite a los componentes suscribirse para recibir actualizaciones.
   * @type {Observable<User | null>}
   * @public
   */
  private userInfo: User | null = null;
  private userInfoSubject = new BehaviorSubject<User | null>(null);
  public userInfo$: Observable<User | null> = this.userInfoSubject.asObservable();

  /**
   * URL base de la API del backend.
   * @private
   * @type {string}
   */
  private url: string;

  constructor(private http: HttpClient, private urlApi: UrlBackendService, private userService: UserService) {

    this.url = this.urlApi.getUrlApi();

    // Verifica el estado de autenticación al iniciar el servicio
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedInSubject.next(isLoggedIn);

    // Si hay información del usuario en localStorage, la carga
    const userInfo = localStorage.getItem('userInfo');
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
   * Método para obtener el estado de autenticación del usuario.
   * @returns {Observable<boolean>} Observable que emite el estado de autenticación.
   * @public
   */
  public isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  /**
   * Método para obtener el Observable del estado de autenticación del usuario.
   * @returns {{ login: string; fullName: string, nivel_permisos: number } | null} 
   * @public
   */
  public getUserInfo(): User | null {
    return this.userInfoSubject.getValue();
  }

  /**
   * Funcón que guarda la información del usuario y cambia el estado de autenticación.
   * @param {LoginRequest} credentials - Credenciales de inicio de sesión del usuario.
   * @returns {Observable<AuthResponse>} Observable que emite la respuesta de autenticación.
   * @public
   */
  public login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}token/`, credentials);
  }


  public saveLoginInfo(token: string, refreshToken: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    this.userInfo = user;
    this.isLoggedInSubject.next(true);
    this.userInfoSubject.next(this.userInfo);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  }

  /**
   * Función que cierra la sesión del usuario y cambia el estado de autenticación.
   * @returns {void}
   * @public
   */
  public logout(): void {
    this.userInfo = null;
    this.isLoggedInSubject.next(false);
    this.userInfoSubject.next(null);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userInfo');
  }

  // Renovar token
  public refreshToken(refreshToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}token/refresh/`, { refreshToken });
  }

  // Obtener token del almacenamiento local
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}