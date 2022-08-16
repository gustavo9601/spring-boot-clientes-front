import {Injectable} from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from "rxjs";
import swal from "sweetalert2";
import {Router} from "@angular/router";
import {DatePipe, formatDate} from "@angular/common";
import {LOCALE_ID, Inject} from '@angular/core';
import {Cliente} from "../models/cliente";
import {Pageable, Pagination} from "../models/pagination";
import {AuthService} from "../usuarios/auth.service";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = environment.api + 'api/clientes';

  constructor(private http: HttpClient,
              private router: Router,
              @Inject(LOCALE_ID) public locale: string,
              private authService: AuthService
  ) {

  }

  /*
  // Añadiendo los headers de forma manual
  public agregarAuthorizationHeader() : HttpHeaders{
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }*/

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      // map(response => response as Cliente[])
      map(response => {
        return (response as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // formatDate() // formate la fecha usando funcion propia de angular
          // cliente.auditoria.createdAt = formatDate(cliente.auditoria.createdAt, 'dd/MM/yyyy', this.locale);

          // Usando el pipe de angular para formatear la fecha
          // DatePipe('formato a retornar la fecha').transform(fecha_a_cambiar, 'formato');
          console.log("locale global", this.locale);
          cliente.auditoria.createdAt = <string>new DatePipe(this.locale)
            .transform(cliente.auditoria.createdAt, 'EEEE, dd/MM/yyyy');
          return cliente;
        });
      })
    );
  }

  getClientePagination(page: number): Observable<Pagination> {
    return this.http.get<Pagination>(this.urlEndPoint + '/page/' + page);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente).pipe(
      map(response => response as Cliente)
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,
      cliente);
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`);
  }


  subirFoto(archivo: File, id: string): Observable<HttpEvent<Cliente>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }


    /*
    * HttpRequest // Tiene soporte para verificar el progress de la subida de datos o archivos
    * // reportProgress: true // habilita el progreso
    * */

    const request = new HttpRequest('POST',
      `${this.urlEndPoint}/upload`,
      formData, {reportProgress: true, headers: httpHeaders});
    return this.http.request<Cliente>(request);
  }

  /*
  // Manejo de errores de forma manual
  public isNoAutorizado(error: HttpErrorResponse): boolean {
    if (error.status == 401) {
      this.router.navigate(['/login']);

      // validando si estamos autenticados
      if(this.authService.isAuthenticated()){
        this.authService.logout();
      }

      return true;
    }
    if(error.status == 403){
      swal.fire('Acceso denegado', 'No tienes acceso a este recurso', 'warning');
      this.router.navigate(['/clientes']);
      return true;
    }

    return false;
  }*/

}
