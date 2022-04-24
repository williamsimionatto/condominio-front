import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage/local-storage.service';

export default class Service {
  private localStorageService: LocalStorageService =  new LocalStorageService()

  constructor () {}

  public headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Authorization': 'Bearer ' + this.localStorageService.getItem('token')
  }

  public requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict),
  }
}