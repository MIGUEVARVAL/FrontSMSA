import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { EstudianteService } from '../../../../services/APIs/backend/models/Estudiante/estudiante.service';
import { Estudiante } from '../../../../services/APIs/backend/models/Estudiante/estudiante.model';
import { EstrategiaService } from '../../../../services/APIs/backend/models/Estrategia/estrategia.service';
import { Estrategia, EstrategiaListResponse } from '../../../../services/APIs/backend/models/Estrategia/estrategia.model';
import { LoadingComponent } from '../../../../templates/loading/loading.component';

@Component({
  selector: 'app-student-support-strategy',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, LoadingComponent],
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
     * Página actual para la paginación.
     * @protected
     * @property {number} page - Número de página actual.
     */
  protected page: number = 1;

  /**
     * Información del estudiante obtenida del servicio StudentInfoService
     * @protected
     * @type {Estudiante | null}
     */
  protected studentInfo: Estudiante | null = null;

  /**
   * Lista de estrategias de apoyo al estudiante.
   * @protected
   * @type {EstrategiaListResponse | null}
   */
  protected strategiesListResponse: EstrategiaListResponse = {
    count: 0,
    next: null,
    previous: null,
    results: []
  };

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
       * @param {EstudianteService} estudianteService - Servicio para manejar los estudiantes.
       * @param {Router} router - Router para redirigir al usuario.
       * @param {EstrategiaService} estrategiaService - Servicio para manejar las estrategias de apoyo al estudiante.
   */
  constructor(
    private studentInfoService: EstudianteService,
    private estrategiaService: EstrategiaService,
    private router: Router
  ) { }

  /**
     * Método que se ejecuta al inicializar el componente.
     * Obtiene la información del estudiante activo y redirige si no hay un estudiante activo.
     * @method ngOnInit
     */
  ngOnInit() {
    this.studentInfo = this.studentInfoService.getStudentActive();
    this.getStrategies();
    if (!this.studentInfo) {
      this.router.navigate(['/home']);
      return;
    }
  }

  /**
   * Método para obtener la lista de estrategias de apoyo al estudiante.
   * @method getStrategies
   * @returns {void}
   */
  protected getStrategies(): void {
    this.isLoading = true;
    if (!this.studentInfo?.id) {
      return;
    }
    const estudianteId = this.studentInfo.id.toString();
    this.estrategiaService.getEstrategiasList(this.page, estudianteId).subscribe({
      next: (response: EstrategiaListResponse) => {
        this.isLoading = false;
        this.strategiesListResponse = response;
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = "Error al cargar las estrategias: " + error.message;
      }
    });
  }

  /**
   * Método para crear una nueva estrategia de apoyo al estudiante.
   * @method createStrategy
   * @returns {void}
   */
  protected createStrategy(): void {
    this.isLoading = true;
    if (!this.studentInfo?.id) {
      this.isError = true;
      this.errorMessage = "No se pudo obtener el ID del estudiante.";
      return;
    }
    const estrategia: Estrategia = {
      titulo: this.studentSupportStrategyForm.value.title,
      observaciones: this.studentSupportStrategyForm.value.description,
      estudiante: this.studentInfo.id.toString()
    };
    this.estrategiaService.createEstrategia(estrategia).subscribe({
      next: (response: Estrategia) => {
        this.isLoading = false;
        this.isSuccess = true;
        this.successMessage = "Estrategia creada correctamente.";
        this.strategiesListResponse?.results.push(response);
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = "Error al crear la estrategia: " + error.message;
      }
    });
  }

  /**
     * Lista de estrategias de apoyo al estudiante.
     * @protected
     * @type {Array<any>}
     
    protected strategiesListResponse: any = [
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
    */

  get totalPages(): number {
    return Math.ceil(this.strategiesListResponse.count / (this.estrategiaService.getCustomPageSize())) || 1;
  }

  protected onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.getStrategies();

    }
  }
}
