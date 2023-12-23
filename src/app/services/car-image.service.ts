import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl="https://localhost:44383/api/"
  car: any = {};

  constructor(private httpClient:HttpClient) { }



 getCarImage(carId:number):Observable<ListResponseModel<CarImage>>{
 let newPath=this.apiUrl+"carImages/getbycarıd?carId="+carId
  console.log('Car Image Path:', this.car.imagePath);
  return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
 }

 getAll():Observable<ListResponseModel<CarImage>>{
  let newPath=this.apiUrl+"carImages/getall"
  return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
 }
}
