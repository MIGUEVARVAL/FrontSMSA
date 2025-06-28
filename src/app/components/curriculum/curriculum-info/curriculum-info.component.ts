import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PlanEstudioService } from '../../../services/APIs/backend/models/PlanEstudio/plan-estudio.service';
import { PlanEstudio } from '../../../services/APIs/backend/models/PlanEstudio/plan-estudio.model';
import { AsignaturaPlanService } from '../../../services/APIs/backend/models/AsignaturaPlan/asignatura-plan.service';
import { AsignaturaPlan } from '../../../services/APIs/backend/models/AsignaturaPlan/asignatura-plan.model';
import { Tipologia } from '../../../services/APIs/backend/models/Tipologia/tipologia.model';

@Component({
    selector: 'app-curriculum-info',
    standalone: true,
    imports: [CommonModule, RouterModule],
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
        this.tipologias = Array.from(tipologiaMap.values());
        console.log("Tipologías cargadas:", this.tipologias);
        this.isLoading = false;
    }


    /**
     * Información académica del estudiante el cual contiene la información de las asignaturas
     * @protected
     * @type {any}
     */
    protected academicInfo: any = [
        {
            "asignatura": "MATEMÁTICAS BÁSICAS",
            "codigo": "1000001-M",
            "creditos": 4,
            "semestre": "2020-1S",
            "estado": "AP",
            "nota": 3.6,
            "veces_vista": 1
        },
        {
            "asignatura": "ÁLGEBRA LINEAL",
            "codigo": "1000003-M",
            "creditos": 4,
            "semestre": "2020-2S",
            "estado": "AP",
            "nota": 3.9,
            "veces_vista": 1
        },
        {
            "asignatura": "CÁLCULO DIFERENCIAL",
            "codigo": "1000004-M",
            "creditos": 4,
            "semestre": "2020-2S",
            "estado": "AP",
            "nota": 4.3,
            "veces_vista": 1
        },
        {
            "asignatura": "CÁLCULO INTEGRAL",
            "codigo": "1000005-M",
            "creditos": 4,
            "semestre": "2021-1S",
            "estado": "AP",
            "nota": 3.7,
            "veces_vista": 1
        },
        {
            "asignatura": "CÁLCULO EN VARIAS VARIABLES",
            "codigo": "1000006-M",
            "creditos": 4,
            "semestre": "2021-2S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "ECUACIONES DIFERENCIALES",
            "codigo": "1000007-M",
            "creditos": 4,
            "semestre": "2022-2S",
            "estado": "RE",
            "nota": 0.2,
            "veces_vista": 1
        },
        {
            "asignatura": "ECUACIONES DIFERENCIALES",
            "codigo": "1000007-M",
            "creditos": 4,
            "semestre": "2023-1S",
            "estado": "RE",
            "nota": 0.5,
            "veces_vista": 2
        },
        {
            "asignatura": "ECUACIONES DIFERENCIALES",
            "codigo": "1000007-M",
            "creditos": 4,
            "semestre": "2021-2S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "GEOMETRÍA VECTORIAL Y ANALÍTICA",
            "codigo": "1000008-M",
            "creditos": 4,
            "semestre": "2020-1S",
            "estado": "AP",
            "nota": 4.2,
            "veces_vista": 1
        },
        {
            "asignatura": "FÍSICA DE ELECTRICIDAD Y MAGNETISMO",
            "codigo": "1000017-M",
            "creditos": 4,
            "semestre": "2022-2S",
            "estado": "RE",
            "nota": 0.0,
            "veces_vista": 1
        },
        {
            "asignatura": "FÍSICA DE ELECTRICIDAD Y MAGNETISMO",
            "codigo": "1000017-M",
            "creditos": 4,
            "semestre": "2023-2S",
            "estado": "AP",
            "nota": 3.6,
            "veces_vista": 2
        },
        {
            "asignatura": "FÍSICA MECÁNICA",
            "codigo": "1000019-M",
            "creditos": 4,
            "semestre": "2021-1S",
            "estado": "AP",
            "nota": 4.2,
            "veces_vista": 1
        },
        {
            "asignatura": "INGLÉS I",
            "codigo": "1000044-M",
            "creditos": 3,
            "semestre": "2020-2S",
            "estado": "AP",
            "nota": null,
            "veces_vista": 1
        },
        {
            "asignatura": "INGLÉS II",
            "codigo": "1000045-M",
            "creditos": 3,
            "semestre": "2020-2S",
            "estado": "AP",
            "nota": null,
            "veces_vista": 1
        },
        {
            "asignatura": "INGLÉS III",
            "codigo": "1000046-M",
            "creditos": 3,
            "semestre": "2020-2S",
            "estado": "AP",
            "nota": null,
            "veces_vista": 1
        },
        {
            "asignatura": "INGLÉS IV",
            "codigo": "1000047-M",
            "creditos": 3,
            "semestre": "2020-2S",
            "estado": "AP",
            "nota": null,
            "veces_vista": 1
        },
        {
            "asignatura": "Cátedra Nacional de Inducción y Preparación para la Vida Universitaria",
            "codigo": "1000089-M",
            "creditos": 2,
            "semestre": "2020-1S",
            "estado": "AP",
            "nota": null,
            "veces_vista": 1
        },
        {
            "asignatura": "Research Seminar",
            "codigo": "1000096-M",
            "creditos": 2,
            "semestre": "2024-2S",
            "estado": "RE",
            "nota": 2.5,
            "veces_vista": 1
        },
        {
            "asignatura": "Cátedra Nacional en Transición Energética: aproximación desde las ciencias de la tierra",
            "codigo": "1000147-M",
            "creditos": 3,
            "semestre": "2024-2S",
            "estado": "AP",
            "nota": 4.7,
            "veces_vista": 1
        },
        {
            "asignatura": "Química general",
            "codigo": "3006829",
            "creditos": 3,
            "semestre": "2020-1S",
            "estado": "AP",
            "nota": 4.4,
            "veces_vista": 1
        },
        {
            "asignatura": "MÉTODOS NUMÉRICOS",
            "codigo": "3006907",
            "creditos": 4,
            "semestre": "2023-1S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "Fundamentos de Sistemas de Información Geográfica",
            "codigo": "3006988",
            "creditos": 3,
            "semestre": "2024-1S",
            "estado": "AP",
            "nota": 3.6,
            "veces_vista": 1
        },
        {
            "asignatura": "GEOLOGÍA FÍSICA",
            "codigo": "3007000",
            "creditos": 4,
            "semestre": "2020-2S",
            "estado": "AP",
            "nota": 4.5,
            "veces_vista": 1
        },
        {
            "asignatura": "HISTORIA MODERNA",
            "codigo": "3007248",
            "creditos": 3,
            "semestre": "2023-2S",
            "estado": "AP",
            "nota": 4.5,
            "veces_vista": 1
        },
        {
            "asignatura": "HIDROLOGÍA",
            "codigo": "3007385",
            "creditos": 3,
            "semestre": "2024-2S",
            "estado": "RE",
            "nota": 0.4,
            "veces_vista": 1
        },
        {
            "asignatura": "MECÁNICA DE SUELOS Y ROCAS",
            "codigo": "3007418",
            "creditos": 4,
            "semestre": "2020-2S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "GEOMECÁNICA",
            "codigo": "3007456",
            "creditos": 3,
            "semestre": "2023-2S",
            "estado": "RE",
            "nota": 2.3,
            "veces_vista": 1
        },
        {
            "asignatura": "GEOMECÁNICA",
            "codigo": "3007456",
            "creditos": 3,
            "semestre": "2024-1S",
            "estado": "AP",
            "nota": 3.5,
            "veces_vista": 2
        },
        {
            "asignatura": "GEOLOGÍA DEL CUATERNARIO",
            "codigo": "3007464",
            "creditos": 3,
            "semestre": "2024-1S",
            "estado": "AP",
            "nota": 3.7,
            "veces_vista": 1
        },
        {
            "asignatura": "SENSORES REMOTOS",
            "codigo": "3007471",
            "creditos": 3,
            "semestre": "2024-1S",
            "estado": "AP",
            "nota": 3.5,
            "veces_vista": 1
        },
        {
            "asignatura": "MINERALOGÍA ÓPTICA",
            "codigo": "3007473",
            "creditos": 3,
            "semestre": "2023-1S",
            "estado": "AP",
            "nota": 4.0,
            "veces_vista": 1
        },
        {
            "asignatura": "MINERALOGÍA ÓPTICA",
            "codigo": "3007473",
            "creditos": 3,
            "semestre": "2022-1S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "YACIMIENTOS MINERALES",
            "codigo": "3007477",
            "creditos": 3,
            "semestre": "2020-2S",
            "estado": "AP",
            "nota": 3.3,
            "veces_vista": 1
        },
        {
            "asignatura": "Práctica Académica Especial 1",
            "codigo": "3007585",
            "creditos": 3,
            "semestre": "2022-2S",
            "estado": "AP",
            "nota": 5.0,
            "veces_vista": 1
        },
        {
            "asignatura": "Práctica Académica Especial 5",
            "codigo": "3007598",
            "creditos": 3,
            "semestre": "2024-2S",
            "estado": "AP",
            "nota": 4.5,
            "veces_vista": 1
        },
        {
            "asignatura": "GEOMORFOLOGÍA",
            "codigo": "3007709",
            "creditos": 3,
            "semestre": "2023-2S",
            "estado": "AP",
            "nota": 3.0,
            "veces_vista": 1
        },
        {
            "asignatura": "GEOMORFOLOGÍA",
            "codigo": "3007709",
            "creditos": 3,
            "semestre": "2021-1S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "GEOMORFOLOGÍA",
            "codigo": "3007709",
            "creditos": 3,
            "semestre": "2021-2S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "GEOMORFOLOGÍA",
            "codigo": "3007709",
            "creditos": 3,
            "semestre": "2022-1S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "MINERALOGÍA",
            "codigo": "3007714",
            "creditos": 4,
            "semestre": "2021-2S",
            "estado": "AP",
            "nota": 3.9,
            "veces_vista": 1
        },
        {
            "asignatura": "MINERALOGÍA",
            "codigo": "3007714",
            "creditos": 4,
            "semestre": "2021-1S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "ELEMENTOS DE GEOLOGÍA ESTRUCTURAL",
            "codigo": "3007767",
            "creditos": 3,
            "semestre": "2023-1S",
            "estado": "RE",
            "nota": 2.9,
            "veces_vista": 1
        },
        {
            "asignatura": "ELEMENTOS DE GEOLOGÍA ESTRUCTURAL",
            "codigo": "3007767",
            "creditos": 3,
            "semestre": "2024-1S",
            "estado": "AP",
            "nota": 3.3,
            "veces_vista": 2
        },
        {
            "asignatura": "ELEMENTOS DE GEOLOGÍA ESTRUCTURAL",
            "codigo": "3007767",
            "creditos": 3,
            "semestre": "2021-1S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "ELEMENTOS DE GEOLOGÍA ESTRUCTURAL",
            "codigo": "3007767",
            "creditos": 3,
            "semestre": "2021-2S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "ELEMENTOS DE GEOLOGÍA ESTRUCTURAL",
            "codigo": "3007767",
            "creditos": 3,
            "semestre": "2022-1S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "PETROLOGÍA METAMÓRFICA",
            "codigo": "3007772",
            "creditos": 3,
            "semestre": "2024-1S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "PETROLOGÍA ÍGNEA",
            "codigo": "3007773",
            "creditos": 3,
            "semestre": "2023-2S",
            "estado": "AP",
            "nota": 3.9,
            "veces_vista": 1
        },
        {
            "asignatura": "Geología Ambiental",
            "codigo": "3007780",
            "creditos": 3,
            "semestre": "2024-2S",
            "estado": "AP",
            "nota": 4.0,
            "veces_vista": 1
        },
        {
            "asignatura": "GEOLOGÍA DE CAMPO I",
            "codigo": "3007781",
            "creditos": 3,
            "semestre": "2024-2S",
            "estado": "AP",
            "nota": 3.0,
            "veces_vista": 1
        },
        {
            "asignatura": "Geología de Minas",
            "codigo": "3009301",
            "creditos": 3,
            "semestre": "2024-2S",
            "estado": "AP",
            "nota": 4.0,
            "veces_vista": 1
        },
        {
            "asignatura": "Catedra Gabriel Trujillo: minería y ambiente",
            "codigo": "3009368",
            "creditos": 3,
            "semestre": "2023-2S",
            "estado": "AP",
            "nota": 4.5,
            "veces_vista": 1
        },
        {
            "asignatura": "De la Universidad a la Organización",
            "codigo": "3009433",
            "creditos": 3,
            "semestre": "2024-2S",
            "estado": "AP",
            "nota": 4.7,
            "veces_vista": 1
        },
        {
            "asignatura": "Estructuración y evaluación de proyectos de ingeniería",
            "codigo": "3010407",
            "creditos": 3,
            "semestre": "2024-1S",
            "estado": "AP",
            "nota": 4.5,
            "veces_vista": 1
        },
        {
            "asignatura": "Fundamentos de proyectos en ingeniería",
            "codigo": "3010408",
            "creditos": 3,
            "semestre": "2023-2S",
            "estado": "AP",
            "nota": 4.3,
            "veces_vista": 1
        },
        {
            "asignatura": "Fundamentos de proyectos en ingeniería",
            "codigo": "3010408",
            "creditos": 3,
            "semestre": "2022-1S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "Fundamentos de programación",
            "codigo": "3010435",
            "creditos": 3,
            "semestre": "2022-2S",
            "estado": "RE",
            "nota": 2.3,
            "veces_vista": 1
        },
        {
            "asignatura": "Fundamentos de programación",
            "codigo": "3010435",
            "creditos": 3,
            "semestre": "2024-1S",
            "estado": "AP",
            "nota": 3.0,
            "veces_vista": 2
        },
        {
            "asignatura": "Introducción a la Ingeniería Geológica",
            "codigo": "3010437",
            "creditos": 2,
            "semestre": "2020-1S",
            "estado": "AP",
            "nota": 4.0,
            "veces_vista": 1
        },
        {
            "asignatura": "MECÁNICA DE SUELOS",
            "codigo": "3010447",
            "creditos": 4,
            "semestre": "2023-1S",
            "estado": "AP",
            "nota": 3.3,
            "veces_vista": 1
        },
        {
            "asignatura": "MECÁNICA DE SUELOS",
            "codigo": "3010447",
            "creditos": 4,
            "semestre": "2022-1S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "MECÁNICA DE SUELOS",
            "codigo": "3010447",
            "creditos": 4,
            "semestre": "2022-2S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "Termodinámica general",
            "codigo": "3010478",
            "creditos": 3,
            "semestre": "2022-2S",
            "estado": "RE",
            "nota": 2.1,
            "veces_vista": 1
        },
        {
            "asignatura": "Termodinámica general",
            "codigo": "3010478",
            "creditos": 3,
            "semestre": "2023-1S",
            "estado": "RE",
            "nota": 1.7,
            "veces_vista": 2
        },
        {
            "asignatura": "Termodinámica general",
            "codigo": "3010478",
            "creditos": 3,
            "semestre": "2024-2S",
            "estado": "AP",
            "nota": 3.5,
            "veces_vista": 3
        },
        {
            "asignatura": "Estadística I",
            "codigo": "3010651",
            "creditos": 3,
            "semestre": "2022-2S",
            "estado": "RE",
            "nota": 2.9,
            "veces_vista": 1
        },
        {
            "asignatura": "Estadística I",
            "codigo": "3010651",
            "creditos": 3,
            "semestre": "2023-1S",
            "estado": "AP",
            "nota": 3.2,
            "veces_vista": 2
        },
        {
            "asignatura": "Estadística I",
            "codigo": "3010651",
            "creditos": 3,
            "semestre": "2022-1S",
            "estado": "CANCELADA",
            "nota": null,
            "veces_vista": 0
        },
        {
            "asignatura": "Cátedra Luis Antonio Restrepo Arango. Género y representaciones culturales",
            "codigo": "3010758",
            "creditos": 3,
            "semestre": "2020-2S",
            "estado": "AP",
            "nota": 3.9,
            "veces_vista": 1
        },
        {
            "asignatura": "Historia de las mujeres y el género: teoría,",
            "codigo": "3011203",
            "creditos": 3,
            "semestre": "2024-2S",
            "estado": "AP",
            "nota": 3.6,
            "veces_vista": 1
        }
    ];




}
