import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlBackendService {

  /**
   * Variables de los tamaños de paginación
   * @protected
   * @type {number}
   */
  protected CustomPageSize = 20;
  protected LargePageSize = 100;
  protected SmallPageSize = 10;

  /**
   * URL del backend
   * @protected
   * @type {string}
   */
  protected urlBackend = 'http://127.0.0.1:8000/';

  /**
   * URL de la API
   * @protected
   * @type {string}
   */
  protected urlApi = this.urlBackend + 'api/';


  constructor() { }

  /**
   * Métodos para obtener los tamaños de paginación
   * @returns {number}
   */
  public getCustomPageSize(): number {
    return this.CustomPageSize;
  }
  public getLargePageSize(): number {
    return this.LargePageSize;
  }
  public getSmallPageSize(): number {
    return this.SmallPageSize
  }


  /**
   * Método para obtener la URL del backend
   * @returns {string}
   */
  public getUrlBackend(): string {
    return this.urlBackend;
  }

  /**
   * Método para obtener la URL de la API
   * @returns {string}
   */
  public getUrlApi(): string {
    return this.urlApi;
  }



}
