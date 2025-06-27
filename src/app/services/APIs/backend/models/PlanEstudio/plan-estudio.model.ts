import { Facultad } from "../Facultad/facultad.model";

export interface PlanEstudio {
  id: string;
  nombre: string;
  codigo: string;
  facultad: Facultad;
  nivel: string;
  tipo_nivel: string;
  activo: boolean;
}

export interface PlanEstudioListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanEstudio[];
}