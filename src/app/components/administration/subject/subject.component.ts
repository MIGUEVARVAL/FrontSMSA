import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../templates/loading/loading.component';

/**
 * Utilizada para el manejo de archivos y formularios
 * @type {any}
 */
declare const kitUnal: any;

@Component({
  selector: 'app-subject',
  imports: [RouterModule, ReactiveFormsModule, LoadingComponent],
  standalone: true,
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {

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
   * Formulario reactivo para cargar las notas finales
   * @protected
   * @type {FormGroup}
   */
  protected loadSubjectParametrizationForm = new FormGroup({
    file: new FormControl('', Validators.required),
  });

  /**
   * Función para cargar las notas finales.
   * Está función se ejecuta al enviar el formulario.
   * @protected
   * @returns {void}
   */
  protected loadSubjectParametrization() {
    this.isLoading = true;

    if (this.loadSubjectParametrizationForm.invalid) {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = "Por favor, complete todos los campos requeridos.";
      return;
    }
    setTimeout(() => {
      this.loadSubjectParametrizationForm.reset();
      this.isLoading = false;
      this.isSuccess = true;
      this.successMessage = "Las notas finales fueron cargadas correctamente.";
      this.isError = false;
      this.errorMessage = "No se lograron cargar las notas finales, por favor verifique el archivo y vuelva a intentarlo";
    }, 2000);
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
