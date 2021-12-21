import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserParams } from '../../model/user.model';
import Service from '../service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Service {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public getAll() {
    return this.http.get<UserParams[]>(`${environment.apiUrl}/users`, this.requestOptions);
  }

  public getById(id: string) {
    return this.http.get<UserParams>(`${environment.apiUrl}/users/${id}`, this.requestOptions);
  }

  public create(user: UserParams) {
    return this.http.post(`${environment.apiUrl}/users`, user, this.requestOptions);
  }

  public update(user: UserParams) {
    return this.http.put(`${environment.apiUrl}/users/${user.id}`, user, this.requestOptions);
  }

  public delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`, this.requestOptions);
  }
}
