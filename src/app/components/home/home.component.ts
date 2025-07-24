import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../../templates/loading/loading.component';

@Component({
  selector: 'app-home',
  imports: [RouterModule, LoadingComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  /**
   * Variable de carga
   * @type {boolean}
   * @protected
   */
  protected loading = true;

}
