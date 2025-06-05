import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Estado inicial: no logeado

  private userInfo: { login: string; fullName: string } | null = null; // Información del usuario

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

  // Observable para exponer el estado de autenticación
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  // Método para iniciar sesión
  login(login: string, fullName: string): void {
    this.userInfo = { login, fullName };
    this.isLoggedInSubject.next(true); // Cambia el estado a logeado
    sessionStorage.setItem('isLoggedIn', 'true'); // Guarda el estado en sessionStorage
    sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo)); // Guarda la información del usuario en sessionStorage
  }

  // Método para cerrar sesión
  logout(): void {
    this.userInfo = null;
    this.isLoggedInSubject.next(false); // Cambia el estado a no logeado
    sessionStorage.setItem('isLoggedIn', 'false'); // Guarda el estado en sessionStorage

  }

  // Método para verificar si el usuario está logeado
  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue(); // Obtiene el valor actual del BehaviorSubject
  }

  // Método para obtener la información del usuario
  getUserInfo(): { login: string; fullName: string } | null {
    return this.userInfo;
  }
    
}