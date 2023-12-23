import { Component } from '@angular/core';
import { CarImage } from '../../models/carImage';
import { CarImageService } from '../../services/car-image.service';
import { ActivatedRoute } from '@angular/router';
import { ListResponseModel } from '../../models/listResponseModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrl: './car-image.component.css'
})
export class CarImageComponent {
carImages:CarImage[]=[];
dataLoaded=false;
baseUrl = "https://localhost:44383/Uploads/Images";


constructor(private carimageService:CarImageService, private activatedRoute:ActivatedRoute ){}

ngOnInit():void{
this.activatedRoute.params.subscribe(params=>{
  if(params["carId"])
  {
    this.getCarImage(params["carId"])
  }
  this.getAll()
})
}

getAll(){
  this.carimageService.getAll().subscribe(response=>{
  this.carImages=response.data
  this.dataLoaded=true;
  })
}


getCarImage(carId:number){
  this.carimageService.getCarImage(carId).subscribe(response=>{
  this.carImages=response.data;
  this.dataLoaded=true;
  })
}

}
