import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Service from '../service';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService extends Service {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public getAll() {
    return this.http.get(`${environment.apiUrl}/permissao`, this.requestOptions)
  }

  public getById(id: string) {
    return this.http.get(`${environment.apiUrl}/permissao/${id}`, this.requestOptions);
  }

  public create(permissao) {
    return this.http.post(`${environment.apiUrl}/permissao`, permissao, this.requestOptions);
  }

  public update(permissao) {
    return this.http.put(`${environment.apiUrl}/permissao/${permissao.id}`, permissao, this.requestOptions);
  }

  public delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/permissao/${id}`, this.requestOptions);
  }
}
