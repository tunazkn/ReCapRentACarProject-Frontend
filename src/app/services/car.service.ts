import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarResponseModel } from '../models/carResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrlGetAll = 'https://localhost:44334/api/cars/getall';
  apiUrlGetdetails = 'https://localhost:44334/api/cars/getdetails';
  constructor(private httpClient: HttpClient) {}

  getCars():Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(this.apiUrlGetAll);
  }
  
  getCardetails():Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(this.apiUrlGetdetails);
  }
}