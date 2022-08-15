import {Component, OnInit} from '@angular/core';
import {Usuario} from "../models/usuario";
import swal from "sweetalert2";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = "Iniciar sesion";
  usuario: Usuario;

  constructor(private authService: AuthService,
              private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      console.log("Ya estas autenciado!!!");
      this.router.navigate(["/clientes"]);
    }
  }

  login(): void {
    console.log("this.usuario", this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
        console.log("response login =>\t", response);

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);

        let usuario = this.authService.usuario;
        this.router.navigate(['/clientes']);
        swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');

      }, err => {
        console.log("error => ", err);
        if (err.status == 400 || err.status == 401) {
          swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
        }
      }
    );

  }

}
