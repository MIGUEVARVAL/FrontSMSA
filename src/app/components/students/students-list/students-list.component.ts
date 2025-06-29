import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../templates/loading/loading.component';
import { Estudiante, EstudianteListResponse } from '../../../services/APIs/backend/models/Estudiante/estudiante.model';
import { EstudianteService } from '../../../services/APIs/backend/models/Estudiante/estudiante.service';
import { PlanEstudio } from '../../../services/APIs/backend/models/PlanEstudio/plan-estudio.model';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
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
    orderDirection: new FormControl('ASC'),
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
    });


    programas = [
        { "id": 54, "nombre": "3528 - INGENIERÍA ADMINISTRATIVA" },
        { "id": 55, "nombre": "3536 - INGENIERÍA GEOLÓGICA" },
        { "id": 56, "nombre": "3534 - INGENIERÍA DE SISTEMAS E INFORMÁTICA" },
        { "id": 57, "nombre": "3537 - INGENIERÍA INDUSTRIAL" },
        { "id": 58, "nombre": "3515 - INGENIERÍA ADMINISTRATIVA" },
        { "id": 59, "nombre": "3522 - INGENIERÍA GEOLÓGICA" },
        { "id": 60, "nombre": "3518 - INGENIERÍA DE MINAS Y METALURGIA" },
        { "id": 61, "nombre": "3517 - INGENIERÍA DE CONTROL" },
        { "id": 62, "nombre": "3516 - INGENIERÍA CIVIL" },
        { "id": 63, "nombre": "3523 - INGENIERÍA INDUSTRIAL" },
        { "id": 64, "nombre": "3533 - INGENIERÍA DE PETRÓLEOS" },
        { "id": 65, "nombre": "3531 - INGENIERÍA DE CONTROL" },
        { "id": 66, "nombre": "3527 - INGENIERÍA AMBIENTAL" },
        { "id": 67, "nombre": "3519 - INGENIERÍA DE PETRÓLEOS" },
        { "id": 68, "nombre": "3529 - INGENIERÍA AMBIENTAL" },
        { "id": 69, "nombre": "3538 - INGENIERÍA MECÁNICA" },
        { "id": 70, "nombre": "3532 - INGENIERÍA DE MINAS Y METALURGIA" },
        { "id": 71, "nombre": "3521 - INGENIERÍA ELÉCTRICA" },
        { "id": 72, "nombre": "3539 - INGENIERÍA QUÍMICA" },
        { "id": 73, "nombre": "3530 - INGENIERÍA CIVIL" },
        { "id": 74, "nombre": "3535 - INGENIERÍA ELÉCTRICA" },
        { "id": 75, "nombre": "3525 - INGENIERÍA QUÍMICA" },
        { "id": 76, "nombre": "3524 - INGENIERÍA MECÁNICA" },
        { "id": 77, "nombre": "3520 - INGENIERÍA DE SISTEMAS E INFORMÁTICA" }
    ]

    accesos = [
        { "id": 1, "nombre": "EXAMEN DE ADMISI\u00d3N A LA UNIVERSIDAD" },
        { "id": 2, "nombre": "REGULAR DE PREGRADO" },
        { "id": 3, "nombre": "V\u00cdCTIMAS DEL CONFLICTO ARMADO EN COLOMBIA" }
    ];

    subaccesos = [
        { "id": "REGULAR DE PREGRADO", "nombre": "REGULAR DE PREGRADO" },
        { "id": "VÍCTIMAS DEL CONFLICTO ARMADO EN COLOMBIA", "nombre": "VÍCTIMAS DEL CONFLICTO ARMADO EN COLOMBIA" },
        { "id": "PEAMA - CARIBE - PROGRAMA ESPECIAL DE ADMISIÓN Y MOVILIDAD ACADÉMICA", "nombre": "PEAMA - CARIBE - PROGRAMA ESPECIAL DE ADMISIÓN Y MOVILIDAD ACADÉMICA" },
        { "id": "PEAMA - ORINOQUÍA - PROGRAMA ESPECIAL DE ADMISIÓN Y MOVILIDAD ACADÉMICA", "nombre": "PEAMA - ORINOQUÍA - PROGRAMA ESPECIAL DE ADMISIÓN Y MOVILIDAD ACADÉMICA" },
        { "id": "PAES - POBLACION NEGRA, AFROCOLOMBIANA, PALENQUERA Y RAIZAL", "nombre": "PAES - POBLACION NEGRA, AFROCOLOMBIANA, PALENQUERA Y RAIZAL" },
        { "id": "PAES - INDÍGENA", "nombre": "PAES - INDÍGENA" },
        { "id": "PEAMA - AMAZONÍA - PROGRAMA ESPECIAL DE ADMISIÓN Y MOVILIDAD ACADÉMICA", "nombre": "PEAMA - AMAZONÍA - PROGRAMA ESPECIAL DE ADMISIÓN Y MOVILIDAD ACADÉMICA" },
        { "id": "PEAMA - TUMACO - PROGRAMA ESPECIAL DE ADMISIÓN Y MOVILIDAD ACADÉMICA", "nombre": "PEAMA - TUMACO - PROGRAMA ESPECIAL DE ADMISIÓN Y MOVILIDAD ACADÉMICA" },
        { "id": "PAES - MUNICIPIO", "nombre": "PAES - MUNICIPIO" }
    ]

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
        this.codigoFacultad = this.route.snapshot.paramMap.get('codigoFacultad');
        if (!this.codigoFacultad) {
            this.router.navigate(['/home']);
            return;
        }
        this.loadStudents(this.codigoFacultad);

    }

    /**
     * Método para cargar los estudiantes.
     * @protected
     * @returns {void}
     */
    protected loadStudents(codigoFacultad: string): void {
        this.isLoading = true;
        this.estudianteService.getEstudiantesByFacultad(this.page, codigoFacultad).subscribe({
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

    get totalPages(): number {
        return Math.ceil(this.estudiantesListResponse.count / (this.estudianteService.getCustomPageSize())) || 1;
    }

    protected  onPageChange(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
        this.page = page;
        this.loadStudents(this.codigoFacultad!);
        }
    }

}
