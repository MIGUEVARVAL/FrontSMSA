export interface PlanesEstudioAcuerdos {
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

export interface CreatePlanesEstudioAcuerdosRequest {
    titulo: string;
    link?: string;
    vigente: boolean;
    plan_estudio: string;
}

export interface PlanesEstudioAcuerdosFilter {
    titulo?: string;
    vigente?: boolean;
}