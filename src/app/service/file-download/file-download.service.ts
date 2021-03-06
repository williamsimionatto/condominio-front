import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {
  private localStorageService: LocalStorageService =  new LocalStorageService()
  public headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + this.localStorageService.getItem('token')
  }

  constructor(private readonly http: HttpClient) {}

  public getById(id: string) {
    return this.http.get(`${environment.apiUrl}/leituraagua/condominos/${id}/boleto`,{
      headers: {
        'Authorization': 'Bearer ' + this.localStorageService.getItem('token')
      },
      responseType: 'blob'
    }
    );
  }

  public save(file, id: string) {
    return this.http.post(`${environment.apiUrl}/leituraagua/condominos/${id}/boleto`, file, {
      headers: {
        'Authorization': 'Bearer ' + this.localStorageService.getItem('token')
      }
    });
  }

  public delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/leituraagua/condominos/${id}/boleto`, {
      headers: {
        'Authorization': 'Bearer ' + this.localStorageService.getItem('token')
      }
    });
  }
}