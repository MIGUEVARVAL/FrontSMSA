import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Asignatura, AsignaturaResponse } from '../../../services/APIs/backend/models/Asignatura/asignatura.model';
import { AsignaturaService } from '../../../services/APIs/backend/models/Asignatura/asignatura.service';
import { LoadingComponent } from '../../../templates/loading/loading.component';
import { MessagesComponent } from '../../../templates/messages/messages.component';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, LoadingComponent, MessagesComponent],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.scss'
})
export class SubjectListComponent {

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
   * Lista de asignaturas obtenidas del servicio
   * @protected
   * @type {AsignaturaResponse}
   */
  protected asignaturasResponse: AsignaturaResponse = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  /**
   * Formulario reactivo para la búsqueda de asignaturas.
   * @protected
   * @property {FormGroup} filterForm - Formulario reactivo para la búsqueda.
   */
  protected filterForm: FormGroup = new FormGroup({
    orderBy: new FormControl(''),
    orderDirection: new FormControl(''),
    codigo: new FormControl(''),
    nombre: new FormControl(''),
    uab: new FormControl(''),
  });

  /**
   * Objeto que almacena los filtros activos para la búsqueda de asignaturas.
   * @protected
   */
  protected filtrosActivos : any  = {};

  /**
   * Constructor del componente.
   * @param {AsignaturaService} asignaturaService - Servicio para manejar las asignaturas
   */
  constructor(private asignaturaService: AsignaturaService) {}

  /**
   * Método para inicializar la carga de asignaturas.
   */
  ngOnInit(): void {
    this.loadAsignaturas();
  }

  /**
   * Método para obtener la lista de asignaturas.
   * @protected
   */
  protected loadAsignaturas(filterData?: any): void {
    this.isLoading = true;
    this.asignaturaService.getAsignaturas(this.page, filterData).subscribe({
      next: (response: AsignaturaResponse) => {
        this.asignaturasResponse = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage('error', "Error al cargar las asignaturas: " + error.message);
        this.isLoading = false;
      }
    });
  }

  /**
   * Método para aplicar los filtros y recargar las asignaturas.
   * @protected
   */
  protected searchAsignaturas(): void {
    const filterData = this.filterForm.value;
    this.filtrosActivos = { ...filterData };
    this.page = 1; // Reset page to 1 on new search
    this.loadAsignaturas(this.filtrosActivos);
  }

  /**
   * Método para limpiar los filtros y recargar las asignaturas.
   * @protected
   */
  protected clearFilters(): void {
    this.filterForm.reset();
    this.filtrosActivos = {};
    this.page = 1; // Reset page to 1 on clear filters
    this.loadAsignaturas();
  }


  get totalPages(): number {
    return Math.ceil(this.asignaturasResponse.count / (this.asignaturaService.getCustomPageSize())) || 1;
  }

  protected onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadAsignaturas(this.filtrosActivos);
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
