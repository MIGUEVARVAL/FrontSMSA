import { Facultad } from "../Facultad/facultad.model";

export interface PlanEstudio {
  id: string;
  nombre: string;
  codigo: string;
  facultad: Facultad;
  nivel: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export interface PlanEstudioResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanEstudio[];
}