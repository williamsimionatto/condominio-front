import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { LeituraAguaValoresParams } from "../../model/leitura-agua-valores.model";
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

  public getValores(dataLeitura: string) {
    return this.http.get<LeituraAguaValoresParams[]>(`${environment.apiUrl}/leituraagua/condominos?date=${dataLeitura}`, this.requestOptions);
  }

  public save(leituraAgua) {
    return this.http.post<LeituraAguaValoresParams>(`${environment.apiUrl}/leituraagua/condominos/valores`, leituraAgua, this.requestOptions);
  }

  public updateValores(id, leituraAgua) {
    return this.http.put<void>(`${environment.apiUrl}/leituraagua/condominos/valores/${id}`, leituraAgua, this.requestOptions);
  }

  public getValoresCondominos(idLeitura: string, dataLeitura: string) {
    return this.http.get<LeituraAguaValoresParams[]>(`${environment.apiUrl}/leituraagua/condominos/valores?id=${idLeitura}&date=${dataLeitura}`, this.requestOptions);
  }

  public create(leituraAgua: LeituraAguaParams) {
    return this.http.post(`${environment.apiUrl}/leituraagua`, leituraAgua, this.requestOptions);
  }

  public update(leituraAgua: LeituraAguaParams) {
    return this.http.put(`${environment.apiUrl}/leituraagua/${leituraAgua.id}`, leituraAgua, this.requestOptions);
  }

  public delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/leituraagua/${id}`, this.requestOptions);
  }

  public report(dataInicial: string, dataFinal: string, condomino: number) {
    let query: string = `?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    if (condomino) {
      query += `&condomino=${condomino}`;
    }

    return this.http.get(`${environment.apiUrl}/report/leituraagua${query}` , this.requestOptions);
  }

  public isUniqueDataLeitura(condominio: string, dataLeitura: string) {
    return this.http.get<boolean>(`${environment.apiUrl}/leituraagua/isUniqueLeituraMonth?condominio=${condominio}&dataleitura=${dataLeitura}`, this.requestOptions);
  }
}