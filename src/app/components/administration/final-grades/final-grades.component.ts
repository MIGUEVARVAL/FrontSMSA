import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

declare const kitUnal: any;


@Component({
  selector: 'app-final-grades',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './final-grades.component.html',
  styleUrl: './final-grades.component.scss'
})
export class FinalGradesComponent {

  // Variables booleanas para mostrar carga, exito y error
  isLoading: boolean = false;
  isSuccess: boolean = false;
  successMessage: string = "";
  isError: boolean = false;
  errorMessage: string = "";

  protected loadFinalGradesForm = new FormGroup({
    file: new FormControl('', Validators.required),
  });

  // Función para cargar los estudiantes
  loadFinalGrades() {
    this.isLoading = true;

    if (this.loadFinalGradesForm.invalid) {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = "Por favor, complete todos los campos requeridos.";
      return;
    }
    // Simula una carga de estudiantes
    setTimeout(() => {
      this.loadFinalGradesForm.reset();
      this.isLoading = false;
      this.isSuccess = true;
      this.successMessage = "Las notas finales fueron cargadas correctamente.";
      this.isError = false;
      this.errorMessage = "No se lograron cargar las notas finales, por favor verifique el archivo y vuelva a intentarlo";
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
