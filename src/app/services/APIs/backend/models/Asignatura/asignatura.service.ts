import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignatura, AsignaturaResponse } from './asignatura.model';
import { UrlBackendService } from '../../url-backend.service';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private readonly CustomPageSize = 20; 

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'asignatura/';
  }

  getAsignaturas(page: number = 1, filters: any = {}): Observable<AsignaturaResponse> {
    let params = `page=${page}`;
    if (filters.codigo) {
      params += `&codigo=${filters.codigo}`;
    }
    if (filters.nombre) {
      params += `&nombre=${filters.nombre}`;
    }
    if (filters.uab) {
      params += `&uab=${filters.uab}`;
    }
    return this.http.get<AsignaturaResponse>(`${this.apiUrl}?${params}`);
  }

  getAsignaturaById(id: string): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.apiUrl}${id}/`);
  }

  getCustomPageSize(): number {
    return this.CustomPageSize;
  }
}
