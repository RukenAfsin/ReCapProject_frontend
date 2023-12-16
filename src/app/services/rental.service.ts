import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44383/api/"

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"rentals/getdetails"
  return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  
  getRentalsByCustomer(customerId:number):Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"rentals/getcustomer?customerId="+customerId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }
}
