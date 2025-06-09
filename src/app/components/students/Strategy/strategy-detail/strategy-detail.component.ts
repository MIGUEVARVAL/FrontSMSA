import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentInfoService } from '../../../../services/student/student-info.service';

@Component({
  selector: 'app-strategy-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './strategy-detail.component.html',
  styleUrl: './strategy-detail.component.scss'
})

export class StrategyDetailComponent {

  /**
   * Variables booleanas para mostrar carga, exito y error
   * @protected
   * @property {boolean} isLoading - Indica si se está cargando el formulario.
   * @property {boolean} isSuccess - Indica si la carga fue exitosa.
   * @property {string} successMessage - Mensaje de éxito a mostrar.
   * @property {boolean} isError - Indica si hubo un error en la carga.
   * @property {string} errorMessage - Mensaje de error a mostrar.
   */
  protected isLoading: boolean = false;
  protected isSuccess: boolean = false;
  protected successMessage: string = "";
  protected isError: boolean = false;
  protected errorMessage: string = "";

  /**
   * Información del estudiante obtenida del servicio StudentInfoService
   * @protected
   * @type {any}
   */
  protected studentInfo: any = null;

  protected strategy: any = {
    id: 1,
    titulo: 'Acompañamiento por tutor',
    fecha: '22 de abril de 2025',
    observaciones: 'Se asigna el tutor José Restrepo, profesor de planta con conocimientos en matemáticas. Esto con el fin de acompañar al estudiante en asignaturas como cálculo en varias variables la cual se le ha dificultado mucho al estudiantes Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, amet deserunt est perferendis sequi consectetur. Eligendi maxime similique eaque, fugit, aliquam natus quas fugiat quos doloremque provident quasi modi? Doloribus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eaque, maiores ea dolore id a corporis voluptatibus cupiditate beatae rem distinctio quibusdam tempora rerum, eligendi assumenda! Explicabo laborum harum tenetur',
    registros: [
      {
        id: 2,
        fecha: '23 de abril de 2025',
        user: {
          nombre: 'Raul Restrepo',
          cargo: 'Director Ingeniría Geológica'
        },
        titulo: 'Primera sesión de tutoría',
        observaciones: 'El tutor José Restrepo ha comenzado a trabajar con el estudiante en las asignaturas de matemáticas y física.'
      },
      {
        id: 1,
        fecha: '22 de abril de 2025',
        user: {
          nombre: 'Melissa Velasco',
          cargo: 'Unidad de Permanencia Facultad Minas'
        },
        titulo : 'Asignación de tutor',
        observaciones: 'El tutor José Restrepo contacta al estudiante para coordinar las primeras sesiones de apoyo.'
      }
    ]
  };

  /**
   * Formulario reactivo para crear el seguimiento de una estrategia de apoyo al estudiante.
   * @protected
   * @type {FormGroup}
   */
  strategyDetailForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  /**
     * @param {StudentInfoService} studentInfoService servicio para obtener la información del estudiante
     */
  constructor(
    private studentInfoService: StudentInfoService
  ) { }

  ngOnInit() {
    // Se obtiene la información del estudiante al inicializar el componente
    this.studentInfo = this.studentInfoService.getStudentInfo();
  }

}
