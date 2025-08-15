import { Component, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../../services/APIs/backend/models/Estudiante/estudiante.service';
import { Estudiante } from '../../../services/APIs/backend/models/Estudiante/estudiante.model';
import { HistorialAcademicoService } from '../../../services/APIs/backend/models/HistorialAcademico/historial-academico.service';
import { HistorialAcademico, HistorialAcademicoByPlanEstudios } from '../../../services/APIs/backend/models/HistorialAcademico/historial-academico.model';
import { AsignaturaPlanService } from '../../../services/APIs/backend/models/AsignaturaPlan/asignatura-plan.service';
import { HistoricoSeguimientoListResponse, HistoricoSeguimiento } from '../../../services/APIs/backend/models/HistoricoSeguimiento/historico-seguimiento.model';
import { HistoricoSeguimientoService } from '../../../services/APIs/backend/models/HistoricoSeguimiento/historico-seguimiento.service';
import { LoadingComponent } from '../../../templates/loading/loading.component';
import { MessagesComponent } from '../../../templates/messages/messages.component';

@Component({
    selector: 'app-students-info',
    standalone: true,
    imports: [RouterModule, CommonModule, LoadingComponent, MessagesComponent],
    templateUrl: './students-info.component.html',
    styleUrl: './students-info.component.scss'
})
export class StudentsInfoComponent {

    @ViewChild(MessagesComponent) messagesComponent!: MessagesComponent;

    /**
     * Variables booleanas para mostrar carga
     * @protected
     * @property {boolean} isLoading - Indica si se está cargando el formulario.
     */
    protected isLoading: boolean = false;


    /**
     * Información del estudiante obtenida del servicio StudentInfoService
     * @protected
     * @type {Estudiante | null}
     */
    protected studentInfo: Estudiante | null = null;

    /**
     * Información académica clasificada por tipologías.
     * @protected
     * @type {any}
     */
    protected HistorialAcademicoBytipologies: HistorialAcademicoByPlanEstudios[] = [];

    /**
     * Lista de semestres disponibles para filtrar las asignaturas.
     * @protected
     * @type {any}
     */
    protected semesters: string[] = [];

    /**
     * Registros recientes de seguimiento del estudiante 
     * @protected
     * @type {any}
     */
    protected recentRecordsFollowup: HistoricoSeguimiento[] = [];

    /**
     * Historial académico del estudiante.
     * @protected
     * @type {HistorialAcademico[] }
     */
    protected HistorialAcademico: HistorialAcademico[] = [];

    /**
       * Constructor del componente.
       * @constructor
       * @param {Router} router - Router para redirigir al usuario.
       * @param {EstudianteService} estudianteService - Servicio para manejar los estudiantes.
       * @param {HistorialAcademicoService} historialAcademicoService - Servicio para manejar el historial académico.
       * @param {HistoricoSeguimientoService} historicoSeguimientoService - Servicio para manejar el historial de seguimiento.
       **/
    constructor(
        private studentInfoService: EstudianteService,
        private historicoSeguimientoService: HistoricoSeguimientoService,
        private router: Router,
        private academicHistoryService: HistorialAcademicoService
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
        this.getAcademicHistory();
        this.getFollowUp();
    }

    /**
     * Método para obtener el historial académico del estudiante.
     * @method getAcademicHistory
     * @returns {HistorialAcademico | null} - El historial académico del estudiante o null si no se encuentra.
     */
    protected getAcademicHistory(): void {
        this.isLoading = true;
        if (!this.studentInfo?.id) {
            return;
        }
        this.academicHistoryService.getHistorialAcademicoByEstudiante(this.studentInfo.id)
            .subscribe((historial: HistorialAcademico[]) => {
                this.HistorialAcademico = historial;
                this.isLoading = false;
                this.semesters = this.getSemesters();
                this.getTipologies();
            }, (error) => {
                this.isLoading = false;
                this.showMessage('error', "Error al cargar el historial académico: " + error.message);
            });
    }

    /**
     * Método para obtener las tipologías de asignaturas del plan de estudios relacionarlas con el historial académico.
     * @method getTipologies
     * @returns {any[]} - Lista de tipologías con asignaturas del plan de estudios.
     */
    protected getTipologies(): void {
        console.log("Obteniendo tipologías del plan de estudios...");
        this.isLoading = true;
        console.log("Plan de estudios ID:", this.studentInfo);
        this.academicHistoryService.getHistorialAcademicoByPlanEstudios(this.studentInfo?.plan_estudio?.id || '', this.studentInfo?.id || 0)
            .subscribe((historial: HistorialAcademicoByPlanEstudios[]) => {
                if (!historial || historial.length === 0) {
                    this.isLoading = false;
                    this.showMessage('error', "No se encontraron asignaturas en el historial académico.");
                    return;
                }
                this.HistorialAcademicoBytipologies = historial;
                this.isLoading = false;
            }, (error) => {
                this.isLoading = false;
                this.showMessage('error', "Error al cargar el historial académico por tipologías: " + error.message);
            });
    }


    /**
     * Método para obtener los semestres disponibles.
     * @method getSemesters
     * @returns {string[]} - Lista de semestres disponibles.
     */
    protected getSemesters(): string[] {
        const semesters: string[] = [];
        if (!this.HistorialAcademico) {
            return semesters;
        }
        this.HistorialAcademico.forEach((subject: any) => {
            if (subject.semestre && !semesters.includes(subject.semestre)) {
                semesters.push(subject.semestre);
            }
        });
        return semesters.sort((a, b) => a.localeCompare(b));
    }

    /**
   * Método para obtener el historial de seguimiento del estudiante.
   * @method getFollowUp
   * @returns {void}
   */
    protected getFollowUp(): void {
        this.isLoading = true;
        if (!this.studentInfo?.id) {
            this.isLoading = false;
            this.showMessage('error', "No se pudo obtener el ID del estudiante.");
            return;
        }
        this.historicoSeguimientoService.getHistoricoSeguimientoList(1, this.studentInfo.id.toString()).subscribe({
            next: (response: HistoricoSeguimientoListResponse) => {
                this.recentRecordsFollowup = response.results;
                this.isLoading = false;
            },
            error: (error) => {
                this.isLoading = false;
                this.showMessage('error', "Error al cargar el historial de seguimiento: " + error.message);
            }
        });
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
