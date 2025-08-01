export interface Asignatura {
  id: string;
  nombre: string;
  codigo: string;
  creditos: number;
  uab: any;
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

export interface AsignaturaResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Asignatura[];
}