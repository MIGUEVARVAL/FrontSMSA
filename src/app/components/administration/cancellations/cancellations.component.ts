import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

declare const kitUnal: any;

@Component({
  selector: 'app-cancellations',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cancellations.component.html',
  styleUrl: './cancellations.component.scss'
})
export class CancellationsComponent {

  // Variables booleanas para mostrar carga, exito y error
  isLoading: boolean = false;
  isSuccess: boolean = true;
  messageSuccess: string = "Las asignaturas canceladas fueron cargadas correctamente.";
  isError: boolean = true;
  messageError: string = "No se lograron cargar las asignaturas canceladas, por favor verifique el archivo y vuelva a intentarlo";


  // Función para abrir el explorador de archivos para subir un archivo
  ngAfterViewInit(): void {
    const formFileTriggerList = document.querySelectorAll('.form-file');
    [...formFileTriggerList].forEach((formFileTriggerEl) => {
      const formFile = new kitUnal.FormFile(formFileTriggerEl);
      formFile.init();
    });
  }

}
