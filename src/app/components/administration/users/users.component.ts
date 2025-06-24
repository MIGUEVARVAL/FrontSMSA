import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../../services/APIs/backend/models/User/user.service';
import {
  User,
  UserListResponse,
} from '../../../services/APIs/backend/models/User/user.model';
import { LoadingComponent } from '../../../templates/loading/loading.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
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
  protected successMessage: string = '';
  protected isError: boolean = false;
  protected errorMessage: string = '';

  /**
   * Lista de usuarios obtenidos del servicio.
   * @protected
   * @type {User[]}
   */
  protected usersActivos: UserListResponse = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  protected usersSolicitudes: UserListResponse = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  /**
   * Formulario reactivo para editar un usuario
   * @protected
   * @type {FormGroup}
   */
  protected UserEditForm = new FormGroup({
    firstName: new FormControl('Miguel Ángel', Validators.required),
    lastName: new FormControl('Vargas Valencia', Validators.required),
    login: new FormControl('mivargasv', Validators.required),
    dependence: new FormControl('Dirección Académica', Validators.required),
  });

  /**
   * Constructor del componente de usuarios.
   * @param {UserService} userService - Servicio para manejar las operaciones de usuario.
   */
  constructor(private userService: UserService) {}

  /**
   * Función que se ejecuta al inicializar el componente.
   * Aquí se obtienen los usuarios.
   */
  ngOnInit() {
    this.getUsersActivos();
    this.getUsersSolicitudes();
  }

  /**
   * Función para obtener los usuarios activos. (Permisos > 0)
   * @protected
   * @returns {void}
   */
  protected getUsersActivos(): void {
    this.isLoading = true;
    this.userService.getUsersWithPermissionsGreaterThanOne().subscribe({
      next: (users: UserListResponse) => {
        this.isLoading = false;
        this.usersActivos = users;
      },
      error: (error: any) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Error al cargar los usuarios: ' + error.message;
        console.error(error);
      },
    });
  }

  /**
   * Función para obtener los usuarios con solicitudes pendientes. (Permisos = 0)
   * @protected
   * @returns {void}
   */
  protected getUsersSolicitudes(): void {
    this.isLoading = true;
    this.userService.getUsersWithPermissionsZero().subscribe({
      next: (users: UserListResponse) => {
        this.isLoading = false;
        this.usersSolicitudes = users;
      },
      error: (error: any) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Error al cargar las solicitudes: ' + error.message;
      },
    });
  }

  /**
   * Función para eliminar un usuario.
   * @protected
   * @param {number} userId - ID del usuario a eliminar.
   * @returns {void}
   */
  protected deleteUser(userId: number): void {
    this.isLoading = true;
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSuccess = true;
        this.successMessage = 'Usuario eliminado correctamente.';
        this.getUsersActivos(); // Actualizar la lista de usuarios activos
      },
      error: (error: any) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Error al eliminar el usuario: ' + error.message;
        console.error(error);
      },
    });
  }

  /**
   * Función para aprobar una solicitud de usuario.
   * @protected
   * @param {number} userId - ID del usuario a aprobar.
   * @returns {void}
   */
  protected approveUserRequest(user: User): void {
    this.isLoading = true;
    user.nivel_permisos = 1; // Asignar permisos de usuario
    this.userService.updateUser(user.id!, { nivel_permisos: 1 }).subscribe({
      next: () => {
        this.isSuccess = true;
        this.successMessage = 'Solicitud aprobada correctamente.';
        this.getUsersSolicitudes(); // Actualizar la lista de solicitudes
        this.getUsersActivos(); // Actualizar la lista de usuarios activos
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Error al aprobar la solicitud: ' + error.message;
        console.error(error);
      },
    });
  }

  /**
   * Función para editar un usuario.
   * Está función se ejecuta al enviar el formulario.
   * @protected
   * @returns {void}
   */
  protected editUser() {}
}
