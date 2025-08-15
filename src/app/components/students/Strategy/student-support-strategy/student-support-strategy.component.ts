import { Component, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { EstudianteService } from '../../../../services/APIs/backend/models/Estudiante/estudiante.service';
import { Estudiante } from '../../../../services/APIs/backend/models/Estudiante/estudiante.model';
import { EstrategiaService } from '../../../../services/APIs/backend/models/Estrategia/estrategia.service';
import { Estrategia, EstrategiaListResponse } from '../../../../services/APIs/backend/models/Estrategia/estrategia.model';
import { LoadingComponent } from '../../../../templates/loading/loading.component';
import { QuillModule } from 'ngx-quill';
import { MessagesComponent } from '../../../../templates/messages/messages.component';

@Component({
  selector: 'app-student-support-strategy',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, LoadingComponent, QuillModule, MessagesComponent],
  templateUrl: './student-support-strategy.component.html',
  styleUrl: './student-support-strategy.component.scss'
})
export class StudentSupportStrategyComponent {

  @ViewChild(MessagesComponent) messagesComponent!: MessagesComponent;

  /**
   * Variables booleanas para mostrar carga
   * @protected
   * @property {boolean} isLoading - Indica si se está cargando el formulario.
   */
  protected isLoading: boolean = false;

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
    if (!this.studentInfo) {
      this.router.navigate(['/home']);
      return;
    }
    this.getStrategies();
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
        this.showMessage('error', "Error al cargar las estrategias: " + error.message);
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
      this.showMessage('error', "No se pudo obtener el ID del estudiante.");
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
        this.showMessage('success', "Estrategia creada correctamente.");
        this.studentSupportStrategyForm.reset();
        this.strategiesListResponse?.results.push(response);
      },
      error: (error) => {
        this.isLoading = false;
        this.showMessage('error', "Error al crear la estrategia: " + error.message);
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.strategiesListResponse.count / (this.estrategiaService.getCustomPageSize())) || 1;
  }

  protected onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.getStrategies();

    }
  }

  /**
     * Método unificado para mostrar mensajes
     * @param type - Tipo de mensaje ('success' o 'error')
     * @param message - Mensaje a mostrar
     */
  private showMessage(type: 'success' | 'error', message: string): void {
    if (this.messagesComponent) {
      this.messagesComponent.showMessage(type, message);
    }
  }
}
