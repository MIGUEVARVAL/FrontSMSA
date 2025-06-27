import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanEstudio, PlanEstudioListResponse } from './plan-estudio.model';
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
  
  getPlanEstudioList(page: number = 1, planEstudio: PlanEstudio): Observable<PlanEstudioListResponse> {
    let params = `page=${page}`;
    if (planEstudio) {
      if (planEstudio.nombre) {
        params += `&nombre=${encodeURIComponent(planEstudio.nombre)}`;
      }
      if (planEstudio.codigo) {
        params += `&codigo=${encodeURIComponent(planEstudio.codigo)}`;
      }
      if (planEstudio.facultad && planEstudio.facultad.id) {
        params += `&facultad=${planEstudio.facultad.id}`;
      }
    }
    return this.http.get<PlanEstudioListResponse>(`${this.apiUrl}?${params}`);
  }

  getCustomPageSize(): number {
    return this.CustomPageSize;
  }

}
