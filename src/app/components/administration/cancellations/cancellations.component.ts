import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../templates/loading/loading.component';
import { LoadFileService } from '../../../services/APIs/backend/loadFile/load-file.service';

/**
 * Utilizada para el manejo de archivos y formularios
 * @type {any}
 */
declare const kitUnal: any;

@Component({
  selector: 'app-cancellations',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './cancellations.component.html',
  styleUrl: './cancellations.component.scss'
})

export class CancellationsComponent {

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
   * Formulario reactivo para cargar las asignaturas canceladas
   * @protected
   * @type {FormGroup}
   */
  protected loadCancellationsForm = new FormGroup({
    file: new FormControl('', Validators.required),
  });

  /**
     * Constructor del componente.
     * @param {LoadFileService} loadFileService - Servicio para manejar la carga de archivos.
     * @constructor
     */
    constructor(
      private loadFileService: LoadFileService,
    ) {}

  /**
   * Función para cargar las asignaturas canceladas.
   * Está función se ejecuta al enviar el formulario.
   * @protected
   * @returns {void}
   */
  protected loadCancellations() {
    this.isLoading = true;
    const file = this.selectedFile;

    if (!file) {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = 'Debes seleccionar un archivo.';
      return;
    }
    this.loadFileService.loadFileCancellation(file).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isSuccess = true;
        this.successMessage = response.message || 'Asignaturas canceladas cargadas exitosamente.';
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = error.error?.message || 'Error al cargar las asignaturas canceladas.';
      }
    });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada.
   * Aquí se inicializan los componentes de carga de archivos.
   */
  ngAfterViewInit(): void {
    const formFileTriggerList = document.querySelectorAll('.form-file');
    [...formFileTriggerList].forEach((formFileTriggerEl) => {
      const formFile = new kitUnal.FormFile(formFileTriggerEl);
      formFile.init();
    });
  }

  protected selectedFile: File | null = null;

  protected selectedFileName: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0].name;
      this.selectedFile = input.files[0];
    } else {
      this.selectedFileName = '';
      this.selectedFile = null;
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.currentTarget as HTMLElement;
    dropZone.classList.add('backgrounUpLoadFile');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.currentTarget as HTMLElement;
    dropZone.classList.remove('backgrounUpLoadFile');
  }

  onDrop(event: DragEvent, fileInput: HTMLInputElement): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.selectedFile = file;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;
      this.onFileSelected({ target: fileInput } as any);
    }
  }

}
