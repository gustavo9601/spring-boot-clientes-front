import {Auditoria} from "./auditoria";

export class Cliente {
  id!: number;
  nombre!: string;
  apellido!: string;
  email!: string;
  auditoria!: Auditoria;
}
