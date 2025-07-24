import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsignaturaPlan, PlanesAsignatura } from './asignatura-plan.model';
import { UrlBackendService } from '../../url-backend.service';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaPlanService {

  private apiUrlAsig: string;
  private apiUrlPlanes: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrlAsig = this.urlBackendService.getUrlApi() + 'asignatura-plan/';
    this.apiUrlPlanes = this.urlBackendService.getUrlApi() + 'planes-asignatura/';
  }

  getAsignaturaPlanByPlan(planId: string): Observable<AsignaturaPlan[]> {
    let params = `plan_estudio_id=${planId}`;
    return this.http.get<AsignaturaPlan[]>(`${this.apiUrlAsig}?${params}`);
  }

  getAsignaturaPlanByAsignatura(asignaturaId: string): Observable<PlanesAsignatura[]> {
    let params = `asignatura_id=${asignaturaId}`;
    return this.http.get<PlanesAsignatura[]>(`${this.apiUrlPlanes}?${params}`);
  }
}
