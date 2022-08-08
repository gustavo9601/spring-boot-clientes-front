import {Auditoria} from "./auditoria";

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  auditoria: Auditoria;
}
