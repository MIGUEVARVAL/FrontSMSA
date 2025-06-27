import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FacultadService } from '../../../services/APIs/backend/models/Facultad/facultad.service';
import { Facultad, FacultadListResponse } from '../../../services/APIs/backend/models/Facultad/facultad.model';
import { PlanEstudioService } from '../../../services/APIs/backend/models/PlanEstudio/plan-estudio.service';
import { PlanEstudio, PlanEstudioListResponse } from '../../../services/APIs/backend/models/PlanEstudio/plan-estudio.model';

@Component({
  selector: 'app-curriculum-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './curriculum-list.component.html',
  styleUrl: './curriculum-list.component.scss'
})
export class CurriculumListComponent {

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
   * Lista de facultades obtenidas del servicio
   * @protected
   * @type {Facultad[]}
   */
  protected facultades: Facultad[] = [];

  /**
   * Lista de planes de estudio obtenidos.
   * @protected
   * @property {PlanEstudioListResponse} planEstudioListResponse - Lista de planes de estudio.
   */
  protected planEstudioListResponse: PlanEstudioListResponse = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  /**
  * Formulario reactivo para el filtro de estudiantes
  * @protected
  * @type {FormGroup}
  */
  protected filterForm = new FormGroup({
    orderBy: new FormControl(''),
    orderDirection: new FormControl('ASC'),
    codigo: new FormControl(''),
    nombre: new FormControl(''),
    nivel: new FormControl(''),
    tipo_nivel: new FormControl(''),
    activo: new FormControl(true),
    facultad: new FormControl(''),
  });

  /**
   * Objeto que almacena los filtros activos para la búsqueda de facultades.
   * @protected
   */
  protected filtrosActivos: { codigo: string; nombre: string, nivel: string, tipo_nivel: string, activo: boolean | null, facultad_id: number } = {
    codigo: '',
    nombre: '',
    nivel: '',
    tipo_nivel: '',
    activo: null,
    facultad_id: 0
  };

  /**
   * Constructor de la clase CurriculumListComponent
   * @param {PlanEstudioService} planEstudioService - Servicio para manejar los planes de estudio.
   * @param {FacultadService} facultadService - Servicio para obtener la lista de facultades
   */
  constructor(private planEstudioService: PlanEstudioService, private facultadService: FacultadService) { }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente
   * @returns {void}
   */
  ngOnInit(): void {
    this.getFacultades();
    this.loadCurriculum();
  }

  /**
   * Función para obtener la lista de facultades
   * @returns {void}
   * @protected
   */
  protected getFacultades(): void {
    this.isLoading = true;
    this.facultadService.getFacultades(1).subscribe({
      next: (response: FacultadListResponse) => {
        this.facultades = response.results;
        this.isLoading = false;
        this.isSuccess = true;
        this.successMessage = "Facultades cargadas correctamente.";
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = "Error al cargar las facultades: " + error.message;
      }
    });
  }

  protected loadCurriculum(filterData?: any): void {
    this.isLoading = true;
    this.planEstudioService
      .getPlanEstudioList(this.page, filterData)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.planEstudioListResponse = response;
        },
        error: (error) => {
          this.isLoading = false;
          this.isError = true;
          this.errorMessage =
            'Error al cargar los planes de estudio: ' + error.message;
        },
      });
  }

  get totalPages(): number {
    return Math.ceil(this.planEstudioListResponse.count / (this.planEstudioService.getCustomPageSize())) || 1;
  }

  protected  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadCurriculum(this.filterForm.value);
    }
  }


}
