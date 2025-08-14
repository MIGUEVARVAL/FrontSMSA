export interface PlanesEstudioAcuerdos {
    id: string;
    titulo: string;
    link?: string;
    vigente: boolean;
    plan_estudio?: string;
    fecha_creacion: Date;
}

export interface PlanesEstudioAcuerdosListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PlanesEstudioAcuerdos[];
}

export interface PlanesEstudioAcuerdosFilter {
    titulo?: string;
    vigente?: boolean;
}

export interface CreatePlanesEstudioAcuerdosRequest {
    titulo: string;
    link?: string;
    vigente: boolean;
    plan_estudio: string;
}

export interface UpdatePlanesEstudioAcuerdosRequest {
    id: string;
    titulo?: string;
    link?: string;
    vigente?: boolean;
}