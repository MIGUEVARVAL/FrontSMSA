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
import { DatePipe } from '../../../templates/pipes/date.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, LoadingComponent, DatePipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  
  /**
   * Variables booleanas para mostrar carga, exito y error
   * @protected
   * @property {boolean} isLoading - Indica el proceso de carga.
   * @property {boolean} isSuccess - Indica si la carga fue exitosa.
   * @property {string} successMessage - Mensaje de éxito a mostrar.
   * @property {boolean} isError - Indica si hubo un error en la carga.
   * @property {string} errorMessage - Mensaje de error a mostrar.
   * @property {boolean} isSuccessUpdate - Indica si la actualización fue exitosa.
   * @property {boolean} isErrorUpdate - Indica si hubo un error al actualizar.
   * @property {string} errorMessageUpdate - Mensaje de error al actualizar
   */
  protected isLoading: boolean = false;
  protected isSuccess: boolean = false;
  protected successMessage: string = '';
  protected isError: boolean = false;
  protected errorMessage: string = '';
  protected isSuccessUpdate: boolean = false;
  protected isErrorUpdate: boolean = false;
  protected errorMessageUpdate: string = '';

  /**
   * Variables para la paginación de usuarios activos.
   * @protected
   * @property {number} activosPage - Página actual de usuarios activos.
   * @property {number} solicitudesPage - Página actual de solicitudes de usuarios.
   */
  protected activosPage = 1;
  protected solicitudesPage = 1;

  protected filtrosActivos = {
    username: '',
    firstName: '',
    lastName: '',
    dependence: '',
    nivel_permisos: 0,
  };

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
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    dependence: new FormControl('', Validators.required),
    nivel_permisos: new FormControl(0, Validators.required), 
  });

  /**
   * Formulario reactivo para buscar un usuario
   * @protected
   * @type {FormGroup}
   */
  protected UserSearchForm = new FormGroup({
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dependence: new FormControl('', Validators.required),
    nivel_permisos: new FormControl(0, Validators.required),
  });

  /**
   * Constructor del componente de usuarios.
   * @param {UserService} userService - Servicio para manejar las operaciones de usuario.
   */
  constructor(private userService: UserService) { }

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
  protected getUsersActivos(filterData?: any): void {
    this.isLoading = true;
    let page = this.activosPage;
      if (filterData && filterData.nivel_permisos !== undefined) {
        filterData.nivel_permisos = Number(filterData.nivel_permisos);
      }
    this.userService.getUsersWithPermissionsGreaterThanOne(page, filterData).subscribe({
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
  protected getUsersSolicitudes(filterData?: any): void {
    this.isLoading = true;
    if (filterData) {
      filterData.nivel_permisos = 0; 
    }
    this.userService.getUsersWithPermissionsZero(this.solicitudesPage, filterData).subscribe({
      next: (users: UserListResponse) => {
        console.log(users);
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
        this.getUsersActivos(); 
        this.getUsersSolicitudes(); 
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
    this.userService.updateUser(user.id!, { nivel_permisos: 2 }).subscribe({
      next: () => {
        this.isSuccess = true;
        this.successMessage = 'Solicitud aprobada correctamente.';
        // Eliminar el usuario de la lista de solicitudes
        this.usersSolicitudes.results = this.usersSolicitudes.results.filter(u => u.id !== user.id);
        const updatedUser: User = { ...user, nivel_permisos: 2 };
        this.usersActivos.results = [updatedUser, ...this.usersActivos.results];
        this.usersSolicitudes.count = Math.max(0, this.usersSolicitudes.count - 1);
        this.usersActivos.count = this.usersActivos.count + 1;
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
   * Función para cargar la información en el modal de edición de usuario.
   * @protected
   * @param {number} userId - ID del usuario a rechazar.
   * @returns {void}
   */
  protected openEditUserModal(user: User): void {
    this.UserEditForm.patchValue({
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      dependence: user.cargo,
      nivel_permisos: user.nivel_permisos
    });
  }

  /**
   * Función para editar un usuario.
   * @protected
   * @param {number} userId - ID del usuario a editar.
   * @returns {void}
   */
  protected editUser(userId: number): void {
    if (this.UserEditForm.valid) {
      const formValue = this.UserEditForm.value;
      const userUpdate: Partial<User> = {
        first_name: formValue.firstName ?? '',
        last_name: formValue.lastName ?? '',
        username: formValue.username ?? '',
        cargo: formValue.dependence ?? '',
        nivel_permisos: formValue.nivel_permisos ?? 0,
      };
      this.userService.updateUser(userId, userUpdate).subscribe({
        next: () => {
          this.isSuccessUpdate = true;
          const index = this.usersActivos.results.findIndex(user => user.id === userId);
          if (index !== -1) {
            this.usersActivos.results[index] = {
              ...this.usersActivos.results[index],
              ...userUpdate,
            };
          }
        },
        error: (error: any) => {
          this.isErrorUpdate = true;
          this.errorMessageUpdate = 'Error al actualizar el usuario: ' + error.message;
          console.error(error);
        }
      });
    }
  }

  /**
   * Función para buscar un usuario.
   * @protected
   * @returns {void}
   */
  protected searchUser(): void {
    this.filtrosActivos = {
      username: this.UserSearchForm.value.username || '',
      firstName: this.UserSearchForm.value.firstName || '',
      lastName: this.UserSearchForm.value.lastName || '',
      dependence: this.UserSearchForm.value.dependence || '',
      nivel_permisos: this.UserSearchForm.value.nivel_permisos || 0
    };
    this.getUsersActivos(this.UserSearchForm.value);
    this.getUsersSolicitudes(this.UserSearchForm.value);
    console.log("Filtros",this.filtrosActivos);
  }

  protected clearSearch(): void {
    this.UserSearchForm.reset();
    this.getUsersActivos();
    this.getUsersSolicitudes();
    this.filtrosActivos = {
      username: '',
      firstName: '',
      lastName: '',
      dependence: '',
      nivel_permisos: 0
    };
  }

  get totalPagesActivos(): number {
    return Math.ceil(this.usersActivos.count / (this.userService.getCustomPageSize())) || 1;
  }
  protected onActivosPageChange(page: number): void {
    if (page < 1 || page > this.totalPagesActivos) return;
    this.activosPage = page;
    this.getUsersActivos(this.UserSearchForm.value);
  }

  get totalPagesSolicitudes(): number {
    return Math.ceil(this.usersSolicitudes.count / (this.userService.getCustomPageSize())) || 1;
  }
  protected onSolicitudesPageChange(page: number): void {
    if (page < 1 || page > this.totalPagesSolicitudes) return;
    this.solicitudesPage = page;
    this.getUsersSolicitudes(this.UserSearchForm.value);
  }


  ngAfterViewInit() {
    const selectTriggerList = document.querySelectorAll('.form-tom-select');
    const config = {};
    const selectList = [...selectTriggerList].map(selectEl => new (window as any).bootstrap.FormSelect(selectEl, config));
  }

}
