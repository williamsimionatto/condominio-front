import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { LeituraAguaParams } from "../../model/leitura-agua.model";
import Service from "../service";

@Injectable({
  providedIn: 'root'
})
export class LeituraAguaService extends Service {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public getAll() {
    return this.http.get<LeituraAguaParams[]>(`${environment.apiUrl}/leituraagua`, this.requestOptions);
  }

  public getById(id: string) {
    return this.http.get<LeituraAguaParams>(`${environment.apiUrl}/leituraagua/${id}`, this.requestOptions);
  }

  public create(leituraAgua: LeituraAguaParams) {
    return this.http.post(`${environment.apiUrl}/leituraagua`, leituraAgua, this.requestOptions);
  }

  public update(leituraAgua: LeituraAguaParams) {
    return this.http.put(`${environment.apiUrl}/leituraagua/${leituraAgua.id}`, leituraAgua, this.requestOptions);
  }

  public delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/leituraagua/${id}`, this.requestOptions);
  }
}