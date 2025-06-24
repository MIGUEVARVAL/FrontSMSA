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
  selector: 'app-students',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent {

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
   * Formulario reactivo para cargar los estudiantes
   * @protected
   * @type {FormGroup}
   */
  protected loadStudentsForm = new FormGroup({
    facultad: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required),
  });


  /**
   * Lista de facultades disponibles para seleccionar
   * @protected
   * @type {Array}
   */
  protected facultades = 
  [
    {
      "id": 1,
      "nombre": "Facultad de Arquitectura"
    },
    {
      "id": 2,
      "nombre": "Facultad de Ciencias"
    },
    {
      "id": 3,
      "nombre": "Facultad de Ciencias Humanas y Económicas"
    },
    {
      "id": 4,
      "nombre": "Facultad de Minas"
    },
    {
      "id": 5,
      "nombre": "Facultad de Ciencias Agrarias"
    },
    {
      "id": 6,
      "nombre": "SEDE MEDELLÍN"
    },
    {
      "id": 7,
      "nombre": "FACULTAD DE MINAS (Admisión PAET)"
    },
    {
      "id": 8,
      "nombre": "FACULTAD DE MINAS (Admisión PAET)"
    },
    {
      "id": 9,
      "nombre": "FACULTAD DE CIENCIAS (Admisión PAET)"
    }
  ]


  /**
   * Función para cargar los estudiantes.
   * Está función se ejecuta al enviar el formulario.
   * @protected
   * @returns {void}
   */
  protected loadStudents() {
    this.isLoading = true;

    if (this.loadStudentsForm.invalid) {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = "Por favor, complete todos los campos requeridos.";
      return;
    }
    // Simula una carga de estudiantes
    setTimeout(() => {
      this.loadStudentsForm.reset();
      this.isLoading = false;
      this.isSuccess = true;
      this.successMessage = "50 estudiantes fueron cargados correctamente, 200 estudiantes fueron actualizados correctamente.";
      this.isError = true;
      this.errorMessage = "No se lograron cargar 5 estudiantes, por favor verifique el archivo y vuelva a intentarlo, puede descargar el archivo de error para ver los detalles.";
    }, 2000);
  }
  

  // Función para abrir el explorador de archivos para subir un archivo
  ngAfterViewInit(): void {
    const formFileTriggerList = document.querySelectorAll('.form-file');
    [...formFileTriggerList].forEach((formFileTriggerEl) => {
      const formFile = new kitUnal.FormFile(formFileTriggerEl);
      formFile.init();
    });
  }

  


}
