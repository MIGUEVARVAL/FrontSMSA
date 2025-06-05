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

  // Variables booleadas para mostrar carga, exito y error
  isLoading: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;

  protected UserEditForm = new FormGroup({
    firstName: new FormControl('Miguel Ángel', Validators.required),
    lastName: new FormControl('Vargas Valencia', Validators.required),
    login: new FormControl('mivargasv', Validators.required),
    dependence: new FormControl('Dirección Académica', Validators.required)
  });

  userEdit() {
  }

}
