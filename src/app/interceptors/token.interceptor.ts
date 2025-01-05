import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, finalize, switchMap, throwError } from 'rxjs';
import { ToastService } from '../services/message.service';
import { tokenAPI } from '../models/token';
import { Router } from '@angular/router';
import { response } from '../models/responseDto';
import { LoadingService } from '../services/loader.service';

// Keep track of active requests
let totalRequests = 0;

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toastService = inject(ToastService);
  const router = inject(Router);
  const loadingService = inject(LoadingService);

  const handleUnAuthorizedError = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const tokenapiModel: tokenAPI = {
      accessToken: authService.getToken(),
      refreshToken: authService.getRefreshToken(),
    };

    return authService.renewToken(tokenapiModel).pipe(
      switchMap((data: response) => {
        authService.storeRefreshToken(data.response.refreshToken);
        authService.storeToken(data.response.accessToken);

        const updatedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${data.response.accessToken}`),
        });

        return next(updatedReq);
      }),
      catchError((error: any) => {
        toastService.showError('Unauthorized', error.error?.message || 'Session expired. Please login again.');
        router.navigate(['login']);
        return throwError(() => error);
      })
    );
  };

  totalRequests++;
  loadingService.show();

  const token = authService.getToken();
  const clonedRequest = token
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    : req;

  return next(clonedRequest).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          return handleUnAuthorizedError(req, next);
        } else {
          return throwError(() => error);
        }
      }
      return throwError(() => error);
    }),
    finalize(() => {
      totalRequests--;
      if (totalRequests === 0) {
        // Hide loader if no requests are pending
        loadingService.hide();
      }
    })
  );
};