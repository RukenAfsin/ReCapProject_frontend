import { Component } from '@angular/core';
import { CarImage } from '../../models/carImage';
import { CarImageService } from '../../services/car-image.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { Location } from '@angular/common';
import{ Rental } from '../../models/rental';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/custom-toastr.service';
import { Position } from '../../services/alertify.service';
import { RentalComponent } from '../rental/rental.component';
import { RentalService } from '../../services/rental.service';


@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrl: './car-image.component.css'
})
export class CarImageComponent {
carImages:CarImage[]=[];
rental:Rental[]=[];
cars:Car[]=[];
dataLoaded=false;
baseUrl = "https://localhost:44383/Uploads/Images/";


constructor(private carImageService:CarImageService,
  private carService:CarService,
  private location:Location,
   private activatedRoute:ActivatedRoute, private toastrService:CustomToastrService,
   private rentalService: RentalService,router:Router){}

ngOnInit():void{
this.activatedRoute.params.subscribe(params=>{
  if(params["carId"])
  {
    this.getCarImage(params["carId"]);
    this.getRental(params["carId"]);

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


getRental(carId: number) {
  this.rentalService.getRentalsByCarId(carId).subscribe(response => {
    console.log(response)
    this.rental = response.data;
    if (this.rental) {
      const now: Date = new Date();
      this.rental.forEach(rental => {
        const a: Date = rental.rentDate;
        const b: Date = rental.returnDate;   
        if (!a || !b) {
          this.toastrService.message("You can rent this car today", "Renting is convenient", {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.BottomFullWidth
          })
          return;
        }
       else if (now >= a && now <= b) {
          this.toastrService.message("You can not rent this car today", "Renting is not convenient", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.BottomFullWidth
          });
          return;
        }
        else{
          this.toastrService.message("You can not rent this car today", "Renting is not convenient", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.BottomFullWidth
          });
        }
      });}})
    }


getCarImage(carId:number){
  this.carImageService.getCarImage(carId).subscribe(response=>{
  this.carImages=response.data;
  this.dataLoaded=true;
  })
}

goBack(): void {
  this.location.back();
}



onDetailsButtonClick(carId: number): void {
  this.getCarImage(carId);
  this.getRental(carId);
  
}

}
