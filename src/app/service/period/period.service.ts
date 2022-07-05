import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { PeriodParams } from "../../model/period.model";
import Service from "../service";

@Injectable({
  providedIn: 'root'
})
export class PeriodService extends Service {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public getAll() {
    return this.http.get<PeriodParams[]>(`${environment.apiUrl}/period`, this.requestOptions);
  }

  public getById(id: string) {
    return this.http.get<PeriodParams>(`${environment.apiUrl}/period/${id}`, this.requestOptions);
  }

  public create(period: PeriodParams) {
    return this.http.post<PeriodParams>(`${environment.apiUrl}/period`, period, this.requestOptions);
  }

  public update(period: PeriodParams) {
    return this.http.put<PeriodParams>(`${environment.apiUrl}/period/${period.id}`, period, this.requestOptions);
  }

  public delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/period/${id}`, this.requestOptions);
  }
}