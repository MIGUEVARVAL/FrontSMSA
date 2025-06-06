import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

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
   * Formulario reactivo para editar un usuario
   * @protected
   * @type {FormGroup}
   */
  protected UserEditForm = new FormGroup({
    firstName: new FormControl('Miguel Ángel', Validators.required),
    lastName: new FormControl('Vargas Valencia', Validators.required),
    login: new FormControl('mivargasv', Validators.required),
    dependence: new FormControl('Dirección Académica', Validators.required)
  });

  /**
   * Función para editar un usuario.
   * Está función se ejecuta al enviar el formulario.
   * @protected
   * @returns {void}
   */
  protected editUser() {
  }

}
