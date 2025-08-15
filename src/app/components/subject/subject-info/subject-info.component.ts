import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Asignatura } from '../../../services/APIs/backend/models/Asignatura/asignatura.model';
import { AsignaturaPlanService } from '../../../services/APIs/backend/models/AsignaturaPlan/asignatura-plan.service';
import { Uab } from '../../../services/APIs/backend/models/UAB/uab.model';
import { PlanesAsignatura } from '../../../services/APIs/backend/models/AsignaturaPlan/asignatura-plan.model';
import { AsignaturaService } from '../../../services/APIs/backend/models/Asignatura/asignatura.service';
import { LoadingComponent } from '../../../templates/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AuthService } from '../../../services/APIs/backend/authentication/auth.service';
import { MessagesComponent } from '../../../templates/messages/messages.component';

@Component({
  selector: 'app-subject-info',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, LoadingComponent, QuillModule, FormsModule, MessagesComponent],
  templateUrl: './subject-info.component.html',
  styleUrl: './subject-info.component.scss'
})
export class SubjectInfoComponent {

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
   * Variable para almacenar el nivel de permisos del usuario.
   * @protected
   * @property {number | null} nivelPermisos - Nivel de permisos del usuario.
   */
  protected nivelPermisos: number | null = null;

  /**
   * ID de la asignatura obtenida de la ruta activa.
   * @protected
   * @property {string | null} idAsignatura - ID de la asignatura.
   */
  protected idAsignatura: string | null = null;

  /**
   * Variable para almacenar la asignatura seleccionada.
   * @type {Asignatura}
   * @protected
   */
  protected asignatura: Asignatura = {
    id: '',
    nombre: '',
    codigo: '',
    creditos: 0,
    uab: {} as Uab,
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
    descripcion: '',
    objetivos: '',
    contenido: '',
    referencias: '',
    director: '',
    fecha_aprobacion: null,
    acta_aprobacion: '',
  };

  /**
   * Variable para almacenar los planes de asignatura relacionados.
   * @type {PlanesAsignatura[]}
   * @protected
   */
  protected asignaturaPlans: PlanesAsignatura[] = [];


  /**
     * Módulos de Quill para el editor de texto enriquecido.
     * @protected
     * @type {any}
     */
  protected quillModules = {
    toolbar: {
      // Configuración de la barra de herramientas del editor Quill
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // texto básico
        ['blockquote', 'link'],
        [{ list: 'ordered' }, { list: 'bullet' }],        // listas
        [{ align: [] }],                                  // alineación
        [{ 'indent': '-1' }, { 'indent': '+1' }],         // tabulación
        ['clean'],
      ],
      handlers: {}
    },
    clipboard: true
  };

  protected formats = ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link', 'list', 'bullet', 'align', 'indent'];

  /**
   * Formulario para editar la asignatura.
   * @protected
   * @type {FormGroup}
   */
  protected editSubjectForm: FormGroup = new FormGroup({
    descripcion: new FormControl('', []),
    objetivos: new FormControl('', []),
    contenido: new FormControl('', []),
    referencias: new FormControl('', []),
    director: new FormControl('', []),
    fecha_aprobacion: new FormControl('', []),
    acta_aprobacion: new FormControl('', []),
  });

  /**
   * Constructor del componente.
   * @param {AsignaturaService} asignaturaService - Servicio para manejar las asignaturas
     * @param {ActivatedRoute} route - Ruta activa para obtener parámetros de la URL.
     * @param {AsignaturaPlanService} asignaturaPlanService - Servicio para manejar los planes de asignatura.
     * @param {AuthService} authService - Servicio de autenticación para obtener información del usuario.
   */
  constructor(private asignaturaService: AsignaturaService, private asignaturaPlanService: AsignaturaPlanService, private route: ActivatedRoute, private authService: AuthService) { }

  /**
     * Método para inicializar el componente y cargar los datos del plan de estudio.
     * @returns {void}
     */
  protected ngOnInit(): void {
    this.idAsignatura = this.route.snapshot.paramMap.get('idSubject');
    this.nivelPermisos = this.authService.getUserRole();
    this.loadSubject();
    this.loadAsignaturaPlans();
  }

  /**
   * Método para cargar los datos de la asignatura.
   * @returns {void}
   */
  protected loadSubject(): void {
    if (this.idAsignatura) {
      this.isLoading = true;
      this.asignaturaService.getAsignaturaById(this.idAsignatura).subscribe({
        next: (asignatura: Asignatura) => {
          this.isLoading = false;
          this.asignatura = asignatura;
        },
        error: (error: any) => {
          this.isLoading = false;
          this.showMessage('error', "Error al cargar la asignatura: " + error.message);
        }
      });
    } else {
      this.showMessage('error', "ID de asignatura no proporcionado.");
    }
  }

  /**
   * Método para obtener los planes relacionados con la asignatura actual.
   * @returns {void}
   */
  protected loadAsignaturaPlans(): void {
    if (this.idAsignatura) {
      this.isLoading = true;
      this.asignaturaPlanService.getAsignaturaPlanByAsignatura(this.idAsignatura).subscribe({
        next: (asignaturaPlans: PlanesAsignatura[]) => {
          this.isLoading = false;
          this.asignaturaPlans = asignaturaPlans;
        },
        error: (error: any) => {
          this.isLoading = false;
          this.showMessage('error', "Error al cargar los planes de asignatura: " + error.message);
        }
      });
    } else {
      this.showMessage('error', "ID de asignatura no proporcionado.");
    }
  }

  /**
   * Método para actualizar la asignatura con los datos del formulario.
   * @returns {void}
   */
  protected updateSubject(): void {
    if (this.editSubjectForm.valid) {
      this.isLoading = true;
      const updatedData = {
        ...this.editSubjectForm.value,
        fecha_aprobacion: this.editSubjectForm.value.fecha_aprobacion
          ? new Date(this.editSubjectForm.value.fecha_aprobacion).toISOString().slice(0, 10)
          : null
      };
      console.log("Datos actualizados:", updatedData);
      this.asignaturaService.updateAsignatura(this.idAsignatura!, updatedData).subscribe({
        next: (asignatura: Asignatura) => {
          this.isLoading = false;
          this.showMessage('success', "Asignatura actualizada correctamente.");
          this.asignatura = asignatura;
        },
        error: (error: any) => {
          this.isLoading = false;
          this.showMessage('error', "Error al actualizar la asignatura: " + error.message);
        }
      });
    } else {
      this.showMessage('error', "Formulario inválido. Por favor, complete todos los campos requeridos.");
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

