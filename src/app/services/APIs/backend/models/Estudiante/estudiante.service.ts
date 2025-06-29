import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante, EstudianteListResponse } from './estudiante.model';
import { UrlBackendService } from '../../url-backend.service';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private readonly CustomPageSize = 20; 

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'estudiante/';
  }

  // Obtener todos los estudiantes
  getEstudiantes(page: number): Observable<EstudianteListResponse> {
    return this.http.get<EstudianteListResponse>(`${this.apiUrl}?page=${page}`);
  } 

  // Obtener estudiantes por facultad
  getEstudiantesByFacultad(page: number, codigoFacultad: string): Observable<EstudianteListResponse> {
    return this.http.get<EstudianteListResponse>(`${this.apiUrl}?page=${page}&codigoFacultad=${codigoFacultad}`);
  }

  getCustomPageSize(): number {
    return this.CustomPageSize;
  }
  
}
