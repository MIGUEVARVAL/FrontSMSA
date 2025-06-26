export interface Tipologia {
  id: string;
  nombre: string;
  codigo: string;
}

export interface TipologiaResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Tipologia[];
}