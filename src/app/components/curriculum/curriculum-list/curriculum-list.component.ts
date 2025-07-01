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
    orderDirection: new FormControl(''),
    codigo: new FormControl(''),
    nombre: new FormControl(''),
    nivel: new FormControl(''),
    tipo_nivel: new FormControl(''),
    activo: new FormControl(null),
    facultad: new FormControl(''),
  });

  /**
   * Objeto que almacena los filtros activos para la búsqueda de facultades.
   * @protected
   */
  protected filtrosActivos : any  = {};

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
    this.loadCurriculum();
    this.getFacultades();
  }

  /**
   * Función para obtener la lista de facultades
   * @returns {void}
   * @protected
   */
  protected getFacultades(): void {
    this.facultadService.getFacultades(1).subscribe({
      next: (response: FacultadListResponse) => {
        this.facultades = response.results;
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

  /**
   * Carga la lista de planes de estudio según los filtros aplicados.
   * @param filterData filtros para la búsqueda de planes de estudio
   */
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

  /**
   * Método para aplicar los filtros y buscar los planes de estudio
   * @returns {void}
   * @protected
   */
  protected searchCurriculum(): void {
    this.filtrosActivos = {
      id: '',
      nombre: this.filterForm.value.nombre ? String(this.filterForm.value.nombre) : '',
      codigo: this.filterForm.value.codigo ? String(this.filterForm.value.codigo) : '',
      facultadId: this.filterForm.value.facultad ? (Number(this.filterForm.value.facultad) || 0) : 0,
      tipo_nivel: this.filterForm.value.tipo_nivel ? String(this.filterForm.value.tipo_nivel) : '',
      nivel: this.filterForm.value.nivel ? String(this.filterForm.value.nivel) : '',
      activo: this.filterForm.value.activo !== null && this.filterForm.value.activo !== undefined ? this.filterForm.value.activo as boolean : undefined,
      orderBy: this.filterForm.value.orderBy ? String(this.filterForm.value.orderBy) : undefined,
      orderDirection: this.filterForm.value.orderDirection ? String(this.filterForm.value.orderDirection) : undefined,
    };
    this.loadCurriculum(this.filtrosActivos);
  }

  /**
   * Método para limpiar los filtros aplicados
   * @returns {void}
   * @protected
   */
  protected clearFilters(): void {
    this.filterForm.reset();
    this.filtrosActivos = {};
    this.loadCurriculum();
  }

  /**
   * Método para obtener el nombre de la facultad
   * @protected
   * @returns {string}
   */
  protected getFacultadNombre(facultad_id: string | number): string {

    const facultad = this.facultades.find(f => String(f.id) === String(facultad_id));
    return facultad ? facultad.nombre : '';

  }


  get totalPages(): number {
    return Math.ceil(this.planEstudioListResponse.count / (this.planEstudioService.getCustomPageSize())) || 1;
  }

  protected onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadCurriculum(this.filterForm.value);
    }
  }


}
