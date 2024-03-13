import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl="http://localhost:44383/api/"

  constructor(private httpClient:HttpClient) { }

addPayments(payment:Payment): Observable<ListResponseModel<Payment>>
{
  let newPath = this.apiUrl + "payments/add";
  return this.httpClient.post<ListResponseModel<Payment>>(newPath, payment); 
}

}
