import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Asignatura } from '../../../services/APIs/backend/models/Asignatura/asignatura.model';
import { AsignaturaPlanService } from '../../../services/APIs/backend/models/AsignaturaPlan/asignatura-plan.service';
import { PlanesAsignatura } from '../../../services/APIs/backend/models/AsignaturaPlan/asignatura-plan.model';
import { AsignaturaService } from '../../../services/APIs/backend/models/Asignatura/asignatura.service';
import { LoadingComponent } from '../../../templates/loading/loading.component';

@Component({
  selector: 'app-subject-info',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './subject-info.component.html',
  styleUrl: './subject-info.component.scss'
})
export class SubjectInfoComponent {

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
  protected asignatura: Asignatura | null = null;

  /**
   * Variable para almacenar los planes de asignatura relacionados.
   * @type {PlanesAsignatura[]}
   * @protected
   */
  protected asignaturaPlans: PlanesAsignatura[] = [];

  /**
   * Constructor del componente.
   * @param {AsignaturaService} asignaturaService - Servicio para manejar las asignaturas
     * @param {ActivatedRoute} route - Ruta activa para obtener parámetros de la URL.
     * @param {AsignaturaPlanService} asignaturaPlanService - Servicio para manejar los planes de asignatura.
   */
  constructor(private asignaturaService: AsignaturaService, private asignaturaPlanService: AsignaturaPlanService, private route: ActivatedRoute) { }

  /**
     * Método para inicializar el componente y cargar los datos del plan de estudio.
     * @returns {void}
     */
  protected ngOnInit(): void {
    this.idAsignatura = this.route.snapshot.paramMap.get('idSubject');
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
          this.isSuccess = true;
          this.successMessage = "Asignatura cargada correctamente.";
          this.asignatura = asignatura;
        },
        error: (error: any) => {
          this.isLoading = false;
          this.isError = true;
          this.errorMessage = "Error al cargar la asignatura: " + error.message;
        }
      });
    } else {
      this.isError = true;
      this.errorMessage = "ID de asignatura no proporcionado.";
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
          this.isSuccess = true;
          this.successMessage = "Planes de asignatura cargados correctamente.";
          console.log("Planes de asignatura:", asignaturaPlans);
          this.asignaturaPlans = asignaturaPlans;
        },
        error: (error: any) => {
          this.isLoading = false;
          this.isError = true;
          this.errorMessage = "Error al cargar los planes de asignatura: " + error.message;
        }
      });
    } else {
      this.isError = true;
      this.errorMessage = "ID de asignatura no proporcionado.";
    }
  }


}
