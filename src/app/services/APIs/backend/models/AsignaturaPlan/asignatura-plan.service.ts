import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsignaturaPlan } from './asignatura-plan.model';
import { UrlBackendService } from '../../url-backend.service';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaPlanService {

  private apiUrl: string;

  constructor(private http: HttpClient, private urlBackendService: UrlBackendService) {
    this.apiUrl = this.urlBackendService.getUrlApi() + 'asignatura-plan/';
  }

  getAsignaturaPlanByPlan(planId: string): Observable<AsignaturaPlan[]> {
    let params = `plan_estudio_id=${planId}`;
    return this.http.get<AsignaturaPlan[]>(`${this.apiUrl}?${params}`);
  }
}
