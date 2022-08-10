import {Injectable} from '@angular/core';
import {Cliente} from './cliente';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from "rxjs";
import swal from "sweetalert2";
import {Router} from "@angular/router";
import {DatePipe, formatDate} from "@angular/common";
import { LOCALE_ID, Inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router,
              @Inject(LOCALE_ID) public locale: string
              ) {

  }

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

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map(response => response as Cliente)
    ) .pipe(catchError((error) => {


      if(error.status==400){
        return throwError(error); // lo retornamos para que el componente le de el manejo
      }

      console.log("Error al crear:", error);
      swal.fire('Error al crear', error.error.mensaje, 'error');
      return throwError(error);
    }));;
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
      .pipe(catchError((error) => {
        console.log("Error al consultar:", error);
        swal.fire('Error al consultar', error.error.mensaje, 'error');
        this.router.navigate(['/clientes']);
        return throwError(error);
      }));
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,
      cliente,
      {headers: this.httpHeaders})
      .pipe(catchError((error) => {
        console.log("Error al editar:", error);


        if(error.status==400){
          return throwError(error); // lo retornamos para que el componente le de el manejo
        }

        swal.fire('Error al editar', error.error.mensaje, 'error');
        return throwError(error);
      }));
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
      .pipe(catchError((error) => {
        console.log("Error al eliminar:", error);
        swal.fire('Error al eliminar', error.error.mensaje, 'error');
        return throwError(error);
      }));
  }


}
