import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PlanEstudioService } from '../../../services/APIs/backend/models/PlanEstudio/plan-estudio.service';
import { PlanEstudio } from '../../../services/APIs/backend/models/PlanEstudio/plan-estudio.model';
import { AsignaturaPlanService } from '../../../services/APIs/backend/models/AsignaturaPlan/asignatura-plan.service';
import { AsignaturaPlan } from '../../../services/APIs/backend/models/AsignaturaPlan/asignatura-plan.model';
import { Tipologia } from '../../../services/APIs/backend/models/Tipologia/tipologia.model';
import { LoadingComponent } from '../../../templates/loading/loading.component';
import { MessagesComponent } from '../../../templates/messages/messages.component';
import { PlanesEstudioAcuerdosFilter, PlanesEstudioAcuerdos, CreatePlanesEstudioAcuerdosRequest, UpdatePlanesEstudioAcuerdosRequest } from '../../../services/APIs/backend/models/PlanEstudioAcuerdos/planes-estudio-acuerdos.model';
import { PlanesEstudioAcuerdosService } from '../../../services/APIs/backend/models/PlanEstudioAcuerdos/planes-estudio-acuerdos.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-curriculum-info',
    standalone: true,
    imports: [CommonModule, RouterModule, LoadingComponent, ReactiveFormsModule, MessagesComponent],
    templateUrl: './curriculum-info.component.html',
    styleUrl: './curriculum-info.component.scss'
})
export class CurriculumInfoComponent {

    @ViewChild(MessagesComponent) messagesComponent!: MessagesComponent;

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

    /**
     * Variable para almacenar el ID del plan de estudio desde la ruta.
     * @type {string | null}
     * @protected
     */
    protected idPlanEstudio: string | null = null;

    /**
     * Variable para almacenar el plan de estudio seleccionado.
     * @type {PlanEstudio}
     * @protected
     */
    protected planEstudio: PlanEstudio | null = null;

    /**
     * Variable para almacenar las asignaturas del plan de estudio.
     * @type {AsignaturaPlan[]}
     * @protected
     */
    protected asignaturaPlan: AsignaturaPlan[] = [];

    /**
     * Variable para almacenar las tipologías de las asignaturas del plan de estudio.
     * @type {Tipologia[]}
     * @protected
     */
    protected tipologias: any[] = [];

    /**
     * Variable para almacenar los acuerdos del plan de estudio.
     * @type {PlanesEstudioAcuerdos[]}
     * @protected
     */
    protected acuerdos: PlanesEstudioAcuerdos[] = [];

    /**
     * Variable para almacenar el ID del acuerdo actual a editar
     * @type {string | null}
     * @protected
     */
    protected currentAcuerdoId: string | null = null;

    /**
     * Formulario reactivo para la creación de un acuerdo de plan de estudio.
     * @type {FormGroup}
     * @protected
     */
    protected createAcuerdoForm: FormGroup = new FormGroup({
        titulo: new FormControl('', Validators.required),
        link: new FormControl(''),
        vigente: new FormControl(true),
    });

    /**
     * Formulario para editar los acuerdos del plan de estudio
     * @type {FormGroup}
     * @protected
     */
    protected editAcuerdoForm: FormGroup = new FormGroup({
        titulo: new FormControl(''),
        link: new FormControl(''),
        vigente: new FormControl(true),
    });

    /**
     * Constructor de la clase CurriculumListComponent
     * @param {PlanEstudioService} planEstudioService - Servicio para manejar los planes de estudio.
     * @param {AsignaturaPlanService} asignaturaPlanService - Servicio para manejar las asignaturas de los planes de estudio.
     * @param {ActivatedRoute} route - Ruta activa para obtener parámetros de la URL.
     * @param {TipologiaService} tipologiaService - Servicio para manejar las tipologías de asignaturas.
     * @param {PlanesEstudioAcuerdosService} planesEstudioAcuerdosService - Servicio para manejar los acuerdos de planes de estudio.
     */
    constructor(private planEstudioService: PlanEstudioService, private asignaturaPlanService: AsignaturaPlanService, private route: ActivatedRoute, private planesEstudioAcuerdosService: PlanesEstudioAcuerdosService) {
    }

    /**
     * Método para inicializar el componente y cargar los datos del plan de estudio.
     * @returns {void}
     */
    protected ngOnInit(): void {
        this.idPlanEstudio = this.route.snapshot.paramMap.get('idPlan');
        this.loadInfoPlanEstudio(this.idPlanEstudio);
        this.getAsignaturasByPlanEstudio(this.idPlanEstudio);
        this.loadAcuerdos(this.idPlanEstudio);
    }

    /**
     * Método para cargar la información del plan de estudio.
     * @param id - ID del plan de estudio a cargar.
     * @returns {void}
     */
    protected loadInfoPlanEstudio(id: string | null): void {

        this.isLoading = true;
        if (!id) {
            this.isLoading = false;
            this.showMessage('error', "ID del plan de estudio no proporcionado.");
            return;
        }
        this.planEstudioService.getPlanEstudioById(id).subscribe({
            next: (response: PlanEstudio) => {
                this.planEstudio = response;
                this.isLoading = false;
            },
            error: (error: any) => {
                this.isLoading = false;
                this.showMessage('error', "Error al cargar el plan de estudio: " + error.message);
            }
        });

    }

