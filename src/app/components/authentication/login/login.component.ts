import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
// Importación del servicio de autenticación
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {

  /**
   * Constructor del componente de inicio de sesión.
   * @param {AuthenticationService} authService - Servicio de autenticación para manejar el inicio de sesión.
   * @param {Router} router - Router para redirigir al usuario.
   */
  constructor(
    private authService: AuthenticationService, 
    private router: Router
  ) { }

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
   * Formulario reactivo para el inicio de sesión
   * @protected
   * @type {FormGroup}
   */
  protected loginForm = new FormGroup({
    username: new FormControl('mivargasv', Validators.required),
    password: new FormControl('12345678', Validators.required),
  });

  /**
   * Función que se ejecuta al inicializar el componente.
   */
  ngOnInit() {
    // Se verifica si el usuario ya está logueado
    if (this.authService.isUserLoggedIn()) {
      // Si el usuario ya está logueado, se redirige a la página de inicio
      this.router.navigate(['/home']);
    }
  }

  /**
   * Función para iniciar sesión.
   * Está función se ejecuta al enviar el formulario.
   * @protected
   * @returns {void}
   */
  protected login() {

    this.isLoading = true;
    // Se obtienen los valores de los campos del formulario
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    // Validar si el formulario es válido
    if (this.loginForm.valid) {
      if (username == "mivargasv" && password == "12345678") {
        setTimeout(() => {
          // Se llama al servicio de autenticación para iniciar sesión
          this.authService.login(username, "Miguel Vargas");
          this.router.navigate(['/home']);
          this.isLoading = false;
        }, 1000);

      } else {
        // Si las credenciales son incorrectas, se muestra un mensaje de error
        this.isError = true;
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    } else {
      // Si el formulario no es válido, se muestra un mensaje de error
      this.isError = true;
      this.errorMessage = 'Por favor, completa todos los campos requeridos';
    }

  }

}
