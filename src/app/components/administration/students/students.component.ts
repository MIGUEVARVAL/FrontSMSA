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
  selector: 'app-students',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  /**
   * Variables booleanas para mostrar carga, exito y error
   * @protected
   * @property {boolean} isLoading - Indica el proceso de carga.
   * @property {boolean} isSuccess - Indica si la carga fue exitosa.
   * @property {string} successMessage - Mensaje de éxito a mostrar.
   * @property {boolean} isError - Indica si hubo un error en la carga.
   * @property {string} errorMessage - Mensaje de error a mostrar.
   */
  protected isLoading: boolean = false;
  protected isSuccess: boolean = false;
  protected successMessage: string = '';
  protected isError: boolean = false;
  protected errorMessage: string = '';

  /**
   * Formulario reactivo para cargar los estudiantes
   * @protected
   * @type {FormGroup}
   */
  protected loadStudentsForm = new FormGroup({
    facultad: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required),
  });

  /**
   * Constructor del componente.
   * @constructor
   * @param {LoadFileService} loadFileService - Servicio para manejar la carga de archivos.
   */
  constructor(
    private loadFileService: LoadFileService
  ) {}

  /**
   * Función para cargar los estudiantes.
   * Está función se ejecuta al enviar el formulario.
   * @protected
   * @returns {void}
   */
  protected createStudents(): void {
    this.isLoading = true;

    const file = this.selectedFile;

    if (!file) {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = 'Debes seleccionar un archivo.';
      return;
    }

    this.loadFileService
      .loadFileStudentsRisk(file)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.isSuccess = true;
          this.successMessage =
            'Los estudiantes fueron cargados correctamente.';
          this.loadStudentsForm.reset();
          this.selectedFile = null;
          this.selectedFileName = null;
        },
        error: (error) => {
          this.isLoading = false;
          this.isError = true;
          this.errorMessage =
            'No se lograron cargar los estudiantes, por favor verifique el archivo y vuelva a intentarlo';
          console.error('Error al cargar los estudiantes:', error);
        },
      });
  }

  // Función para abrir el explorador de archivos para subir un archivo
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
