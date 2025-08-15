import { Component, ViewChild } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { EstudianteService } from '../../../../services/APIs/backend/models/Estudiante/estudiante.service';
import { Estudiante } from '../../../../services/APIs/backend/models/Estudiante/estudiante.model';
import { EstrategiaService } from '../../../../services/APIs/backend/models/Estrategia/estrategia.service';
import { Estrategia } from '../../../../services/APIs/backend/models/Estrategia/estrategia.model';
import { HistoricoSeguimiento, HistoricoSeguimientoListResponse } from '../../../../services/APIs/backend/models/HistoricoSeguimiento/historico-seguimiento.model';
import { HistoricoSeguimientoService } from '../../../../services/APIs/backend/models/HistoricoSeguimiento/historico-seguimiento.service';
import { LoadingComponent } from '../../../../templates/loading/loading.component';
import { DatePipe } from '../../../../templates/pipes/date.pipe';
import { MessagesComponent } from '../../../../templates/messages/messages.component';

@Component({
  selector: 'app-strategy-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, LoadingComponent, DatePipe, MessagesComponent],
  templateUrl: './strategy-detail.component.html',
  styleUrl: './strategy-detail.component.scss'
})

export class StrategyDetailComponent {

  @ViewChild(MessagesComponent) messagesComponent!: MessagesComponent;

  /**
   * Variables booleanas para mostrar carga, exito y error
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
   * ID de la estrategia obtenida de la ruta activa.
   * @protected
   * @type {string | null}
   */
  protected idStrategy: string | null = null;

  /**
     * Información del estudiante obtenida del servicio StudentInfoService
     * @protected
     * @type {Estudiante | null}
     */
  protected studentInfo: Estudiante | null = null;

  /**
   * Estrategia de apoyo al estudiante.
   * @protected
   * @type {Estrategia | null}
   */
  protected strategy: Estrategia | null = null;

  /**
   * Lista de seguimientos a la estrategia.
   * @protected
   * @type {HistoricoSeguimiento[]}
   */
  protected strategyFollowUpList: HistoricoSeguimientoListResponse = {
    count: 0,
    next: null,
    previous: null,
    results: []
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
       * @param {EstudianteService} estudianteService - Servicio para manejar los estudiantes.
       * @param {Router} router - Router para redirigir al usuario.
       * @param {EstrategiaService} estrategiaService - Servicio para manejar las estrategias de apoyo al estudiante.
       * @param {HistoricoSeguimientoService} historicoSeguimientoService - Servicio para manejar el historial de seguimiento.
       * @param {ActivatedRoute} route - Ruta activa para obtener parámetros de la URL.
   */
  constructor(
    private estrategiaService: EstrategiaService,
    private studentInfoService: EstudianteService,
    private historicoSeguimientoService: HistoricoSeguimientoService,
    private router: Router,
    private route: ActivatedRoute
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
    this.idStrategy = this.route.snapshot.paramMap.get('idStrategy');
    if (!this.idStrategy) {
      this.router.navigate(['/students/student-support-strategy']);
      return;
    }
    this.getStrategyDetails();
    this.getFollowUp();
  }

  /**
   * Método para obtener los detalles de la estrategia de apoyo al estudiante.
   * @method getStrategyDetails
   * @returns {void}
   */
  protected getStrategyDetails(): void {
    this.isLoading = true;
    if (!this.idStrategy) {
      this.isLoading = false;
      this.showMessage('error', "No se pudo obtener la estrategia, por favor intente más tarde.");
      return;
    }

    this.estrategiaService.getEstrategiaById(this.idStrategy).subscribe({
      next: (response: Estrategia) => {
        this.strategy = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.showMessage('error', "Error al cargar la estrategia: " + error.message);
      }
    });
  }

  /**
   * Método para obtener el historial de seguimiento de la estrategia.
   * @method getFollowUp
   * @returns {void}
   */
  protected getFollowUp(): void {
    this.isLoading = true;
    if (!this.idStrategy) {
      this.isLoading = false;
      this.showMessage('error', "No se pudo obtener el historial de seguimiento, por favor intente más tarde.");
      return;
    }
    this.historicoSeguimientoService.getHistoricoSeguimientoByEstrategia(this.page, this.idStrategy).subscribe({
      next: (response: HistoricoSeguimientoListResponse) => {
        this.strategyFollowUpList = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.showMessage('error', "Error al cargar el historial de seguimiento: " + error.message);
      }
    });
  }

  /**
   * Método para crear un seguimiento a la estrategia de apoyo al estudiante.
   * @method createFollowUp
   * @returns {void}
   */
  protected createFollowUp(): void {
    this.isLoading = true;
    if (!this.strategyDetailForm.valid || !this.idStrategy) {
      this.isLoading = false;
      this.showMessage('error', "Por favor complete todos los campos requeridos.");
      return;
    }
    const historicoSeguimiento: HistoricoSeguimiento = {
      titulo: this.strategyDetailForm.value.title,
      observaciones: this.strategyDetailForm.value.description,
      seguimiento: this.idStrategy
    };
    this.historicoSeguimientoService.createHistoricoSeguimiento(historicoSeguimiento).subscribe({
      next: (response: HistoricoSeguimiento) => {
        this.isLoading = false;
        this.showMessage('success', "Seguimiento creado exitosamente.");
        this.strategyFollowUpList.results.push(response);
        this.strategyDetailForm.reset();
      },
      error: (error) => {
        this.isLoading = false;
        this.showMessage('error', "Error al crear el seguimiento: " + error.message);
      }
    });
  }



  get totalPages(): number {
    return Math.ceil(this.strategyFollowUpList.count / (this.historicoSeguimientoService.getCustomPageSize())) || 1;
  }

  protected onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.getFollowUp();

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
