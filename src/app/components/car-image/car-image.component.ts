import { Component } from '@angular/core';
import { CarImage } from '../../models/carImage';
import { CarImageService } from '../../services/car-image.service';
import { ActivatedRoute } from '@angular/router';
import { ListResponseModel } from '../../models/listResponseModel';
import { Observable } from 'rxjs';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrl: './car-image.component.css'
})
export class CarImageComponent {
carImages:CarImage[]=[];
cars:Car[]=[];
dataLoaded=false;
baseUrl = "https://localhost:44383/Uploads/Images/";


constructor(private carImageService:CarImageService,
  private carService:CarService,
  private location:Location,
   private activatedRoute:ActivatedRoute ){}

ngOnInit():void{
this.activatedRoute.params.subscribe(params=>{
  if(params["carId"])
  {
    this.getCarImage(params["carId"]);
    // this.getById(params["carId"]);
  }
  this.getAll()
})
}

getAll(){
  this.carImageService.getAll().subscribe(response=>{
  this.carImages=response.data
  this.dataLoaded=true;
  })
}

// getById(carId:number){
//   this.carService
//   .getById(carId)
//   .subscribe((response)=>{
//     this.cars=response.data;
//   })
// }

getCarImage(carId:number){
  this.carImageService.getCarImage(carId).subscribe(response=>{
  this.carImages=response.data;
  this.dataLoaded=true;
  })
}

goBack(): void {
  this.location.back();
}

}
