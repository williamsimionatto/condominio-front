import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Service from '../service';
import { environment } from '../../../environments/environment';
import { LoginParams } from '../../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends Service {
  constructor(private readonly http: HttpClient) {
    super();
  }

  login(data: LoginParams) {
    console.log(data);
    return this.http.post(`${environment.apiUrl}/auth/login`, data, this.requestOptions);
  }
}
