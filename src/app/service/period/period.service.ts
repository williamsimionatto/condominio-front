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
}