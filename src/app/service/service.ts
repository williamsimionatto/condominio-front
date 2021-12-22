import { HttpHeaders } from '@angular/common/http';

export default class Service {
  constructor () {}

  public headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type'
  }

  public requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict), 
  }
}