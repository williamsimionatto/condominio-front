import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { PermissionsService } from "../permissions/permissions.service";

@Injectable()
export class CanLoadService implements CanLoad {
  constructor(private readonly permissionsService: PermissionsService) {}

  permissionsEnum = [
    {
      route: 'condominio',
      sigla: 'CAD_CONDOMINIO'
    }, {
      route: 'perfil',
      sigla: 'CAD_PERFIL'
    }, {
      route: 'periodo',
      sigla: 'CAD_PERIODO'
    },
    {
      route: 'permissao',
      sigla: 'CAD_PERMISSAO'
    }, {
      route: 'usuario',
      sigla: 'CAD_USUARIO'
    }, {
      route: 'leituraagua',
      sigla: 'TAR_LEITURAAGUA'
    },
    {
      route: 'report/leituraagua',
      sigla: 'REL_LEITURAAGUA'
    }
  ]

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    const permission = this.permissionsEnum.find(x => x.route === route.path);
    return this.permissionsService.hasPermission(permission.sigla, 'consultar');
  }
}
