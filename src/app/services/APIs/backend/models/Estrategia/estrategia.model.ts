export interface Estrategia {
    id?: number;
    fechaCreacion?: string;
    titulo: string;
    observaciones: string | null;
    estudiante?: string; 
}

export interface EstrategiaListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Estrategia[];
}