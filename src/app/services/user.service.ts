import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeFindeksModel } from '../models/fakeFindeksModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl= 'https://localhost:44334/';
  apiUrl ='https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  getByEmail(email:string):Observable<User>{
    return this.httpClient.get<User>(this.apiUrl + 'users/getbyemail?email='+email);
  }

  profileUpdate(user:User):Observable<ResponseModel>{
    console.log(user)
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'users/updateprofile', {
      user:{
        'id': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'status':user.status
      },
      password:user.password
    });
  }

  fakeFindeks(findeksModel:FakeFindeksModel):Observable<SingleResponseModel<FakeFindeksModel>>{
    return this.httpClient.post<SingleResponseModel<FakeFindeksModel>>(this.apiUrl+'users/getuserfindeks',findeksModel)
  }

}