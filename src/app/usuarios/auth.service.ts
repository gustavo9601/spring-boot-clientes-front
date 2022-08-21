import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usuario} from "../models/usuario";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) {
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndPoint: string = environment.api + 'oauth/token';

    const credenciales = btoa('angular' + ':' + '12345'); // encode en base 64
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + credenciales,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    console.log("user", usuario);
    console.log("headers", httpHeaders.toString());

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log("params.toString() =>\t", params.toString());

    return this.http.post<any>(urlEndPoint, params.toString(), {headers: httpHeaders});
  }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken).usuario_por_bd;
    console.log("payload =>\t", payload);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.username;
    this._usuario.roles = payload.roles;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }


  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      // atob // decode from base64 to string
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    // console.log("payload =>\t", payload);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  public hasRole(role: string): boolean {
    if (this.usuario.roles.some(item => item.nombre === role)) {
      return true;
    }
    return false;
  }
}
