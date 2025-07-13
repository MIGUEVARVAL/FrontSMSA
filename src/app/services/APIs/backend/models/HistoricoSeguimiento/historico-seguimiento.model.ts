import { User } from "../User/user.model";

export interface HistoricoSeguimiento {
    id?: string;
    fecha?: string; 
    titulo: string;
    observaciones?: string | null;
    seguimiento: string;
    user?: User; 
}

export interface HistoricoSeguimientoListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: HistoricoSeguimiento[];
}
