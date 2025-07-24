import { PlanEstudio } from "../PlanEstudio/plan-estudio.model";
import { Tipologia } from "../Tipologia/tipologia.model";
import { Asignatura } from "../Asignatura/asignatura.model";

export interface AsignaturaPlan {
  id: string;
  asignatura?: Asignatura;
  asignaturaId?: string;
  plan_estudio?: PlanEstudio;
  plan_estudioId?: string;
  tipologia?: Tipologia;
  tipologiaId?: string;
  fecha_modificacion?: Date;
}

export interface PlanesAsignatura {
  tipologia: Tipologia;
  planes: AsignaturaPlan[];
}