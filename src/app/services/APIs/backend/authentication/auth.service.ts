import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, LoginRequest } from './auth.model';
import { UrlBackendService } from '../url-backend.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private url = "";

  constructor(private http: HttpClient, private urlApi:UrlBackendService) {
    this.url = this.urlApi.getUrlBackend() + '/auth/';
  }


  // Iniciar sesión
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}login/`, credentials);
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  // Renovar token
  refreshToken(refreshToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}refresh/`, { refreshToken });
  }

  // Guardar token en el almacenamiento local
  saveToken(token: string, refreshToken: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  // Obtener token del almacenamiento local
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}