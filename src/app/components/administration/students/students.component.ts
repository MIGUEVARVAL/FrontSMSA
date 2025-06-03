import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

declare const kitUnal: any;

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  // Variables booleanas para mostrar carga, exito y error
  isLoading: boolean = false;
  isSuccess: boolean = true;
  messageSuccess: string = "50 estudiantes fueron cargados correctamente, 200 estudiantes fueron actualizados correctamente.";
  isError: boolean = true;
  messageError: string = "No se lograron cargar 5 estudiantes, por favor verifique el archivo y vuelva a intentarlo, puede descargar el archivo de error para ver los detalles.";


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

  

  // Función para abrir el explorador de archivos para subir un archivo
  ngAfterViewInit(): void {
    const formFileTriggerList = document.querySelectorAll('.form-file');
    [...formFileTriggerList].forEach((formFileTriggerEl) => {
      const formFile = new kitUnal.FormFile(formFileTriggerEl);
      formFile.init();
    });
  }


}
