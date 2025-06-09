import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentInfoService } from '../../../../services/student/student-info.service';

@Component({
  selector: 'app-student-support-strategy',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './student-support-strategy.component.html',
  styleUrl: './student-support-strategy.component.scss'
})
export class StudentSupportStrategyComponent {

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

  /**
   * Lista de estrategias de apoyo al estudiante.
   * @protected
   * @type {Array<any>}
   */
  protected strategies: any= [
    {
      id: 1,
      title: 'Acompañamiento por tutor',
      date: '22 de abril de 2025',
      description: ' Se asigna el tutor José Restrepo, profesor de planta con conocimientos en matemáticas. Esto con el fin de acompañar al estudiante en asignaturas como cálculo en varias variables la cual se le ha dificultado mucho al estudiantes Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, amet deserunt est perferendis sequi consectetur. Eligendi maxime similique eaque, fugit, aliquam natus quas fugiat quos doloremque provident quasi modi? Doloribus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eaque, maiores ea dolore id a corporis voluptatibus cupiditate beatae rem distinctio quibusdam tempora rerum, eligendi assumenda! Explicabo laborum harum tenetur'
    },
    {
      id: 2,
      title: 'Programa de Orientación Vocacional',
      date: '22 de abril de 2025',
      description: 'Ofrecer orientación vocacional para ayudar a los estudiantes a elegir su camino profesional.'
    },
    {
      id: 3,
      title: 'Asesoramiento Psicológico',
      date: '22 de abril de 2025',
      description: 'Brindar apoyo psicológico para manejar el estrés y la ansiedad.'
    }
  ];

  /**
   * Formulario reactivo para la estrategia de apoyo al estudiante.
   * @protected
   * @type {FormGroup}
   */
  studentSupportStrategyForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  /**
   * @param {StudentInfoService} studentInfoService servicio para obtener la información del estudiante
   */
  constructor(
    private studentInfoService: StudentInfoService
  ) {  }

  ngOnInit() {
    // Se obtiene la información del estudiante al inicializar el componente
    this.studentInfo = this.studentInfoService.getStudentInfo();
  }

}
