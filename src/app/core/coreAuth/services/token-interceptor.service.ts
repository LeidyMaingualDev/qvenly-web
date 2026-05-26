import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

/**
 * Interceptor HTTP que gestiona automáticamente la renovación del token JWT.
 *
 * Flujo:
 * 1. Agrega withCredentials a todas las peticiones para enviar cookies HttpOnly.
 * 2. Si recibe un 401, llama a /auth/refresh-from-cookie para renovar el token.
 * 3. Si el refresh es exitoso, reintenta la petición original automáticamente.
 * 4. Si el refresh falla, redirige al login.
 */
export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const http = inject(HttpClient);

  const authReq = req.clone({ withCredentials: true });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      // Si no es 401, o es el mismo refresh/login, propagar el error sin reintentar
      if (
        error.status !== 401 ||
        req.url.includes('/auth/refresh-from-cookie') ||
        req.url.includes('/auth/login')
      ) {
        return throwError(() => error);
      }

      // Intentar renovar el token desde la cookie
      return http.post<any>(
        `${environment.apiUrl}/auth/refresh-from-cookie`,
        {},
        { withCredentials: true }
      ).pipe(
        switchMap(() => {
          // Token renovado exitosamente, reintentar la petición original
          return next(authReq);
        }),
        catchError(() => {
          // El refresh falló, sesión expirada → redirigir al login
          router.navigate(['/auth/login']);
          return throwError(() => error);
        })
      );
    })
  );
};