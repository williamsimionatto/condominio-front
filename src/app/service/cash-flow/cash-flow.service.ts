import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import Service from "../service";

@Injectable({
  providedIn: 'root'
})
export class CashFlowService extends Service {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public getAll(params: any) {
    const options = Object.assign({}, this.requestOptions, { params: params });
    
    return this.http.get(`${environment.apiUrl}/cashflow`, options);
  }
}