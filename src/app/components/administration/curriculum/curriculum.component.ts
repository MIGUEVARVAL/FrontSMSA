import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoadingComponent } from '../../../templates/loading/loading.component';
import { LoadFileService } from '../../../services/APIs/backend/loadFile/load-file.service';
import { PlanEstudioService } from '../../../services/APIs/backend/models/PlanEstudio/plan-estudio.service';
import {
  PlanEstudio,
  PlanEstudioListResponse,
} from '../../../services/APIs/backend/models/PlanEstudio/plan-estudio.model';

/**
 * Utilizada para el manejo de archivos y formularios
 * @type {any}
 */
declare const kitUnal: any;

@Component({
  selector: 'app-curriculum',
  imports: [RouterModule, ReactiveFormsModule, LoadingComponent],
  standalone: true,
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.scss',
})
export class CurriculumComponent {
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
  protected successMessage: string = '';
  protected isError: boolean = false;
  protected errorMessage: string = '';

  /**
   * Página actual para la paginación.
   * @protected
   * @property {number} page - Número de página actual.
   */
  protected page: number = 1;

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
   * Formulario reactivo para la búsqueda de facultades.
   * @protected
   * @property {FormGroup} searchFacultadForm - Formulario reactivo para
   */
  protected searchCurriculumForm: FormGroup = new FormGroup({
    codigo: new FormControl(''),
    nombre: new FormControl(''),
    nivel: new FormControl(''),
    tipo_nivel: new FormControl(''),
    activo: new FormControl(''),
    facultad_id: new FormControl(''),
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
   * Formulario reactivo para cargar las notas finales
   * @protected
   * @type {FormGroup}
   */
  protected createCurriculumForm = new FormGroup({
    file: new FormControl('', Validators.required),
  });

  /**
   * Constructor del componente.
   * @param {LoadFileService} loadFileService - Servicio para manejar la carga de archivos.
   * @param {PlanEstudioService} planEstudioService - Servicio para manejar los planes de estudio.
   * @constructor
   */
  constructor(
    private loadFileService: LoadFileService,
    private planEstudioService: PlanEstudioService
  ) {}

  ngOnInit() {
    this.loadCurriculum();
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

  /**
   * Función para cargar los planes de estudio.
   * Está función se ejecuta al enviar el formulario.
   * @protected
   * @returns {void}
   */
  protected createCurriculum() {
    this.isLoading = true;
    const file = this.selectedFile;

    if (!file) {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = 'Debes seleccionar un archivo.';
      return;
    }

    this.loadFileService.loadFileCurriculum(file).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isSuccess = true;
        this.successMessage =
          'Los planes de estudio fueron cargados correctamente.';
        this.createCurriculumForm.reset();
        this.selectedFile = null;
        this.selectedFileName = null;
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Error al cargar el archivo: ' + error.message;
      },
    });
  }

  /**
   * Método para buscar los planes de estudio.
   * @protected
   */
  protected searchCurriculum(): void {
    this.isLoading = true;
    const searchParams = this.searchCurriculumForm.value;
    this.filtrosActivos = {
      codigo: searchParams.codigo || '',
      nombre: searchParams.nombre || '',
      nivel: searchParams.nivel || '',
      tipo_nivel: searchParams.tipo_nivel || '',
      activo: searchParams.activo !== '' ? searchParams.activo : null,
      facultad_id: searchParams.facultad_id || 0,
    };
  }

  /**
   * Método para limpiar los filtros de búsqueda.
   * @protected
   */
  protected clearFilters(): void {
    this.searchCurriculumForm.reset();
    this.filtrosActivos = {
      codigo: '',
      nombre: '',
      nivel: '',
      tipo_nivel: '',
      activo: null,
      facultad_id: 0,
    };
    this.loadCurriculum();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada.
   * Aquí se inicializan los componentes de carga de archivos.
   */
  ngAfterViewInit(): void {
    const formFileTriggerList = document.querySelectorAll('.form-file');
    [...formFileTriggerList].forEach((formFileTriggerEl) => {
      const formFile = new kitUnal.FormFile(formFileTriggerEl);
      formFile.init();
    });
  }

  protected selectedFile: File | null = null;

  protected selectedFileName: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0].name;
      this.selectedFile = input.files[0];
    } else {
      this.selectedFileName = '';
      this.selectedFile = null;
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.currentTarget as HTMLElement;
    dropZone.classList.add('backgrounUpLoadFile');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.currentTarget as HTMLElement;
    dropZone.classList.remove('backgrounUpLoadFile');
  }

  onDrop(event: DragEvent, fileInput: HTMLInputElement): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.selectedFile = file;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;
      this.onFileSelected({ target: fileInput } as any);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.planEstudioListResponse.count / (this.planEstudioService.getCustomPageSize())) || 1;
  }

  protected  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadCurriculum(this.searchCurriculumForm.value);
    }
  }
}
