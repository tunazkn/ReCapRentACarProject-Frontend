import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  //apiUrl = environment.apiUrl;
  //apiUrl2 = 'https://localhost:44334/api/';

  baseUrl= "https://localhost:44334/";
  apiUrl ="https://localhost:44334/api/";
  
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/details';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/detailsbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/detailsbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  //burada bu tarz işlemler içni yani tek bir değer geliyorsa single response model kullanacaz. buna göre refactor edicez kodları
  //o yüzden burayı hatalı bıraktım. 
  //ilerleyen zamanlarda bakıcam buraya.
  ///bunu yaparken aynı zamanda backend i de kontrol edilmeli ama 
  //mesela auth için result.data dönüyordu ama biz single kullanunca data, success ve message kullanıypruz o yüzden direk result döndürmek lazım.
  //result ile bir araba bilgisi ile mesaj ve success glecek.
  //bunu color ve brand için de ypabiliriz. ve yapıcaz da .
  getCarDetail(carId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/detailsbyid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByBrandAndColor(
    brandId: number,
    colorId: number
  ): Observable<ListResponseModel<Car>> {
    let newPath =
      this.apiUrl +
      'cars/CarsByBrandAndColor?brandId=' +
      brandId +
      '&colorId=' +
      colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  //20. gün kodları
  addCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/add",car);
  }

  updateCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'cars/update',car);
  }
}
