import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../models/cliente";
import {ClienteService} from "../cliente.service";
import {ActivatedRoute} from "@angular/router";

import swal from "sweetalert2";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente: Cliente;
  private fotoSeleccionada: File;
  public progreso: number = 0;

  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.getCliente();
  }

  getCliente(): void {
    this.activatedRoute.paramMap.subscribe(params => {
        let id = params.get('id');
        if (id) {
          this.clienteService.getCliente(Number(id))
            .subscribe(cliente => this.cliente = cliente);
        }
      }
    );
  }

  changeInputFile($event: any): void {
    this.progreso = 0;
    this.fotoSeleccionada = $event.target.files[0];
    console.log("Foto seleccionada:", this.fotoSeleccionada);


    // indexOf // retorna la posicion de la primer coincidencia del string pasado, en caso de no encontrar sera -1
    if (!this.fotoSeleccionada || this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error al seleccionar la foto', 'Debe seleccionar una foto', 'error');
      this.fotoSeleccionada = null;
      return;
    }

    this.clienteService.subirFoto(this.fotoSeleccionada, String(this.cliente.id))
      .subscribe((response: HttpEvent<Cliente>) => {
        console.log("Respuesta subir foto:", response);
        // Verificando que el tipo si sea de request progreso
        if (response.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((response.loaded / response.total) * 100); // Generando el porcentaje de carga
        } else if (response.type === HttpEventType.Response) { // Verifica que ya no se este enviando un progress sino se el response final
          this.cliente = (response.body as any).cliente as Cliente;
          console.log("body =\t", response.body);
          swal.fire('La foto se subio correctamente', '', 'success');
        }
      });
  }


}
