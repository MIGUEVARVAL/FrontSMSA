import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {

  constructor() { }

  /**
   * Obtiene la información del estudiante.
   * @returns Información del estudiante
   */
  getStudentInfo() {
    // This method would typically fetch student information from an API or database
    return {
      "tipo_documento": "Cédula",
      "documento": "1001226585",
      "nombres": "SOFIA",
      "apellidos": "FRANCO MONTOYA",
      "correo_institucional": "sofrancom@unal.edu.co",
      "plan_estudio": "INGENIERÍA GEOLÓGICA",
      "facultad": "Facultad de Minas",
      "avance_carrera": 65.6,
      "edad": 22,
      "genero": "Femenino",
      "telefono": null,
      "correo_alterno": "sofifranco@gmail.com",
      "papa": 3.4,
      "numero_matriculas": 11,
      "semestres_cancelados": 0,
      "reserva_cupo": 0,
      "cupo_creditos": 57,
      "creditos_pendientes": 62,
      "creditos_disponibles": -5,
      "matricula_periodo_activo": "SI",
      "acceso": "EXAMEN DE ADMISIÓN A LA UNIVERSIDAD",
      "subacceso" : "REGULAR DE PREGRADO",
      "puntaje_admision": "622,38",
      "pbm": 66,
      "apertura": "2020-1S",

    };
  }

}
