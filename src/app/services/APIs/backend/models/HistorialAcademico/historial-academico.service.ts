import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialAcademico, HistorialAcademicoByPlanEstudios} from './historial-academico.model';
import { UrlBackendService } from '../../url-backend.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialAcademicoService {

  private apiUrl: string;
  private apiUrlPlanEstudios: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'historial-academico/';
    this.apiUrlPlanEstudios = this.urlBackendService.getUrlApi() + 'historial-academico-by-plan-estudio/';
  }

  // Obtener historial académico de un estudiante
  getHistorialAcademicoByEstudiante(estudianteId: number): Observable<HistorialAcademico[]> {
    return this.http.get<HistorialAcademico[]>(`${this.apiUrl}?estudiante_id=${estudianteId}`);
  }

  // Obtener historial académico por plan de estudios
  getHistorialAcademicoByPlanEstudios(planEstudiosId: string, estudiante_id: number): Observable<HistorialAcademicoByPlanEstudios[]> {
    return this.http.get<HistorialAcademicoByPlanEstudios[]>(`${this.apiUrlPlanEstudios}?plan_estudio_id=${planEstudiosId}&estudiante_id=${estudiante_id}`);
  }
}
