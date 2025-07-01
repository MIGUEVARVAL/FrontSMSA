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

  /**
   * Carga un archivo al backend para crear estudiantes activos.
   * @param file El archivo a cargar.
   * @returns Un Observable que emite la respuesta del backend.
   */
  loadFileActiveStudents(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}estudiantes-activos/`, formData);
  }

  /**
   * Carga un archivo al backend para crear estudiantes en riesgo.
   * @param facultad El ID de la facultad a la que pertenecen los estudiantes.
   * @returns Un Observable que emite la respuesta del backend.
   */
  loadFileStudentsRisk(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}estudiantes-riesgo/`, formData);
  }

  /**
   * Carga un archivo al backend para cargar las notas de los estudiantes.
   * @param file El archivo a cargar.
   * @returns Un Observable que emite la respuesta del backend.
   */
  loadFileFinalGrades(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}notas-finales/`, formData);
  }



}
