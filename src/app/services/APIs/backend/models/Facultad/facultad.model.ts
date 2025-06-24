export interface Facultad {
  id: number;
  nombre: string;
  codigo: string;
}

export interface FacultadListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Facultad[];
}