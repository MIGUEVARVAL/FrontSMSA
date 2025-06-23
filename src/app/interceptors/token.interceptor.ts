import { HttpInterceptorFn } from '@angular/common/http';
import { from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token');
  let refreshToken = localStorage.getItem('refreshToken');
  console.log('Token Interceptor:', token, refreshToken);

  // Attach token if present
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq).pipe(
      catchError((error: any) => {
        if (error.status === 401 && refreshToken) {
          // Call your refresh endpoint here (example)
          return from(
            fetch('/api/auth/refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refreshToken })
            })
          ).pipe(
            switchMap(async (response) => {
              if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                // Retry original request with new token
                const retryReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${data.token}`
                  }
                });
                return next(retryReq);
              } else {
                return throwError(() => error);
              }
            }),
            switchMap(obs => obs)
          );
        }
        return throwError(() => error);
      })
    );
  }
  return next(req);
};
