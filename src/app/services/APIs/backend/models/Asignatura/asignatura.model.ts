import { Uab } from "../UAB/uab.model";

// Entidad de datos para una asignatura
export interface Asignatura {
  id: string;
  nombre: string;
  codigo: string;
  creditos: number;
  uab: Uab;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  descripcion: string;
  objetivos: string;
  contenido: string;
  referencias: string;
  director: string;
  fecha_aprobacion: Date | null;
  acta_aprobacion: string;
}

// Respuesta de la API para la lista de asignaturas
export interface AsignaturaResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Asignatura[];
}

// Filtros para la búsqueda de asignaturas
export interface AsignaturaFilters {
  codigo?: string;
  nombre?: string;
  uab?: Uab | string;
}

// Actualizar los campos permitidos para la asignatura
export interface AsignaturaUpdate {
  descripcion?: string;
  objetivos?: string;
  contenido?: string;
  referencias?: string;
  director?: string;
  fecha_aprobacion?: Date | null;
  acta_aprobacion?: string;
}
