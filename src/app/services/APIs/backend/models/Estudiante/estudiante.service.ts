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
  getEstudiantesList(page: number, estudiante?:Estudiante): Observable<EstudianteListResponse> {
    let params = `page=${page}`;
    if (estudiante) {
      if (estudiante.acceso) {
        params += `&acceso=${estudiante.acceso}`;
      }
      if (estudiante.subacceso) {
        params += `&subacceso=${estudiante.subacceso}`;
      }
      if (estudiante.documento) {
        params += `&documento=${estudiante.documento}`;
      }
      if (estudiante.nombres) {
        params += `&nombres=${estudiante.nombres}`;
      }
      if (estudiante.apellidos) {
        params += `&apellidos=${estudiante.apellidos}`;
      }
      if (estudiante.plan_estudio_id) {
        params += `&programa=${estudiante.plan_estudio_id}`;
      }
      if (estudiante.correo_institucional) {
        params += `&login=${estudiante.correo_institucional}`;
      }
      if (estudiante.matricula_periodo_activo) {
        params += `&estado=${estudiante.matricula_periodo_activo}`;
      }
      if (estudiante.numero_matriculas) {
        params += `&matriculas=${estudiante.numero_matriculas}`;
      }
    }

    return this.http.get<EstudianteListResponse>(`${this.apiUrl}?${params}`);
  } 

  // Obtener estudiantes por facultad
  getEstudiantesByFacultad(page: number, codigoFacultad: string, estudiante?:Estudiante): Observable<EstudianteListResponse> {
    let params = `?page=${page}&codigoFacultad=${codigoFacultad}`;
    if (estudiante) {
      if (estudiante.acceso) {
        params += `&acceso=${estudiante.acceso}`;
      }
      if (estudiante.subacceso) {
        params += `&subacceso=${estudiante.subacceso}`;
      }
      if (estudiante.documento) {
        params += `&documento=${estudiante.documento}`;
      }
      if (estudiante.nombres) {
        params += `&nombres=${estudiante.nombres}`;
      }
      if (estudiante.apellidos) {
        params += `&apellidos=${estudiante.apellidos}`;
      }
      if (estudiante.plan_estudio_id) {
        params += `&programa=${estudiante.plan_estudio_id}`;
      }
      if (estudiante.correo_institucional) {
        params += `&login=${estudiante.correo_institucional}`;
      }
      if (estudiante.matricula_periodo_activo) {
        params += `&estado=${estudiante.matricula_periodo_activo}`;
      }
      if (estudiante.numero_matriculas) {
        params += `&matriculas=${estudiante.numero_matriculas}`;
      }
    }
    return this.http.get<EstudianteListResponse>(`${this.apiUrl}${params}`);
  }

  getCustomPageSize(): number {
    return this.CustomPageSize;
  }
  
}
