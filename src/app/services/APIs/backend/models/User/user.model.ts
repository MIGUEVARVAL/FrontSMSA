export interface User {
  id: number;
  name: string;
  email: string;
  nivel_permisos: number; // e.g., 'admin' or 'user'
  isActive: boolean;
}
