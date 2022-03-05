import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { CondominoParams } from "../../model/condomino.model";
import Service from "../service";

@Injectable({
  providedIn: 'root'
})
export class CondominoService extends Service {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public getAll() {
    return this.http.get<CondominoParams[]>(`${environment.apiUrl}/condomino`, this.requestOptions);
  }

  public getByCondomino(id: number) {
    return this.http.get<CondominoParams[]>(`${environment.apiUrl}/condomino/${id}`, this.requestOptions);
  }

  public create(condomino: CondominoParams) {
    return this.http.post(`${environment.apiUrl}/condomino`, condomino, this.requestOptions);
  }

  public update(condomino: CondominoParams) {
    return this.http.put(`${environment.apiUrl}/condomino/${condomino.id}`, condomino, this.requestOptions);
  }

  public delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/condomino/${id}`, this.requestOptions);
  }
}