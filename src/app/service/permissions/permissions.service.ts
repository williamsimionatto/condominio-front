import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({
  providedIn: "root"
})
export class PermissionsService {
  constructor(private localStorageService: LocalStorageService) {}

  hasPermission(sigla: string, tipo: string): boolean {
    const permissions = JSON.parse(this.localStorageService.getItem("permissions"));

    if (!permissions) {
      return false;
    }
    const permission = permissions.filter(x => {
      return x.sigla === sigla;
    })[0];

    return permission[tipo] === 'S';
  }

  getPermissionsbySigla(sigla: string): any {
    const permissions = JSON.parse(this.localStorageService.getItem("permissions"));
    if (!permissions) {
      return null;
    }

    return permissions.filter(x => x.sigla === sigla)[0];
  }
}