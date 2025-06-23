export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  cargo: string; 
  nivel_permisos?: number;
  is_active?: boolean;
  is_staff?: boolean; 
  password?: string; 
  date_joined?: string; 
  last_login?: string; 
}
