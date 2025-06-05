import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

declare const kitUnal: any;

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  // Variables booleanas para mostrar carga, exito y error
  isLoading: boolean = false;
  isSuccess: boolean = false;
  successMessage: string = "";
  isError: boolean = false;
  errorMessage: string = "";

  protected loadStudentsForm = new FormGroup({
    facultad: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required),
  });


  // Variable con las facultades
  facultades = 
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


  constructor() {
  }

  // Función para cargar los estudiantes
  loadStudents() {
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
