import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { CarDetailDto } from '../models/carDetailDto';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrlGetAll = 'https://localhost:44334/api/cars/getall';
  apiUrlGetdetails = 'https://localhost:44334/api/cars/getdetails';

  constructor(private httpClient: HttpClient) {}

  getCars():Observable<ListResponseModel<CarDetailDto>> {
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(this.apiUrlGetAll);
  }
  
  getCarDetails():Observable<ListResponseModel<CarDetailDto>> {
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(this.apiUrlGetdetails);
  }
}