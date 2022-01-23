import { PerfilParams } from "./perfil.model";
import { PermissaoParams } from "./permissao.mode";

export type PerfilPermissaoParams = {
  id: number;
  name: string;
  sigla: string;
  consultar: string;
  inserir: string;
  alterar: string;
  excluir: string;
}
