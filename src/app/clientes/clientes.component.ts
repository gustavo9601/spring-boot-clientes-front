import {Component, OnInit, Optional} from '@angular/core';
import {ClienteService} from './cliente.service';
import swal from 'sweetalert2';
import {Cliente} from "../models/cliente";
import {ActivatedRoute} from "@angular/router";
import {Pagination} from "../models/pagination";
import {AuthService} from "../usuarios/auth.service";


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] | undefined;
  numberPage: number = 1;
  pagination: Pagination = {};

  constructor(private clienteService: ClienteService,
              public authService: AuthService,
              private activatedRoute: ActivatedRoute) {
    this.clientes = [];
  }

  ngOnInit() {

    this.activatedRoute.paramMap
      .subscribe((params) => {
        this.numberPage = params.get('page') ? Number(params.get('page')) : 1;
        this.getClientes(this.numberPage);
      });

  }

  public getClientes(page: number): void {
    /*this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );*/
    this.clienteService.getClientePagination(page).subscribe(
      pagination => {
        this.clientes = pagination.content;
        this.pagination = pagination;
      }
    );
  }

  delete(cliente: Cliente): void {
    swal.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          (response) => {
            console.log("Respuesta eliminar:", response);
            swal.fire(
              'Cliente eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito`,
              'success'
            )
            this.getClientes(this.numberPage);
          }
        )
      }
    })
  }

}
