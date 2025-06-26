export interface Asignatura {
  id: string;
  nombre: string;
  codigo: string;
  creditos: number;
  fecha_creacion: Date;
  fecha_modificacion: Date;
}

export interface AsignaturaResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Asignatura[];
}