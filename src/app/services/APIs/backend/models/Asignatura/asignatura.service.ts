import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignatura, AsignaturaResponse, AsignaturaFilters, AsignaturaUpdate } from './asignatura.model';
import { UrlBackendService } from '../../url-backend.service';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  /**
   * Tamaño de página personalizado para las solicitudes paginadas.
   * @private
   */
  private readonly CustomPageSize = 20; 

  /**
   * URL base de la API para las asignaturas.
   * @private
   */
  private apiUrl: string;

  /**
   * Constructor del servicio AsignaturaService.
   * @param http - Cliente HTTP para realizar solicitudes a la API.
   * @param urlBackendService - Servicio para obtener la URL base de la API.
   */
  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'asignatura/';
  }

  /**
   * Método para obtener una lista de asignaturas con paginación y filtros.
   * @param {number} page - Número de página para la paginación.
   * @param {Object} filters - Filtros para la búsqueda de asignaturas.
   * @returns {Observable<AsignaturaResponse>} Observable que emite la respuesta de la API.
   */
  getAsignaturas(page: number = 1, filters: AsignaturaFilters = {}): Observable<AsignaturaResponse> {
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

  /**
   * Método para obtener una asignatura por su ID.
   * @param {string} id - ID de la asignatura a obtener.
   * @returns {Observable<Asignatura>} Observable que emite la asignatura solicitada.
   */
  getAsignaturaById(id: string): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.apiUrl}${id}/`);
  }

  /**
   * Método para actualizar una asignatura.
   * @param {string} id - ID de la asignatura a actualizar.
   * @param {AsignaturaUpdate} asignaturaUpdate - Datos actualizados de la asignatura.
   * @returns {Observable<Asignatura>} Observable que emite la asignatura actualizada.
   */
  updateAsignatura(id: string, asignaturaUpdate: AsignaturaUpdate): Observable<Asignatura> {
    return this.http.patch<Asignatura>(`${this.apiUrl}${id}/`, asignaturaUpdate);
  }

  /**
   * Método para obtener el tamaño de página personalizado para las solicitudes paginadas.
   * @returns {number} Tamaño de página personalizado para las solicitudes paginadas.
   */
  getCustomPageSize(): number {
    return this.CustomPageSize;
  }
}
