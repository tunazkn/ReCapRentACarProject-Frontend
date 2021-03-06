
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import {ResponseModel} from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseUrl= "https://localhost:44334/";
  apiUrl = "https://localhost:44334/api/";

  constructor(private httpClient: HttpClient) {}

  getBrands():Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+ 'brands/');
  }
  addBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+ 'brands/add',brand);
  }

  updateBrand(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'brands/update', brand);
  }

  getBrandById(id: number): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + 'brands/id?id='+ id);
  }

}
