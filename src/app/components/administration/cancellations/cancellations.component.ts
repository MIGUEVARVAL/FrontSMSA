import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

declare const kitUnal: any;

@Component({
  selector: 'app-cancellations',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './cancellations.component.html',
  styleUrl: './cancellations.component.scss'
})
export class CancellationsComponent {

  // Variables booleanas para mostrar carga, exito y error
  isLoading: boolean = false;
  isSuccess: boolean = false;
  successMessage: string = "";
  isError: boolean = false;
  errorMessage: string = "";

  protected loadCancellationsForm = new FormGroup({
    file: new FormControl('', Validators.required),
  });

  // Función para cargar los estudiantes
  loadCancellations() {
    this.isLoading = true;

    if (this.loadCancellationsForm.invalid) {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = "Por favor, complete todos los campos requeridos.";
      return;
    }
    // Simula una carga de estudiantes
    setTimeout(() => {
      this.loadCancellationsForm.reset();
      this.isLoading = false;
      this.isSuccess = true;
      this.successMessage = "Las asignaturas canceladas fueron cargadas correctamente.";
      this.isError = false;
      this.errorMessage = "No se lograron cargar las asignaturas canceladas, por favor verifique el archivo y vuelva a intentarlo";
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
