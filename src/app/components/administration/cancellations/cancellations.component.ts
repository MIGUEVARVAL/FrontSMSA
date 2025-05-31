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

  // Variables booleadas para mostrar carga, exito y error
  isLoading: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;


  // Función para abrir el explorador de archivos para subir un archivo
  ngAfterViewInit(): void {
    const formFileTriggerList = document.querySelectorAll('.form-file');
    [...formFileTriggerList].forEach((formFileTriggerEl) => {
      const formFile = new kitUnal.FormFile(formFileTriggerEl);
      formFile.init();
    });
  }

}
