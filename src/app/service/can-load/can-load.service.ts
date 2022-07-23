import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { PermissionsService } from "../permissions/permissions.service";

type PermissionsEnum = {
  route: string;
  slug: string;
}

@Injectable()
export class CanLoadService implements CanLoad {
  constructor(private readonly permissionsService: PermissionsService) {}

  permissionsEnum: PermissionsEnum[] = [
    {
      route: 'condominio',
      slug: 'CAD_CONDOMINIO'
    }, {
      route: 'perfil',
      slug: 'CAD_PERFIL'
    }, {
      route: 'periodo',
      slug: 'CAD_PERIODO'
    },
    {
      route: 'permissao',
      slug: 'CAD_PERMISSAO'
    }, {
      route: 'usuario',
      slug: 'CAD_USUARIO'
    }, {
      route: 'leituraagua',
      slug: 'TAR_LEITURAAGUA'
    },
    {
      route: 'report/leituraagua',
      slug: 'REL_LEITURAAGUA'
    }
  ]

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    const permission = this.permissionsEnum.find(x => x.route === route.path);
    return this.permissionsService.hasPermission(permission.slug, 'consultar');
  }
}
