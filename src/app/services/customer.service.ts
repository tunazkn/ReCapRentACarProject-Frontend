import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponseModel } from '../models/customerResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrlGetAll = 'https://localhost:44334/api/customers/getall';
  apiUrlGetDetails = 'https://localhost:44334/api/customers/getdetails';

  constructor(private httpClient: HttpClient) { }

  getCustomers():Observable<CustomerResponseModel> {
    return this.httpClient.get<CustomerResponseModel>(this.apiUrlGetAll);
  }
  getCustomerDetails():Observable<CustomerResponseModel> {
    return this.httpClient.get<CustomerResponseModel>(this.apiUrlGetDetails);
  }
}
