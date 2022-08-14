import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ClienteService} from "./cliente.service";
import {Router, ActivatedRoute} from "@angular/router";
import swal from 'sweetalert2';
import {Cliente} from "../models/cliente";
import {formatDate} from "@angular/common";
import {RegionService} from "./region.service";
import {Region} from "../models/region";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";
  public errores: string = "";
  regiones: Region[] = [];


  constructor(private clienteService: ClienteService,
              private router: Router,
              private regionService: RegionService,
              private activatedRoute: ActivatedRoute,
              @Inject(LOCALE_ID) public locale: string) {


  }

  ngOnInit(): void {
    this.cargarCliente();
    this.getRegiones();
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
    this.errores = "";
    this.cliente.auditoria = {
      createdAt: "",
      updatedAt: ""
    }
    this.cliente.fechaNacimiento = formatDate(this.cliente.fechaNacimiento, "yyyy/MM/dd", this.locale);
    console.log("cliente=", this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      (respuesta: Cliente) => {
        console.log("Cliente creado:", respuesta);

        swal.fire(
          'Nuevo cliente',
          `El cliente ${this.cliente.nombre} ha sido creado con éxito`,
          'success'
        )

        this.router.navigate(['/clientes']);
      }, (error) => {
        this.errores = JSON.stringify(error.error);
      }
    )
  }

  update(): void {
    this.errores = "";
    this.cliente.auditoria = {
      updatedAt: "",
      createdAt: ""
    }
    this.cliente.fechaNacimiento = formatDate(this.cliente.fechaNacimiento, "yyyy/MM/dd", this.locale);
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
      }, (error) => {
        this.errores = JSON.stringify(error.error);
      }
    )
  }


  getRegiones(): void {
    this.regionService.getRegiones()
      .subscribe(regiones => this.regiones = regiones);
  }

  // o1 // Objeto de la iteracion
  // o2 // Objeto del cliente
  compararRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }
}
