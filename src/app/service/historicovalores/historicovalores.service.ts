import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HistoricoValoresParams } from "../../model/historicovalores.model";
import Service from "../service";

@Injectable({
  providedIn: 'root'
})
export class HistoricoValoresService extends Service {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public getByLeitura(id: number) {
    return this.http.get<HistoricoValoresParams>(`${environment.apiUrl}/historicovalores/${id}`, this.requestOptions);
  }
}