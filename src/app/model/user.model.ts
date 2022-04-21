import { PerfilParams } from "./perfil.model";

export type UserParams = {
  id: string;
  name: string;
  email: string;
  password: string;
  ativo: boolean;
  perfilId: string;
  cpf: string;
}

export type UserParamsAuth = {
  id: number;
  name: string;
  email: string;
  active: string;
  perfil: PerfilParams;
}