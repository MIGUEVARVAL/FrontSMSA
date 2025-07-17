import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoricoSeguimiento, HistoricoSeguimientoListResponse } from './historico-seguimiento.model';
import { UrlBackendService } from '../../url-backend.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricoSeguimientoService {

  private readonly CustomPageSize = 20;

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'historico-seguimiento/';
  }

  // Obtener el historial de seguimiento de un estudiante
  getHistoricoSeguimientoList(page: number, estudianteId: string): Observable<HistoricoSeguimientoListResponse> {
    let params = `page=${page}&estudiante_id=${estudianteId}`;
    return this.http.get<HistoricoSeguimientoListResponse>(`${this.apiUrl}?${params}`);
  }

  // Obtener un seguimiento por ID
  getHistoricoSeguimientoById(id: string): Observable<HistoricoSeguimiento> {
    return this.http.get<HistoricoSeguimiento>(`${this.apiUrl}${id}/`);
  }

  // Obtener el historial de seguimiento por estrategia
  getHistoricoSeguimientoByEstrategia(page: number, estrategiaId: string): Observable<HistoricoSeguimientoListResponse> {
    return this.http.get<HistoricoSeguimientoListResponse>(`${this.apiUrl}?estrategia_id=${estrategiaId}`);
  }

  // Crear un nuevo seguimiento
  createHistoricoSeguimiento(historico: HistoricoSeguimiento): Observable<HistoricoSeguimiento> {
    return this.http.post<HistoricoSeguimiento>(`${this.apiUrl}`, historico);
  }

  getCustomPageSize(): number {
    return this.CustomPageSize;
  }


}
