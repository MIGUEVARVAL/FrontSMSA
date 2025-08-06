import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlBackendService } from '../../url-backend.service';
import { PlanesEstudioAcuerdos, PlanesEstudioAcuerdosListResponse, CreatePlanesEstudioAcuerdosRequest } from './planes-estudio-acuerdos.model';

@Injectable({
  providedIn: 'root'
})
export class PlanesEstudioAcuerdosService {

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'acuerdos-plan-estudio/';
  }

  getPlanesEstudioAcuerdosList(page: number = 1, planEstudioId: string): Observable<PlanesEstudioAcuerdosListResponse> {
    let params = `?page=${page}&plan_estudio=${encodeURIComponent(planEstudioId)}`;
    return this.http.get<PlanesEstudioAcuerdosListResponse>(`${this.apiUrl}${params}`);
  }

  createPlanesEstudioAcuerdo(request: CreatePlanesEstudioAcuerdosRequest): Observable<PlanesEstudioAcuerdos> {
    return this.http.post<PlanesEstudioAcuerdos>(this.apiUrl, request);
  }

}
