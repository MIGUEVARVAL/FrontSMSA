import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserListResponse } from './user.model';
import { UrlBackendService } from '../../url-backend.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'user/';
  }

  // Obtener todos los usuarios
  getUsers(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(this.apiUrl);
  }

  //Obtener usuarios con permisos igual a 0
  getUsersWithPermissionsZero(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${this.apiUrl}?nivel_permisos=0`);
  }

  // Obtener usuarios con permisos mayor a 1
  getUsersWithPermissionsGreaterThanOne(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${this.apiUrl}?nivel_permisos__gt=0`);
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}${id}/`);
  }

  // Obtener un usuario por nombre de usuario
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}?username=${username}`);
  }

  // Crear un nuevo usuario
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Actualizar un usuario existente
  updateUser(id: number, partialUser: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}${id}/`, partialUser);
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }

}