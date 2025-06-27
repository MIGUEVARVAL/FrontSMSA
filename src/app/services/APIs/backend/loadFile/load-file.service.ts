import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlBackendService } from '../url-backend.service';

@Injectable({
  providedIn: 'root'
})
export class LoadFileService {

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'cargas-masivas/';
  }

  /**
   * Carga un archivo al backend para crear o actualizar planes de estudio.
   * @param file El archivo a cargar.
   * @returns Un Observable que emite la respuesta del backend.
   */
  loadFileCurriculum(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}planes-estudio/`, formData);
  }

  /**
   * Carga un archivo al backend para parametrizar asignaturas.
   * @param file El archivo a cargar.
   * @returns Un Observable que emite la respuesta del backend.
   */
  loadFileSubjectParametrization(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}parametrizacion-asignaturas/`, formData);
  }

}
