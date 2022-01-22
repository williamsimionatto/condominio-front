import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Service from '../service';
import {Observable} from 'rxjs'
import { map } from "rxjs/operators";
import { PerfilParams } from '../../model/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService extends Service {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public getAll() {
    return this.http.get<PerfilParams[]>(`${environment.apiUrl}/perfil`, this.requestOptions)
  }

  public getById(id: string) {
    return this.http.get<PerfilParams>(`${environment.apiUrl}/perfil/${id}`, this.requestOptions);
  }

  public create(perfil: PerfilParams) {
    return this.http.post(`${environment.apiUrl}/perfil`, perfil, this.requestOptions);
  }

  public update(perfil: PerfilParams) {
    return this.http.put(`${environment.apiUrl}/perfil/${perfil.id}`, perfil, this.requestOptions);
  }

  public delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/perfil/${id}`, this.requestOptions);
  }
}
