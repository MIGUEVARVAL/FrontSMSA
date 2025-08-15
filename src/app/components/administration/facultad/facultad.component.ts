import { Component, ViewChild } from '@angular/core';
import { FacultadService } from '../../../services/APIs/backend/models/Facultad/facultad.service';
import { Facultad, FacultadListResponse } from '../../../services/APIs/backend/models/Facultad/facultad.model';
import { LoadingComponent } from '../../../templates/loading/loading.component';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessagesComponent } from '../../../templates/messages/messages.component';

@Component({
  selector: 'app-facultad',
  imports: [LoadingComponent, ReactiveFormsModule, MessagesComponent],
  standalone: true,
  templateUrl: './facultad.component.html',
  styleUrl: './facultad.component.scss'
})
export class FacultadComponent {

  @ViewChild(MessagesComponent) messagesComponent!: MessagesComponent;

  /**
   * Variables booleanas para mostrar carga, exito y error
   * @protected
   * @property {boolean} isLoading - Indica el proceso de carga.
   */
  protected isLoading: boolean = false;

  /**
   * Página actual para la paginación.
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

  /**
   * Objeto que almacena los filtros activos para la búsqueda de facultades.
   * @protected
   */
  protected filtrosActivos: { codigo: string; nombre: string } = {
    codigo: '',
    nombre: ''
  };

  /**
   * Constructor del componente de facultades.
   * @param facultadService Servicio para manejar las operaciones de facultades.
   */
  constructor(private facultadService: FacultadService) {
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
          this.showMessage('success', 'Facultad creada exitosamente.');
        },
        error: (error) => {
          this.isLoading = false;
          this.showMessage('error', 'Error al crear la facultad: ' + error.message);
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
        this.showMessage('error', 'Error al cargar las facultades.');
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
        this.showMessage('success', 'Facultad eliminada exitosamente.');
      },
      error: (error) => {
        this.isLoading = false;
        this.showMessage('error', 'Error al eliminar la facultad.');
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
          this.showMessage('success', 'Facultad actualizada exitosamente.');
        },
        error: (error) => {
          this.isLoading = false;
          this.showMessage('error', 'Error al actualizar la facultad.');
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
