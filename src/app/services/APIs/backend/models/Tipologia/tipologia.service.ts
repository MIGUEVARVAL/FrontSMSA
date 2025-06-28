import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipologia } from './tipologia.model';
import { UrlBackendService } from '../../url-backend.service';

@Injectable({
  providedIn: 'root'
})
export class TipologiaService {

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'tipologia/';
  }

  getTipologiaList(page: number = 1, tipologia?: Tipologia): Observable<Tipologia[]> {
    let params = `?`;
    if (tipologia) {
      if (tipologia.id) {
        params += `id=${encodeURIComponent(tipologia.id)}`;
      }
      if (tipologia.nombre) {
        params += `&nombre=${encodeURIComponent(tipologia.nombre)}`;
      }
    }
    return this.http.get<Tipologia[]>(`${this.apiUrl}${params}`);
  }

}
