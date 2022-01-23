import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Service from '../service';
import {Observable} from 'rxjs'
import { map } from "rxjs/operators";
import { PerfilParams } from '../../model/perfil.model';
import { PerfilPermissaoParams } from '../../model/perfilpermissao.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilPermissaoService extends Service {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public getByPerfil(id: string): Observable<PerfilPermissaoParams[]> {
    return this.http.get<PerfilPermissaoParams[]>(`${environment.apiUrl}/perfilpermissao/${id}`, this.requestOptions );
  }

  public save(data: any) {
    return this.http.post(`${environment.apiUrl}/perfilpermissao`, data, this.requestOptions);
  }
}
