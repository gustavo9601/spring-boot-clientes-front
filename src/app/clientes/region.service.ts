import {Injectable} from '@angular/core';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from "rxjs";
import {Region} from "../models/region";
import {ClienteService} from "./cliente.service";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private urlEndPoint: string = environment.api + 'api/clientes/regiones';

  constructor(private http: HttpClient,
              private clienteService: ClienteService
  ) {

  }

  getRegiones(): Observable<Region[]> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      // map(response => response as Cliente[])
      map(response => {
          console.log("response =>", response);
          return (response as Region[]).map(region => {
            return region;
          });
        }
      ));
  }

}
