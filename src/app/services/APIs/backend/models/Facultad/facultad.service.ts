import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facultad, FacultadListResponse } from './facultad.model';
import { UrlBackendService } from '../../url-backend.service';


@Injectable({
  providedIn: 'root'
})
export class FacultadService {
  private readonly CustomPageSize = 20; 

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'facultad/';
  }

  getFacultades(page: number, facultad?: Facultad): Observable<FacultadListResponse> {
    let params = `page=${page}`;
    if (facultad) {
      if (facultad.nombre) {
        params += `&nombre=${encodeURIComponent(facultad.nombre)}`;
      }
      if (facultad.codigo) {
        params += `&codigo=${encodeURIComponent(facultad.codigo)}`;
      }
    }
    return this.http.get<FacultadListResponse>(`${this.apiUrl}?${params}`);
  }

  getFacultad(id: number): Observable<Facultad> {
    return this.http.get<Facultad>(`${this.apiUrl}${id}/`);
  }

  createFacultad(facultad: Facultad): Observable<Facultad> {
    return this.http.post<Facultad>(this.apiUrl, facultad);
  }

  updateFacultad(id: number, facultad: Partial<Facultad>): Observable<Facultad> {
    return this.http.patch<Facultad>(`${this.apiUrl}${id}/`, facultad);
  }

  deleteFacultad(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  getCustomPageSize(): number {
    return this.CustomPageSize;
  }

}