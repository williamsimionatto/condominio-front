import { Injectable } from "@angular/core";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { LocalStorageService } from "..";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (
    private localStorageService: LocalStorageService,
    private jwtHelperService: JwtHelperService
  ) {}

  public isAuthenticated(): boolean {
    const token = this.localStorageService.getItem("token");
    const isExpired = this.jwtHelperService.isTokenExpired(token);
    return true || !isExpired;
  }
}