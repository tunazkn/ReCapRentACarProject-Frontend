import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetailDto } from '../models/customerDetailDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrlGetAll = 'https://localhost:44334/api/customers/getall';
  apiUrlGetDetails = 'https://localhost:44334/api/customers/getdetails';

  constructor(private httpClient: HttpClient) { }

  getCustomers():Observable<ListResponseModel<CustomerDetailDto>> {
    return this.httpClient.get<ListResponseModel<CustomerDetailDto>>(this.apiUrlGetAll);
  }
  getCustomerDetails():Observable<ListResponseModel<CustomerDetailDto>> {
    return this.httpClient.get<ListResponseModel<CustomerDetailDto>>(this.apiUrlGetDetails);
  }
}
