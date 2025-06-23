import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
// Importación del servicio de autenticación
import { AuthService } from '../../../services/APIs/backend/authentication/auth.service';

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
   * @param {AuthService} authService - Servicio de autenticación para manejar el inicio de sesión.
   * @param {Router} router - Router para redirigir al usuario.
   */
  constructor(
    private authService: AuthService,
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
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';

    // Se verifica si el formulario es válido
    if (this.loginForm.invalid) {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = "Por favor, complete todos los campos requeridos.";
      return;
    }

    // Se llama al servicio de autenticación para iniciar sesión
    this.authService.login({ username, password }).subscribe({
      next: (response) => {
        const isSuccess = this.authService.saveLoginInfo(response.access, response.refresh, response.user);
        this.isLoading = false;
        if (isSuccess) {
          this.router.navigate(['/home']);
        } else {
          this.isError = true;
          this.errorMessage = "Su registro no ha sido aprobado. Por favor, contacte al administrador.";
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = "Error al iniciar sesión. Por favor, inténtelo de nuevo.";
      }
    });
  }

}
