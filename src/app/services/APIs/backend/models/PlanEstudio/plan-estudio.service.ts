import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanEstudio, PlanEstudioListResponse, PlanEstudioFilters } from './plan-estudio.model';
import { UrlBackendService } from '../../url-backend.service';

@Injectable({
  providedIn: 'root'
})
export class PlanEstudioService {

  private readonly CustomPageSize = 20; 

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'plan-estudio/';
  }
  
  getPlanEstudioList(page: number = 1, planEstudio?: PlanEstudioFilters): Observable<PlanEstudioListResponse> {
    let params = `page=${page}`;
    if (planEstudio) {
      if (planEstudio.id) {
        params += `&id=${encodeURIComponent(planEstudio.id)}`;
      }
      if (planEstudio.nombre) {
        params += `&nombre=${encodeURIComponent(planEstudio.nombre)}`;
      }
      if (planEstudio.codigo) {
        params += `&codigo=${encodeURIComponent(planEstudio.codigo)}`;
      }
      if (planEstudio.facultadId) {
        params += `&facultad_id=${planEstudio.facultadId}`;
      }
      if (planEstudio.tipo_nivel) {
        params += `&tipo_nivel=${encodeURIComponent(planEstudio.tipo_nivel)}`;
      }
      if (planEstudio.nivel) {
        params += `&nivel=${encodeURIComponent(planEstudio.nivel)}`;
      }
      if (planEstudio.activo !== undefined && planEstudio.activo !== null) {
        params += `&activo=${planEstudio.activo}`;
      }
      if (planEstudio.orderBy) {
        params += `&orderBy=${encodeURIComponent(planEstudio.orderBy)}`;
      }
      if (planEstudio.orderDirection) {
        params += `&orderDirection=${encodeURIComponent(planEstudio.orderDirection)}`;
      }
    }
    return this.http.get<PlanEstudioListResponse>(`${this.apiUrl}?${params}`);
  }

  getPlanEstudioById(id: string): Observable<PlanEstudio> {
    return this.http.get<PlanEstudio>(`${this.apiUrl}${id}/`);
  }

  getCustomPageSize(): number {
    return this.CustomPageSize;
  }

}
