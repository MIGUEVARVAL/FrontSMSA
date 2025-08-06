import { Facultad } from "../Facultad/facultad.model";

// Entidad de datos pura
export interface PlanEstudio {
  id: string;
  codigo: string;
  nombre: string;
  nivel: string;
  tipo_nivel?: string;
  activo: boolean;
  facultad: Facultad;
  snies: string;
  plan_reformado?: boolean;
  puntos?: number;
  inicio_extincion?: string;
  extincion_definitiva?: string;
}

// Filtros/búsqueda
export interface PlanEstudioFilters {
  id?: string;
  codigo?: string;
  nombre?: string;
  facultadId?: number;
  nivel?: string;
  tipo_nivel?: string;
  activo?: boolean;
  plan_reformado?: boolean;
  inicio_extincion?: string;
  extincion_definitiva?: string;
  snies?: string;
  puntos?: number;
  page?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

// Respuesta de la API
export interface PlanEstudioListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanEstudio[];
}

// Petición de creación/actualización
export interface CreatePlanEstudioRequest {
  codigo: string;
  nombre: string;
  nivel: string;
  tipo_nivel?: string;
  activo: boolean;
  facultadId: number;
  descripcion?: string;
  snies: string;
  plan_reformado?: boolean;
  puntos?: number;
  inicio_extincion?: string;
  extincion_definitiva?: string;
}

export interface UpdatePlanEstudioRequest extends Partial<CreatePlanEstudioRequest> {
  id: string;
}