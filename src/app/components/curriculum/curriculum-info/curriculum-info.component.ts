import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PlanEstudioService } from '../../../services/APIs/backend/models/PlanEstudio/plan-estudio.service';
import { PlanEstudio } from '../../../services/APIs/backend/models/PlanEstudio/plan-estudio.model';
import { AsignaturaPlanService } from '../../../services/APIs/backend/models/AsignaturaPlan/asignatura-plan.service';
import { AsignaturaPlan } from '../../../services/APIs/backend/models/AsignaturaPlan/asignatura-plan.model';
import { Tipologia } from '../../../services/APIs/backend/models/Tipologia/tipologia.model';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { LoadingComponent } from '../../../templates/loading/loading.component';

@Component({
    selector: 'app-curriculum-info',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, QuillModule, LoadingComponent],
    templateUrl: './curriculum-info.component.html',
    styleUrl: './curriculum-info.component.scss'
})
export class CurriculumInfoComponent {

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

    protected idPlanEstudio: string | null = null;

    /**
     * Variable para almacenar el plan de estudio seleccionado.
     * @type {PlanEstudio}
     * @protected
     */
    protected planEstudio: PlanEstudio = {
        id: '',
        nombre: '',
        codigo: '',
        facultadId: 0,
        tipo_nivel: '',
        nivel: '',
        activo: true,
    }

    protected asignaturaPlan: AsignaturaPlan[] = [];

    protected tipologias: any[] = [];

    /**
     * Constructor de la clase CurriculumListComponent
     * @param {PlanEstudioService} planEstudioService - Servicio para manejar los planes de estudio.
     * @param {AsignaturaPlanService} asignaturaPlanService - Servicio para manejar las asignaturas de los planes de estudio.
     * @param {ActivatedRoute} route - Ruta activa para obtener parámetros de la URL.
     * @param {TipologiaService} tipologiaService - Servicio para manejar las tipologías de asignaturas.
     */
    constructor(private planEstudioService: PlanEstudioService, private asignaturaPlanService: AsignaturaPlanService, private route: ActivatedRoute) {


    }

    /**
     * Método para inicializar el componente y cargar los datos del plan de estudio.
     * @returns {void}
     */
    protected ngOnInit(): void {
        this.idPlanEstudio = this.route.snapshot.paramMap.get('idPlan');
        this.loadInfoPlanEstudio(this.idPlanEstudio);
        this.getAsignaturasByPlanEstudio(this.idPlanEstudio);

    }

    protected loadInfoPlanEstudio(id: string | null): void {

        this.isLoading = true;
        if (!id) {
            this.isLoading = false;
            this.isError = true;
            this.errorMessage = "ID del plan de estudio no proporcionado.";
            return;
        }
        this.planEstudioService.getPlanEstudioById(id).subscribe({
            next: (response: PlanEstudio) => {
                console.log("Plan de estudio cargado:", response);
                this.planEstudio = response;
                this.isLoading = false;
                this.isSuccess = true;
                this.successMessage = "Plan de estudio cargado correctamente.";
            },
            error: (error: any) => {
                this.isLoading = false;
                this.isError = true;
                this.errorMessage = "Error al cargar el plan de estudio: " + error.message;
            }
        });

    }

    protected getAsignaturasByPlanEstudio(id: string | null): void {
        this.isLoading = true;
        if (!id) {
            this.isError = true;
            this.errorMessage = "ID del plan de estudio no proporcionado.";
            return;
        }
        this.asignaturaPlanService.getAsignaturaPlanByPlan(id).subscribe({
            next: (response: any) => {
                this.isLoading = false;
                this.isSuccess = true;
                this.asignaturaPlan = response;
                console.log("Asignaturas del plan de estudio cargadas:", this.asignaturaPlan);
                this.loadTipologies();
            },
            error: (error: any) => {
                this.isError = true;
                this.errorMessage = "Error al cargar las asignaturas del plan de estudio: " + error.message;
            }
        });
    }

    protected loadTipologies(): void {
        this.isLoading = true;
        this.isError = false;
        this.tipologias = [];
        if (!this.asignaturaPlan || this.asignaturaPlan.length === 0) {
            this.isLoading = false;
            return;
        }
        const tipologiaMap = new Map<string, any>();
        this.asignaturaPlan.forEach(asignatura => {
            if (asignatura.tipologia) {
                const tipologiaId = asignatura.tipologia.id;
                if (!tipologiaMap.has(tipologiaId)) {
                    // Clonamos la tipología y le agregamos un arreglo de asignaturas
                    tipologiaMap.set(tipologiaId, { ...asignatura.tipologia, asignaturas: [asignatura.asignatura] });
                } else {
                    // Si ya existe, agregamos la asignatura al arreglo
                    const tipologia = tipologiaMap.get(tipologiaId);
                    if (tipologia.asignaturas) {
                        tipologia.asignaturas.push(asignatura.asignatura);
                    } else {
                        tipologia.asignaturas = [asignatura.asignatura];
                    }
                }
            }
        });
        this.tipologias = Array.from(tipologiaMap.values()).sort((a, b) => {
            if (a.nombre < b.nombre) return -1;
            if (a.nombre > b.nombre) return 1;
            return 0;
        });
        this.isLoading = false;
    }







}
