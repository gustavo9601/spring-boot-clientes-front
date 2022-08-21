import {ItemFactura} from "./itemFactura";
import {Cliente} from "./cliente";
import {Auditoria} from "./auditoria";

export class Factura {
  id: number;
  descripcion: string;
  observacion: string;
  itemsFacturas: ItemFactura[];
  cliente: Cliente;
  total: number;
  auditoria!: Auditoria;

  calcularGranTotal(): number {
    return this.itemsFacturas.map(item => item.calcularImporte())
      .reduce((ant, act) => ant + act, 0);
  }
}
