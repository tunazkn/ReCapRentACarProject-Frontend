import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { Rental } from '../models/rental';
import { environment } from '../../environments/environment';
import { ResponseModel } from '../models/responseModel';
import { FakeCreditCard } from '../models/fakeCreditCard';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = environment.apiUrl;
  apiUrlGetAll = 'https://localhost:44334/api/rentals/getall';
  apiUrlGetdetails = 'https://localhost:44334/api/rentals/getdetails';

  constructor(private httpClient: HttpClient) { }


  getRentals():Observable<ListResponseModel<Rental>>{
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+'rentals/details');
  }

  getRentalByCarId(id:number){
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+'rentals/detailsbycar?id='+id);
  }

  addRental(rental: RentalDetailDto, fakeCreditCard: FakeCreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>
    (this.apiUrl + 'rentals/paymentadd',
      {
        rental:
          {
            'carId': rental.carId,
            'customerId': rental.customerId,
            'returnDate': rental.returnDate
          },
        fakeCreditCardModel:
          {
            'cardNumber': fakeCreditCard.cardNumber,
            'cardHolderName': fakeCreditCard.cardHolderName,
            'expirationYear': parseInt(fakeCreditCard.expirationYear.toString()),
            'expirationMonth': parseInt(fakeCreditCard.expirationMonth.toString()),
            'cvv': fakeCreditCard.cvv
          }
      });
  }

}
