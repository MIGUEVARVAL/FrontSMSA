import { Facultad } from "../Facultad/facultad.model";

export interface Uab {
  id: number;
  nombre: string;
  codigo: string;
  facultad: Facultad;
}

export interface UabListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Uab[];
}