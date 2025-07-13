import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estrategia, EstrategiaListResponse } from './estrategia.model';
import { UrlBackendService } from '../../url-backend.service';

@Injectable({
  providedIn: 'root'
})
export class EstrategiaService {

  private readonly CustomPageSize = 20;

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'estrategia/';
  }

  // Obtener todas las estrategias
  getEstrategiasList(page: number, estudianteId: string): Observable<EstrategiaListResponse> {
    let params = `page=${page}&estudiante=${estudianteId}`;
    return this.http.get<EstrategiaListResponse>(`${this.apiUrl}?${params}`);
  }

  // Obtener una estrategia por ID
  getEstrategiaById(id: string): Observable<Estrategia> {
    return this.http.get<Estrategia>(`${this.apiUrl}${id}/`);
  }

  // Crear una nueva estrategia
  createEstrategia(estrategia: Estrategia): Observable<Estrategia> {
    return this.http.post<Estrategia>(`${this.apiUrl}`, estrategia);
  }

  getCustomPageSize(): number {
    return this.CustomPageSize;
  }




}
