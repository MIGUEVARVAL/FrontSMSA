import { HttpInterceptorFn } from '@angular/common/http';
import { from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '../services/APIs/backend/authentication/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token');
  let refreshToken = localStorage.getItem('refreshToken');
  const authService = inject(AuthService);

  // Attach token if present
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(authReq).pipe(
      catchError((error: any) => {
        if (error.status === 401 && refreshToken) {
          return from(
            fetch('http://localhost:8000/api/token/refresh/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh: refreshToken }),
            })
          ).pipe(
            switchMap(async (response) => {
              if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access);
                // Retry original request with new token
                const retryReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${data.access}`,
                  },
                });
                return next(retryReq);
              } else {
                // Si el refresh también falla, limpia el localStorage
                authService.logout();
                window.location.href = '/login';
                return throwError(() => error);
              }
            }),
            switchMap((obs) => obs)
          );
        }
        return throwError(() => error);
      })
    );
  }
  return next(req);
};
