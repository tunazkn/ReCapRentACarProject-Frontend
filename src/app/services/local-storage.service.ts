import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  clear(){
    this.localStorage.clear();
  }

  getItem(key : string){
    return this.localStorage.getItem(key);
  }

  removeItem(key: string){
    this.localStorage.removeItem(key);
  }

  setItem(key: string, value: string){
    this.localStorage.setItem(key,value);
  }
}