    /**
     * Método para obtener las asignaturas del plan de estudio.
     * @param id - ID del plan de estudio.
     * @returns {void}
     */
    protected getAsignaturasByPlanEstudio(id: string | null): void {
        this.isLoading = true;
        if (!id) {
            this.showMessage('error', "ID del plan de estudio no proporcionado.");
            this.isLoading = false;
            return;
        }
        this.asignaturaPlanService.getAsignaturaPlanByPlan(id).subscribe({
            next: (response: any) => {
                this.isLoading = false;
                this.asignaturaPlan = response;
                this.loadTipologies();
            },
            error: (error: any) => {
                this.isLoading = false;
                this.showMessage('error', "Error al cargar las asignaturas del plan de estudio: " + error.message);
            }
        });
    }

    /**
     * Método para cargar los acuerdos del plan de estudio.
     * @param id - ID del plan de estudio.
     * @returns {void}
     */
    protected loadAcuerdos(id: string | null): void {
        this.isLoading = true;
        if (!id) {
            this.showMessage('error', "ID del plan de estudio no proporcionado.");
            this.isLoading = false;
            return;
        }
        this.planesEstudioAcuerdosService.getPlanesEstudioAcuerdosList(id).subscribe({
            next: (response: PlanesEstudioAcuerdos[]) => {
                this.acuerdos = response;
                this.isLoading = false;
            },
            error: (error: any) => {
                this.isLoading = false;
                this.showMessage('error', "Error al cargar los acuerdos del plan de estudio: " + error.message);
            }
        });
    }

    /**
     * Método para crear un nuevo acuerdo de plan de estudio.
     * @returns {void}
     */
    protected onCreateAcuerdo(): void {
        if (this.createAcuerdoForm.invalid || this.idPlanEstudio === null) {
            this.showMessage('error', "Formulario inválido. Por favor, complete todos los campos requeridos.");
            this.isLoading = false;
            return;
        }

        const acuerdoData: CreatePlanesEstudioAcuerdosRequest = {
            titulo: this.createAcuerdoForm.value.titulo,
            link: this.createAcuerdoForm.value.link,
            vigente: this.createAcuerdoForm.value.vigente,
            plan_estudio: this.idPlanEstudio,
        };

        this.planesEstudioAcuerdosService.createPlanesEstudioAcuerdo(acuerdoData).subscribe({
            next: (response: PlanesEstudioAcuerdos) => {
                this.showMessage('success', "Acuerdo creado correctamente.");
                this.createAcuerdoForm.reset();
                this.isLoading = false;
                this.loadAcuerdos(this.idPlanEstudio);
            },
            error: (error: any) => {
                this.isLoading = false;
                this.showMessage('error', "Error al crear el acuerdo: " + error.message);
            }
        });
    }

    /**
     * Método para editar un acuerdo de plan de estudio.
     * @returns {void}
     */
    protected onEditAcuerdo(): void {
        this.isLoading = true;

        if (!this.currentAcuerdoId) {
            this.showMessage('error', "No se ha seleccionado un acuerdo para editar.");
            return;
        }

        const acuerdoIds = this.acuerdos.map(acuerdo => acuerdo.id);

        if (this.editAcuerdoForm.invalid || this.idPlanEstudio === null || !acuerdoIds.includes(this.currentAcuerdoId)) {
            console.log("Formulario inválido o acuerdo no encontrado:", this.editAcuerdoForm.invalid, this.idPlanEstudio, acuerdoIds.includes(this.currentAcuerdoId));
            this.showMessage('error', "Formulario inválido o acuerdo no encontrado.");
            this.isLoading = false;
            return;
        }

        const acuerdoData: UpdatePlanesEstudioAcuerdosRequest = {
            id: this.currentAcuerdoId,
            titulo: this.editAcuerdoForm.value.titulo,
            link: this.editAcuerdoForm.value.link,
            vigente: this.editAcuerdoForm.value.vigente,
        };

        this.planesEstudioAcuerdosService.updatePlanesEstudioAcuerdo(acuerdoData).subscribe({
            next: (response: PlanesEstudioAcuerdos) => {
                this.showMessage('success', "Acuerdo editado correctamente.");
                this.editAcuerdoForm.reset();
                this.isLoading = false;
                this.loadAcuerdos(this.idPlanEstudio);
            },
            error: (error: any) => {
                this.isLoading = false;
                this.showMessage('error', "Error al editar el acuerdo: " + error.message);
                console.error("Error al editar el acuerdo:", error);
            }
        });
    }

    /**
     * Método para preparar el formulario de edición con los datos del acuerdo.
     * @param acuerdo - Acuerdo a editar.
     * @returns {void}
     */
    protected prepareEditAcuerdo(acuerdo: PlanesEstudioAcuerdos): void {
        this.currentAcuerdoId = acuerdo.id;
        this.editAcuerdoForm.patchValue({
            titulo: acuerdo.titulo,
            link: acuerdo.link,
            vigente: acuerdo.vigente
        });
    }

    /**
     * Método para eliminar un acuerdo de plan de estudio.
     * @param id - ID del acuerdo a eliminar.
     * @returns {void}
     */
    protected onDeleteAcuerdo(id: string): void {
        const acuerdoExists = this.acuerdos.find(acuerdo => acuerdo.id === id);

        if (!id || !acuerdoExists) {
            this.showMessage('error', "ID del acuerdo no proporcionado o acuerdo no encontrado.");
            return;
        }

        this.planesEstudioAcuerdosService.deletePlanesEstudioAcuerdo(id).subscribe({
            next: () => {
                this.showMessage('success', "Acuerdo eliminado correctamente.");
                this.loadAcuerdos(this.idPlanEstudio);
            },
            error: (error: any) => {
                this.showMessage('error', "Error al eliminar el acuerdo: " + error.message);
            }
        });
    }


    /**
     * Método para cargar las tipologías de las asignaturas.
     * @returns {void}
     */
    protected loadTipologies(): void {
        this.isLoading = true;
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
