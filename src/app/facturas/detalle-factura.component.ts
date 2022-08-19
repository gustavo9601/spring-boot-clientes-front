import {Component, OnInit} from '@angular/core';
import {Factura} from "../models/factura";
import {ActivatedRoute} from "@angular/router";
import {FacturaService} from "./services/factura.service";

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {

  public factura: Factura;
  public titulo: string = "Detalle de factura";

  constructor(private facturaService: FacturaService,
              private actviatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.actviatedRoute.paramMap.subscribe(
      (params) => {
        let id: number = Number(params.get('id'));
        this.getFactura(id);
      }
    )
  }

  getFactura(id: number): void {
    this.facturaService.getFactura(id).subscribe(factura => {
        console.log("factura=\t", factura);
        this.factura = factura;
      }
    );
  }

}
