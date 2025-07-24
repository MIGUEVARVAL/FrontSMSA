import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../templates/loading/loading.component';
import { Estudiante, EstudianteListResponse, EstudianteFilter } from '../../../services/APIs/backend/models/Estudiante/estudiante.model';
import { EstudianteService } from '../../../services/APIs/backend/models/Estudiante/estudiante.service';
import { PlanEstudio } from '../../../services/APIs/backend/models/PlanEstudio/plan-estudio.model';

@Component({
    selector: 'app-students-list',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, LoadingComponent],
    templateUrl: './students-list.component.html',
    styleUrl: './students-list.component.scss'
})
export class StudentsListComponent {

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
     * Filtros activos para la búsqueda.
     * @protected
     */
    protected filtrosActivos: EstudianteFilter = {
        documento: '',
        nombres: '',
        apellidos: '',
        login: '',
        programa: '',
        acceso: '',
        subacceso: '',
        estado: '',
        matriculas: '',
        papaMin: 0,
        papaMax: 5,
        avanceMin: 0,
        avanceMax: 100,
        riesgo: false,
        orderBy: '',
        orderDirection: ''
    };

    /**
     * Lista de estudiantes obtenidos.
     * @protected
     * @type {EstudianteListResponse}
     */
    protected estudiantesListResponse: EstudianteListResponse = {
        count: 0,
        next: null,
        previous: null,
        results: []
    };

    /**
     * Código de la facultad seleccionada.
     * @protected
     * @type {string | null}
     */
    protected codigoFacultad: string | null = null;

    /**
    * Formulario reactivo para el filtro de estudiantes
    * @protected
    * @type {FormGroup}
    */
    protected filterForm = new FormGroup({
        orderBy: new FormControl(''),
        orderDirection: new FormControl(''),
        documento: new FormControl(''),
        nombres: new FormControl(''),
        apellidos: new FormControl(''),
        login: new FormControl(''),
        edad: new FormControl(''),
        programa: new FormControl(''),
        acceso: new FormControl(''),
        subacceso: new FormControl(''),
        estado: new FormControl(''),
        matriculas: new FormControl(''),
        papaMin: new FormControl(0, { nonNullable: true }),
        papaMax: new FormControl(5, { nonNullable: true }),
        avanceMin: new FormControl(0, { nonNullable: true }),
        avanceMax: new FormControl(100, { nonNullable: true }),
        riesgo: new FormControl(undefined)
    });

    /**
     * Constructor del componente.
     * @constructor
     * @param {EstudianteService} estudianteService - Servicio para manejar los estudiantes.
     * @param {ActivatedRoute} route - Ruta activa para obtener parámetros de la URL.
   * @param {Router} router - Router para redirigir al usuario.
     */
    constructor(private estudianteService: EstudianteService, private route: ActivatedRoute, private router: Router) { }

    /**
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
     * Aquí se cargan los estudiantes disponibles.
     * @protected
     * @returns {void}
     */
    ngOnInit(): void {
        this.loadStudents();

    }

    /**
     * Método para cargar los estudiantes.
     * @protected
     * @returns {void}
     */
    protected loadStudents(filterData?: EstudianteFilter): void {
        this.isLoading = true;
        this.estudianteService.getEstudiantesList(this.page, filterData).subscribe({
            next: (response: EstudianteListResponse) => {
                this.isLoading = false;
                this.estudiantesListResponse = response;
                console.log(response);
                this.isSuccess = true;
                this.successMessage = "Estudiantes cargados correctamente.";
            },
            error: (error) => {
                this.isLoading = false;
                this.isError = true;
                this.errorMessage = "Error al cargar los estudiantes: " + error.message;
            }
        });
    }

    /**
     * Método para agregar un estudiante a la lista de estudiantes activo y redirigir
     * @protected
     * @param {number} estudiante - Estudiante a agregar.
     * @returns {void}
     */
    protected addStudentToActive(estudiante: number): void {
        this.isLoading = true;
        this.estudianteService.getEstudianteById(estudiante).subscribe({
            next: (response: Estudiante) => {
                this.isLoading = false;
                this.estudianteService.setEstudianteActive(response);
                this.router.navigate(['/students/student-info']);
            },
            error: (error) => {
                this.isLoading = false;
                this.isError = true;
                this.errorMessage = "Error al cargar el estudiante: " + error.message;
            }
        });

    }

    /**
     * Método para filtrar estudiantes según los criterios del formulario.
     * @protected
     * @returns {void}
     */
    protected filterStudents(): void {
        const formValue = this.filterForm.value;
        this.filtrosActivos = {
            orderBy: formValue.orderBy || undefined,
            orderDirection: formValue.orderDirection || undefined,
            documento: formValue.documento || undefined,
            nombres: formValue.nombres || undefined,
            apellidos: formValue.apellidos || undefined,
            login: formValue.login || undefined,
            programa: formValue.programa || undefined,
            acceso: formValue.acceso || undefined,
            subacceso: formValue.subacceso || undefined,
            estado: formValue.estado || undefined,
            matriculas: formValue.matriculas !== '' && formValue.matriculas != null ? formValue.matriculas : undefined,
            papaMin: formValue.papaMin !== 0 ? formValue.papaMin : undefined,
            papaMax: formValue.papaMax !== 5 ? formValue.papaMax : undefined,
            avanceMin: formValue.avanceMin !== 0 ? formValue.avanceMin : undefined,
            avanceMax: formValue.avanceMax !== 100 ? formValue.avanceMax : undefined,
            riesgo: formValue.riesgo ? true : undefined,
        };
        this.loadStudents(this.filtrosActivos);
    }

    /**
     * Método para limpiar los filtros activos.
     * @protected
     * @returns {void}
     */
    protected clearFilters(): void {
        this.filtrosActivos = {
            documento: '',
            nombres: '',
            apellidos: '',
            login: '',
            programa: '',
            acceso: '',
            subacceso: '',
            estado: '',
            matriculas: '',
            papaMin: 0,
            papaMax: 5,
            avanceMin: 0,
            avanceMax: 100,
            orderBy: '',
            orderDirection: ''
        };
        this.filterForm.reset();
        this.loadStudents();
    }

    get totalPages(): number {
        return Math.ceil(this.estudiantesListResponse.count / (this.estudianteService.getCustomPageSize())) || 1;
    }

    protected onPageChange(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.page = page;
            this.loadStudents();
        }
    }

}
