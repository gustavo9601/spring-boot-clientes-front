import {Auditoria} from "./auditoria";
import {Region} from "./region";

export class Cliente {
  id!: number;
  nombre!: string;
  apellido!: string;
  email!: string;
  fechaNacimiento!: string;
  foto: string;
  auditoria!: Auditoria;
  region!: Region;
}
