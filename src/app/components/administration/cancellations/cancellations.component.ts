import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

/**
 * Utilizada para el manejo de archivos y formularios
 * @type {any}
 */
declare const kitUnal: any;

@Component({
  selector: 'app-cancellations',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
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
   * Función para cargar las asignaturas canceladas.
   * Está función se ejecuta al enviar el formulario.
   * @protected
   * @returns {void}
   */
  protected loadCancellations() {
    this.isLoading = true;

    if (this.loadCancellationsForm.invalid) {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = "Por favor, complete todos los campos requeridos.";
      return;
    }
    setTimeout(() => {
      this.loadCancellationsForm.reset();
      this.isLoading = false;
      this.isSuccess = true;
      this.successMessage = "Las asignaturas canceladas fueron cargadas correctamente.";
      this.isError = false;
      this.errorMessage = "No se lograron cargar las asignaturas canceladas, por favor verifique el archivo y vuelva a intentarlo";
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

}
