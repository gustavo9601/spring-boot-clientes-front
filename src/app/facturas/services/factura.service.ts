import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Factura} from "../../models/factura";
import {Producto} from "../../models/producto";

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndPoint: string = environment.api + 'api/facturas';

  constructor(private httpCliente: HttpClient) {
  }

  getFactura(id: number): Observable<Factura> {
    return this.httpCliente
      .get<Factura>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number): Observable<void>{
    return this.httpCliente.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  create(factura: Factura): Observable<Factura> {
    return this.httpCliente.post<Factura>(this.urlEndPoint, factura);
  }

  filtrarProductos(filterValue: string) : Observable<Producto[]>{
    return this.httpCliente.get<Producto[]>(`${this.urlEndPoint}/filtrar-productos/${filterValue}`);
  }
}
