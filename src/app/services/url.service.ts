import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  baseUrl: 'https://localhost:44334/';
  apiUrl: 'https://localhost:44334/api/';
  constructor() { }

  getBaseUrl():string{
    return this.baseUrl;
  }
  getApiUrl():string{
    return this.apiUrl;
  }
}
