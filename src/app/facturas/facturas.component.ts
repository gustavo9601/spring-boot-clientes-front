import {Component, OnInit} from '@angular/core';
import {Factura} from "../models/factura";
import {ClienteService} from "../clientes/cliente.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {Producto} from "../models/producto";
import {FacturaService} from "./services/factura.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {ItemFactura} from "../models/itemFactura";
import swal from "sweetalert2";
import {flatMap} from "rxjs/internal/operators";
import {map} from "rxjs/operators";
import {isElementScrolledOutsideView} from "@angular/cdk/overlay/position/scroll-clip";

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  titulo: string = 'Nueva factura';
  factura: Factura = new Factura();

  autocompleteControl = new FormControl();

  productosFiltrados: Observable<Producto[]>;

  constructor(private clienteService: ClienteService,
              private facturaService: FacturaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId: number = Number(params.get('clienteId'));
      if (clienteId) {
        this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
        this.factura.itemsFacturas = [];
      }
    });

    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre), // Convertir a string si es un objeto
        flatMap(value => value ? this._filter(value) : []) // Aplanamos y devolvemos a partir del string un array de productos
      );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.filtrarProductos(filterValue);
  }


  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }


  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto: Producto = event.option.value as Producto;
    console.log(producto);

    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      console.log("current factura=\t", this.factura);
      this.factura.itemsFacturas.push(nuevoItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
    console.log("this.factura.itemsFacturas=\t", this.factura.itemsFacturas);
  }

  existeItem(id: number): boolean {
    let existe = false;
    if(this.factura.itemsFacturas){
      this.factura.itemsFacturas.forEach((item: ItemFactura) => {
        if (id === item.producto.id) {
          existe = true;
        }
      });
    }
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.factura.itemsFacturas = this.factura.itemsFacturas.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItemFactura(id: number): void {
    this.factura.itemsFacturas = this.factura.itemsFacturas.filter((item: ItemFactura) => id !== item.producto.id);
  }

  create(facturaForm: any): void {
    console.log("this.factura=\t", this.factura);
    if (this.factura?.itemsFacturas?.length == 0) {
      this.autocompleteControl.setErrors({'invalid': true});
    }

    if (facturaForm.form.valid && this.factura?.itemsFacturas?.length > 0) {
      this.facturaService.create(this.factura).subscribe(factura => {
        swal.fire(`Factura ${factura.descripcion} creada con ??xito para el cliente: [${factura.cliente.nombre}]!`, "", "success");
        this.router.navigate(['/clientes']);
      });
    }
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }

    this.factura.itemsFacturas = this.factura.itemsFacturas.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }
}
