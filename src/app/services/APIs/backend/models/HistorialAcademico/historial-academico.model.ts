import { Asignatura } from "../Asignatura/asignatura.model";
import { Tipologia } from "../Tipologia/tipologia.model";

export interface HistorialAcademico {
    semestre: string;
    estado: string;
    nota: number;
    veces_vista: number;
    estudiante: string; 
    asignatura: Asignatura; 
    tipo_cancelacion?: string | null;
    fecha_creacion?: string | null; 
    fecha_modificacion?: string | null;
} 

export interface HistorialAcademicoByPlanEstudios {
    tipologia: Tipologia;
    historialAcademico: HistorialAcademico[];
}