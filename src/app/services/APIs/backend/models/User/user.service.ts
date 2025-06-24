import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserListResponse } from './user.model';
import { UrlBackendService } from '../../url-backend.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly CustomPageSize = 20; 

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'user/';
  }

  // Obtener todos los usuarios
  getUsers(page: number): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${this.apiUrl}?page=${page}`);
  }

  //Obtener usuarios con permisos igual a 0
  getUsersWithPermissionsZero(page: number, user?: User): Observable<UserListResponse> {
    let params = `nivel_permisos=0&page=${page}`;
    if (user) {
      if (user.username) {
        params += `&username=${encodeURIComponent(user.username)}`;
      }
      if (user.email) {
        params += `&email=${encodeURIComponent(user.email)}`;
      }
      if (user.first_name) {
        params += `&first_name=${encodeURIComponent(user.first_name)}`;
      }
      if (user.last_name) {
        params += `&last_name=${encodeURIComponent(user.last_name)}`;
      }
      if (user.cargo !== undefined) {
        params += `&cargo=${encodeURIComponent(user.cargo)}`;
      }
    }
    return this.http.get<UserListResponse>(`${this.apiUrl}?${params}`);
  }

  // Obtener usuarios con permisos mayor a 1
  getUsersWithPermissionsGreaterThanOne(page: number, user?: User): Observable<UserListResponse> {
    let params = `page=${page}`;
    if (user) {
      if (user.username) {
        params += `&username=${encodeURIComponent(user.username)}`;
      }
      if (user.email) {
        params += `&email=${encodeURIComponent(user.email)}`;
      }
      if (user.first_name) {
        params += `&first_name=${encodeURIComponent(user.first_name)}`;
      }
      if (user.last_name) {
        params += `&last_name=${encodeURIComponent(user.last_name)}`;
      }
      if (user.cargo !== undefined) {
        params += `&cargo=${encodeURIComponent(user.cargo)}`;
      }
      if (user.nivel_permisos !== 0) {
        params += `&nivel_permisos=${user.nivel_permisos}`;
      }
      else {
        params += `&nivel_permisos__gt=0`; 
      }
    }else {
      params += `&nivel_permisos__gt=0`;
    }
    return this.http.get<UserListResponse>(`${this.apiUrl}?${params}`);
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

  // Obtener el tamaño de página personalizado
  getCustomPageSize(): number {
    return this.CustomPageSize;
  }

}