import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

declare const kitUnal: any;


@Component({
  selector: 'app-final-grades',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './final-grades.component.html',
  styleUrl: './final-grades.component.scss'
})
export class FinalGradesComponent {

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
