import {Auditoria} from "./auditoria";
import {Region} from "./region";
import {Factura} from "./factura";

export class Cliente {
  id!: number;
  nombre!: string;
  apellido!: string;
  email!: string;
  fechaNacimiento!: string;
  foto: string;
  auditoria!: Auditoria;
  region!: Region;
  facturas: Factura[];
}
