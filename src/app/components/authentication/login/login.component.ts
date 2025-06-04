import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  constructor(private authService: AuthenticationService, private router: Router) {}

  isLoading = false;
  isError = false;
  errorMessage = '';

  /**
   * Variable para manejar el formulario de inicio de sesión.
   * @type {FormGroup}
   * @protected
   */
  protected loginForm = new FormGroup({
    username: new FormControl('mivargasv', Validators.required, ),
    password: new FormControl('12345678', Validators.required),
  });

  login() {
    // Se obtienen los valores de los campos del formulario
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (this.loginForm.valid) {
      if (username == "mivargasv" && password == "12345678") {
        // Se llama al servicio de autenticación para iniciar sesión
        this.authService.login(username, "Miguel Vargas");
        this.router.navigate(['/home']);
      }else {
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
