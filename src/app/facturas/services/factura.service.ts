import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Factura} from "../../models/factura";

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
}
