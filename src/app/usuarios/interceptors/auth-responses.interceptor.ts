import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "../auth.service";
import swal from "sweetalert2";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class AuthResponsesInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  /*
  * Interceptor que escuchara la respuesta del request, filtrando si da error
  * */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            if(this.authService.isAuthenticated()){
              this.authService.logout();
            }
            this.router.navigate(['/login']);
          }
          if (error.status === 403) {
            swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso`, 'warning');
            this.router.navigate(['/clientes']);
          }
          return throwError(error);
        })
      );
  }
}
