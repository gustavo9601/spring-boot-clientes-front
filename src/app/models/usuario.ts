import {Auditoria} from "./auditoria";

export class Usuario {
  id: number;
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  email: string;
  roles: Role[] = [];
}


export class Role{
  id: number;
  nombre: string;
  auditoria: Auditoria;
}
