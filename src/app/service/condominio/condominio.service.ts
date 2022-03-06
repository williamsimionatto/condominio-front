import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { CondominioParams } from "../../model/condominio.model";
import Service from "../service";

@Injectable({
  providedIn: 'root'
})
export class CondominioService extends Service {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public getAll() {
    return this.http.get<CondominioParams[]>(`${environment.apiUrl}/condominio`, this.requestOptions);
  }

  public getById(id: string) {
    return this.http.get<CondominioParams>(`${environment.apiUrl}/condominio/${id}`, this.requestOptions);
  }

  public create(condominio: CondominioParams) {
    return this.http.post(`${environment.apiUrl}/condominio`, condominio, this.requestOptions);
  }

  public update(condominio: CondominioParams) {
    return this.http.put(`${environment.apiUrl}/condominio/${condominio.id}`, condominio, this.requestOptions);
  }

  public delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/condominio/${id}`, this.requestOptions);
  }
}