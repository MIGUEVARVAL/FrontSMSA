import { Component } from '@angular/core';
import { FacultadService } from '../../../services/APIs/backend/models/Facultad/facultad.service';
import { Facultad, FacultadListResponse } from '../../../services/APIs/backend/models/Facultad/facultad.model';
import { LoadingComponent } from '../../../templates/loading/loading.component';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-facultad',
  imports: [LoadingComponent, ReactiveFormsModule],
  standalone: true,
  templateUrl: './facultad.component.html',
  styleUrl: './facultad.component.scss'
})
export class FacultadComponent {

  /**
   * Variables booleanas para mostrar carga, exito y error
   * @protected
   * @property {boolean} isLoading - Indica el proceso de carga.
   * @property {boolean} isSuccess - Indica si la carga fue exitosa.
   * @property {string} successMessage - Mensaje de éxito a mostrar.
   * @property {boolean} isError - Indica si hubo un error en la carga.
   * @property {string} errorMessage - Mensaje de error a mostrar.
   * @property {boolean} isSuccessUpdate - Indica si la actualización fue exitosa.
   * @property {boolean} isErrorUpdate - Indica si hubo un error al actualizar.
   * @property {string} errorMessageUpdate - Mensaje de error al actualizar
   */
  protected isLoading: boolean = false;
  protected isSuccess: boolean = false;
  protected successMessage: string = '';
  protected isError: boolean = false;
  protected errorMessage: string = '';
  protected isSuccessUpdate: boolean = false;
  protected isErrorUpdate: boolean = false;
  protected errorMessageUpdate: string = '';

  /**
   * Página actual para la paginación de facultades.
   * @protected
   * @property {number} page - Número de página actual.
   */
  protected page: number = 1; 

  /**
   * Lista de facultades obtenidas.
   * @protected
   * @property {FacultadListResponse} FacultadListResponse - Lista de facultades.
   */
  protected FacultadListResponse: FacultadListResponse = {
    count: 0,
    next: null,
    previous: null,
    results: []
  };

  /**
   * Formulario reactivo para la creación y actualización de facultades.
   * @protected
   * @property {FormGroup} facultadForm - Formulario reactivo para facultades.
   */
  protected createFacultadForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    codigo: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  /**
   * Formulario reactivo para la edición de facultades.
   * @protected
   * @property {FormGroup} editFacultadForm - Formulario reactivo para editar facultades.
   */
  protected editFacultadForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    codigo: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  /**
   * Formulario reactivo para la búsqueda de facultades.
   * @protected
   * @property {FormGroup} searchFacultadForm - Formulario reactivo para
   */
  protected searchFacultadForm: FormGroup = new FormGroup({
    codigo: new FormControl(''),
    nombre: new FormControl(''), 
  });

  protected filtrosActivos: { codigo: string; nombre: string } = {
    codigo: '',
    nombre: ''
  };

  /**
   * Constructor del componente de facultades.
   * @param facultadService Servicio para manejar las operaciones de facultades.
   */
  constructor(private facultadService: FacultadService) {
    this.loadFacultades();
  }

  ngOnInit() {
    this.loadFacultades();
  }

  /**
   * Método para crear una nueva facultad.
   * Valida el formulario y envía los datos al servicio.
   * @protected
   */
  protected createFacultad(): void {
    this.isLoading = true;
    if (this.createFacultadForm.valid) {
      this.facultadService.createFacultad(this.createFacultadForm.value).subscribe({
        next: (response) => {
          this.FacultadListResponse.results.push(response);
          this.createFacultadForm.reset();
          this.isLoading = false;
          this.isSuccess = true;
          this.successMessage = 'Facultad creada exitosamente.';
        },
        error: (error) => {
          console.error('Error creating facultad:', error);
        }
      });
    }
  }

  /**
   * Método para cargar las facultades existentes.
   * @param filterData Datos de filtro opcionales para la carga de facultades.
   * @protected
   */
  protected loadFacultades(filterData?: any): void {
    this.isLoading = true;
    this.facultadService.getFacultades(this.page, filterData).subscribe({
      next: (data) => {
        this.FacultadListResponse = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Error al cargar las facultades.';
        console.error('Error loading facultades:', error);
      }
    });
  }

  /**
   * Método para eliminar una facultad.
   * @param id Identificador de la facultad a eliminar.
   * @protected
   */
  protected deleteFacultad(id: number): void {
    this.isLoading = true;
    this.facultadService.deleteFacultad(id).subscribe({
      next: () => {
        this.FacultadListResponse.results = this.FacultadListResponse.results.filter(facultad => facultad.id !== id);
        this.isLoading = false;
        this.isSuccess = true;
        this.successMessage = 'Facultad eliminada exitosamente.';
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Error al eliminar la facultad.';
        console.error('Error deleting facultad:', error);
      }
    });
  }

  /**
   * Método para editar una facultad.
   * @param facultadId Facultad a editar.
   * @protected
   */
  protected editFacultad(facultadId: number): void {
    this.isLoading = true;
    if (this.editFacultadForm.valid) {
      this.facultadService.updateFacultad(facultadId, this.editFacultadForm.value).subscribe({
        next: (response) => {
          const index = this.FacultadListResponse.results.findIndex(f => f.id === facultadId);
          if (index !== -1) {
            this.FacultadListResponse.results[index] = response;
          }
          this.isLoading = false;
          this.isSuccessUpdate = true;
          this.successMessage = 'Facultad actualizada exitosamente.';
        },
        error: (error) => {
          this.isLoading = false;
          this.isErrorUpdate = true;
          this.errorMessageUpdate = 'Error al actualizar la facultad.';
          console.error('Error updating facultad:', error);
        }
      });
    }
  }

  /**
   * Método para abrir el modal de edición de facultad.
   * @param facultad Facultad a editar.
   * @protected
   */
  protected openEditFacultadModal(facultad: Facultad): void {
    this.editFacultadForm.setValue({
      nombre: facultad.nombre,
      codigo: facultad.codigo
    });
  }

  /**
   * Método para buscar facultades por código o nombre.
   * @protected
   */
  protected searchFacultades(): void {
    this.isLoading = true;
    const searchParams = this.searchFacultadForm.value;
    this.filtrosActivos = {
      codigo: searchParams.codigo || '',
      nombre: searchParams.nombre || ''
    };
    this.loadFacultades(searchParams);
  }

  get totalPages(): number {
    return Math.ceil(this.FacultadListResponse.count / (this.facultadService.getCustomPageSize())) || 1;
  }

  protected  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadFacultades(this.searchFacultadForm.value);
    }
  }

}
