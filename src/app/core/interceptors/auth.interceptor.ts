import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAppApi = request.url.includes(environment.apiUrl);
    const isExternalApi = request.url.includes(environment.weather.apiUrl);

    const authToken = this.authService.authToken;

    if (authToken && isAppApi) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    if (isExternalApi) {
      request = request.clone({
        setParams: {
          appid: environment.weather.apiKey,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403 && isAppApi) {
          this.authService.removeAuthToken();
          this.router.navigate(['/']);
        }

        return throwError(() => new Error());
      })
    );
  }
}
