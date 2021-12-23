import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: Storage

  constructor() { 
    this.storage = window.localStorage;
  }

  public setItem(key: string, value: any) {
    this.storage.setItem(key, value);
  }

  public getItem(key: string) {
    return this.storage.getItem(key);
  }

  public removeItem(key: string) {
    this.storage.removeItem(key);
  }

  public clear() {
    this.storage.clear();
  }
}
