import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  /**
   * Nombre de la dependencia
   * @protected
   * @type {string}
   */
  protected nombre: string = "Sistema de Monitoreo y Seguimiento Académico UNAL";

  /**
   * Versión del aplicativo
   * @protected
   * @type {string}
   */
  protected version: string = "1.0.0";

}
