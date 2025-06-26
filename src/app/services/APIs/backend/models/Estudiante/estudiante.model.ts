export interface Estudiante {
    id: number;
    acceso?: string;
    subacceso?: string;
    tipo_documento?: string;
    documento: string;
    nombres: string;
    apellidos: string;
    puntaje_admision?: number;
    pbm?: number;
    apertura?: string;
    genero?: string;
    edad?: number;
    correo_institucional?: string;
    correo_alterno?: string;
    telefono?: string;
    papa?: number;
    avance_carrera?: number;
    numero_matriculas?: number;
    semestres_cancelados?: number;
    reserva_cupo?: number;
    matricula_periodo_activo?: string;
    plan_estudio?: any; 
    fecha_creacion?: string; 
    cupo_creditos?: number;
    creditos_pendientes?: number;
    creditos_disponibles?: number;
}

export interface EstudianteListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Estudiante[];
}