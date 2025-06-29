import { Facultad } from "../Facultad/facultad.model";

export interface PlanEstudio {
  id: string;
  nombre: string;
  codigo: string;
  facultad?: Facultad;
  facultadId?: number;
  nivel: string;
  tipo_nivel: string;
  activo?: boolean;
  descripcion?: string;
  orderBy?: string;
  orderDirection?: string;
}

export interface PlanEstudioListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanEstudio[];
}