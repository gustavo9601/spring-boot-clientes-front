import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {Region} from "../models/region";


@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes/regiones';

  constructor(private http: HttpClient
  ) {

  }

  getRegiones(): Observable<Region[]> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      // map(response => response as Cliente[])
      map(response => {
        return (response as Region[]).map(region => {
          return region;
        });
      })
    );
  }

}
