import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/APIs/backend/models/User/user.service';
import { AuthService } from '../../../services/APIs/backend/authentication/auth.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {

  /**
   * Constructor del componente de registro.
   * @param {Router} router - Router para redirigir al usuario.
   * @param {UserService} userService - Servicio para manejar la lógica de usuarios.
   * @param {AuthService} authService - Servicio de autenticación para manejar el inicio de sesión.
   */
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

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
   * Formulario reactivo para el registro de usuarios
   * @protected
   * @type {FormGroup}
   */
  protected signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    dependence: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    ley1581: new FormControl(true, Validators.requiredTrue)
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
   * Función para registrar al usuario.
   * Está función se ejecuta al enviar el formulario.
   * @protected
   * @returns {void}
   */
  protected signup() {

    this.isLoading = true;

    if (this.signupForm.invalid) {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = "Por favor, complete todos los campos requeridos.";
      return;
    } else if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = "Las contraseñas no coinciden.";
      return;
    }

    const user = {
      first_name: this.signupForm.value.firstName ?? '',
      last_name: this.signupForm.value.lastName ?? '',
      username: this.signupForm.value.login ?? '',
      email: this.signupForm.value.login + '@unal.edu.co',
      password: this.signupForm.value.password ?? '',
      is_active: true,
      cargo: this.signupForm.value.dependence ?? ''
    };

    this.userService.createUser(user).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isSuccess = true;
        this.successMessage = "Registro exitoso";
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = "Error en el registro";
        console.error('Error al registrar el usuario:', error);
      }
    });

  }



}
