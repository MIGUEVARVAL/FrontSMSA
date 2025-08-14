import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlBackendService } from '../../url-backend.service';
import { PlanesEstudioAcuerdos, UpdatePlanesEstudioAcuerdosRequest, CreatePlanesEstudioAcuerdosRequest } from './planes-estudio-acuerdos.model';

@Injectable({
  providedIn: 'root'
})
export class PlanesEstudioAcuerdosService {

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'plan-estudio-acuerdo/';
  }

  getPlanesEstudioAcuerdosList(planEstudioId: string): Observable<PlanesEstudioAcuerdos[]> {
    let params = `?plan_estudio=${encodeURIComponent(planEstudioId)}`;
    return this.http.get<PlanesEstudioAcuerdos[]>(`${this.apiUrl}${params}`);
  }

  createPlanesEstudioAcuerdo(request: CreatePlanesEstudioAcuerdosRequest): Observable<PlanesEstudioAcuerdos> {
    return this.http.post<PlanesEstudioAcuerdos>(this.apiUrl, request);
  }

  updatePlanesEstudioAcuerdo(request: UpdatePlanesEstudioAcuerdosRequest): Observable<PlanesEstudioAcuerdos> {
    return this.http.patch<PlanesEstudioAcuerdos>(`${this.apiUrl}${request.id}/`, request);
  }

  deletePlanesEstudioAcuerdo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }

}
