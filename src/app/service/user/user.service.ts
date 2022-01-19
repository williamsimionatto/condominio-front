import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserParams } from '../../model/user.model';
import Service from '../service';
import {Observable} from 'rxjs'
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService extends Service {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public getAll(): Observable<UserParams[]> {
    const user = this.http.get(`${environment.apiUrl}/user`, this.requestOptions)
        .pipe(map((response: any) => response));

    return user;
  }

  public getById(id: string) {
    return this.http.get<UserParams>(`${environment.apiUrl}/user/${id}`, this.requestOptions);
  }

  public create(user: UserParams) {
    return this.http.post(`${environment.apiUrl}/user`, user, this.requestOptions);
  }

  public update(user: UserParams) {
    return this.http.put(`${environment.apiUrl}/user/${user.id}`, user, this.requestOptions);
  }

  public delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/user/${id}`, this.requestOptions);
  }
}
