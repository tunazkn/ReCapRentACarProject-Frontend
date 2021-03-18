import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetailDto } from '../models/rentalDetailDto';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrlGetAll = 'https://localhost:44334/api/rentals/getall';
  apiUrlGetdetails = 'https://localhost:44334/api/rentals/getdetails';

  constructor(private httpClient: HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDetailDto>> {
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(this.apiUrlGetAll);
  }

  getRentalDetails():Observable<ListResponseModel<RentalDetailDto>> {
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(this.apiUrlGetdetails)
  }
}
