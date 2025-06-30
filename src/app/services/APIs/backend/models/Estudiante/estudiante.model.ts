import { PlanEstudio } from "../PlanEstudio/plan-estudio.model";

export interface Estudiante {
    id?: number;
    acceso?: string;
    subacceso?: string;
    tipo_documento?: string;
    documento: string;
    nombres: string;
    apellidos: string;
    puntaje_admision?: number;
    pbm?: number;
    apertura?: string;
    convocatoria?: string;
    genero?: string;
    fecha_nacimiento?: Date;
    correo_institucional?: string;
    correo_alterno?: string;
    telefono?: string;
    papa?: number;
    avance_carrera?: number;
    numero_matriculas?: number;
    semestres_cancelados?: number;
    reserva_cupo?: number;
    victima_conflicto?: string;
    discapacidad?: string;
    matricula_periodo_activo?: string;
    plan_estudio?: PlanEstudio; 
    plan_estudio_id?: number;
    fecha_creacion?: Date; 
    cupo_creditos?: number;
    creditos_pendientes?: number;
    creditos_disponibles?: number;
    estudiante_riesgo?: string;
}

export interface EstudianteListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Estudiante[];
}

export interface EstudianteFilter {
    orderBy?: string;
    orderDirection?: string;
    documento?: string;
    nombres?: string;
    apellidos?: string;
    login?: string;
    edad?: number | string;
    programa?: string;
    acceso?: string;
    subacceso?: string;
    estado?: string;
    matriculas?: number | string;
    papaMin?: number;
    papaMax?: number;
    avanceMin?: number;
    avanceMax?: number;
    riesgo?: boolean;
}