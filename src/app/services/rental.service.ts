import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentalResponseModel } from '../models/rentalResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrlGetAll = 'https://localhost:44334/api/rentals/getall';
  apiUrlGetdetails = 'https://localhost:44334/api/rentals/getdetails';

  constructor(private httpClient: HttpClient) { }

  getRentals():Observable<RentalResponseModel> {
    return this.httpClient.get<RentalResponseModel>(this.apiUrlGetAll);
  }

  getRentalDetails():Observable<RentalResponseModel> {
    return this.httpClient.get<RentalResponseModel>(this.apiUrlGetdetails)
  }
}
