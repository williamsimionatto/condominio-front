import { Injectable } from "@angular/core";
import { PerfilPermissaoParams } from "../../model/perfilpermissao.model";
import { LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({
  providedIn: "root"
})
export class PermissionsService {
  constructor(private localStorageService: LocalStorageService) {}

  hasPermission(sigla: string, tipo: string): boolean {
    try {
      const permissions: PerfilPermissaoParams[] = JSON.parse(this.localStorageService.getItem("permissions"));
      if (!permissions) {
        return false;
      }

      return permissions.find(x => x.sigla === sigla)[tipo] == 'S'
    } catch (error) {
      return false;
    }
  }

  getPermissionsbySigla(sigla: string): any {
    try {
      const permissions: PerfilPermissaoParams[] = JSON.parse(this.localStorageService.getItem("permissions"));
      if (!permissions) {
        return null;
      }
  
      return permissions.find(x => x.sigla === sigla);
    } catch (error) {
      return null;
    }
  }
}