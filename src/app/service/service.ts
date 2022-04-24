import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage/local-storage.service';

export default class Service {
  private localStorageService: LocalStorageService =  new LocalStorageService()

  constructor () {}

  public headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + this.localStorageService.getItem('token')
  }

  public requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict),
  }
}