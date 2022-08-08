import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente";
import {ClienteService} from "./cliente.service";
import {Router, ActivatedRoute} from "@angular/router";
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente() {
    this.activatedRoute.params.subscribe(
      (params) => {
        let id = params['id'];
        if (id) {
          this.clienteService.getCliente(id).subscribe(
            (cliente) => {
              this.cliente = cliente;
              this.titulo = "Editar Cliente";
            }
          )
        }
      }
    )
  }

  create(): void {
    console.log("cliente=", this.cliente);
    this.cliente.auditoria = {
      createdAt: "",
      updatedAt: ""
    }
    this.clienteService.create(this.cliente).subscribe(
      (respuesta: Cliente) => {
        console.log("Cliente creado:", respuesta);

        swal.fire(
          'Nuevo cliente',
          `El cliente ${this.cliente.nombre} ha sido creado con éxito`,
          'success'
        )

        this.router.navigate(['/clientes']);
      }
    )
  }

  update(): void {
    this.cliente.auditoria = {
      updatedAt: "",
      createdAt: ""
    }
    console.log("cliente a actualizar=", this.cliente);
    this.clienteService.update(this.cliente).subscribe(
      (respuesta: Cliente) => {
        console.log("Cliente actualizado:", respuesta);

        swal.fire(
          'Cliente actualizado',
          `El cliente ${this.cliente.nombre} ha sido actualizado con éxito`,
          'success'
        )

        this.router.navigate(['/clientes']);
      }
    )
  }
}
