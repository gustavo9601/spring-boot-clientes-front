import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../auth.service";
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Si no estamos autenticados
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    console.log("data enviada en la ruta =>\t", route.data);
    let role = route.data.role as string; // extraemos el rol
    if (!this.authService.hasRole(role)) {
      this.router.navigate(['/clientes']);
      swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso`, 'warning');
      return false;
    }
    return true;
  }

}
