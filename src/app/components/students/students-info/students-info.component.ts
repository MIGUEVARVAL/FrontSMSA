import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../../services/APIs/backend/models/Estudiante/estudiante.service';
import { Estudiante} from '../../../services/APIs/backend/models/Estudiante/estudiante.model';
import { HistorialAcademicoService } from '../../../services/APIs/backend/models/HistorialAcademico/historial-academico.service';
import { HistorialAcademico, HistorialAcademicoByPlanEstudios } from '../../../services/APIs/backend/models/HistorialAcademico/historial-academico.model';
import { AsignaturaPlanService } from '../../../services/APIs/backend/models/AsignaturaPlan/asignatura-plan.service';

@Component({
    selector: 'app-students-info',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './students-info.component.html',
    styleUrl: './students-info.component.scss'
})
export class StudentsInfoComponent {

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
    protected recentRecordsFollowup: any = {
        "create": "25 de abril de 2025",
        "records": [
            {
                "id": "1",
                "fecha": "22 de abril de 2025 a las 22:42",
                "actividad": "Revisión de calificaciones del semestre 2024-2S"
            },
            {
                "id": "2",
                "fecha": "22 de abril de 2025 a las 22:42",
                "actividad": "Asesoría académica sobre asignaturas optativas"
            },
            {
                "id": "3",
                "fecha": "22 de abril de 2025 a las 22:42",
                "actividad": "Asignación de tutor académico"
            }
        ]
    };


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
       **/
    constructor(
        private studentInfoService: EstudianteService,
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
                this.isSuccess = true;
                this.successMessage = "Historial académico cargado exitosamente.";
                this.semesters = this.getSemesters();
                this.getTipologies();
            }, (error) => {
                this.isLoading = false;
                this.isError = true;
                this.errorMessage = "Error al cargar el historial académico: " + error.message;
            });
    }

    /**
     * Método para obtener las tipologías de asignaturas del plan de estudios relacionarlas con el historial académico.
     * @method getTipologies
     * @returns {any[]} - Lista de tipologías con asignaturas del plan de estudios.
     */
    protected getTipologies():void {
        console.log("Obteniendo tipologías del plan de estudios...");
        this.isLoading = true;
        console.log("Plan de estudios ID:", this.studentInfo);
        this.academicHistoryService.getHistorialAcademicoByPlanEstudios(this.studentInfo?.plan_estudio?.id || '', this.studentInfo?.id || 0)
            .subscribe((historial: HistorialAcademicoByPlanEstudios[]) => {
                if (!historial || historial.length === 0) {
                    this.isLoading = false;
                    this.isError = true;
                    this.errorMessage = "No se encontraron asignaturas en el historial académico.";
                    console.error("No se encontraron asignaturas en el historial académico.");
                    return;
                }
                this.HistorialAcademicoBytipologies = historial;
                console.log("Historial académico por tipologías:", this.HistorialAcademicoBytipologies);
                this.isLoading = false;
                this.isSuccess = true;
                this.successMessage = "Historial académico por tipologías cargado exitosamente.";
            }
            , (error) => {
                this.isLoading = false;
                this.isError = true;
                this.errorMessage = "Error al cargar el historial académico por tipologías: " + error.message;
                console.error("Error al cargar el historial académico por tipologías:", error);
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

}
