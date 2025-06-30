import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante, EstudianteListResponse, EstudianteFilter } from './estudiante.model';
import { UrlBackendService } from '../../url-backend.service';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private readonly CustomPageSize = 40;

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'estudiante/';
  }

  // Obtener todos los estudiantes
  getEstudiantesList(page: number, estudiante?: EstudianteFilter): Observable<EstudianteListResponse> {
    let params = `page=${page}`;
    if (estudiante) {
      params += this.getParamFilter(estudiante);
    }
    return this.http.get<EstudianteListResponse>(`${this.apiUrl}?${params}`);
  }

  // Obtener estudiantes por facultad
  getEstudiantesByFacultad(page: number, codigoFacultad: string, estudiante?: EstudianteFilter): Observable<EstudianteListResponse> {
    let params = `?page=${page}&codigoFacultad=${codigoFacultad}`;
    if (estudiante) {
      params += this.getParamFilter(estudiante);
    }
    return this.http.get<EstudianteListResponse>(`${this.apiUrl}${params}`);
  }

  getCustomPageSize(): number {
    return this.CustomPageSize;
  }

  getParamFilter(estudiante: EstudianteFilter): string {
    let params = ``;
    if (estudiante) {
      if (estudiante.orderBy) {
        params += `&orderBy=${estudiante.orderBy}`;
      }
      if (estudiante.orderDirection) {
        params += `&orderDirection=${estudiante.orderDirection}`;
      }
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
      if (estudiante.login) {
        params += `&login=${estudiante.login}`;
      }
      if (estudiante.edad !== undefined && estudiante.edad !== null && estudiante.edad !== '') {
        params += `&edad=${estudiante.edad}`;
      }
      if (estudiante.programa) {
        params += `&programa=${estudiante.programa}`;
      }
      if (estudiante.estado) {
        params += `&estado=${estudiante.estado}`;
      }
      if (estudiante.matriculas !== undefined && estudiante.matriculas !== null && estudiante.matriculas !== '') {
        params += `&matriculas=${estudiante.matriculas}`;
      }
      if (estudiante.papaMin !== undefined && estudiante.papaMin !== null) {
        params += `&papaMin=${estudiante.papaMin}`;
      }
      if (estudiante.papaMax !== undefined && estudiante.papaMax !== null) {
        params += `&papaMax=${estudiante.papaMax}`;
      }
      if (estudiante.avanceMin !== undefined && estudiante.avanceMin !== null) {
        params += `&avanceMin=${estudiante.avanceMin}`;
      }
      if (estudiante.avanceMax !== undefined && estudiante.avanceMax !== null) {
        params += `&avanceMax=${estudiante.avanceMax}`;
      }
      if (estudiante.riesgo !== undefined && estudiante.riesgo !== null) {
        params += `&estudianteRiesgo=${estudiante.riesgo}`;
      }
    }
    return params;
  }

}
