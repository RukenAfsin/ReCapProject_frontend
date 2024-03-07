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




getCarImage(carId:number){
  this.carImageService.getCarImage(carId).subscribe(response => {
    this.carImages = response.data;
    console.log(response)
    const now: Date = new Date();
    now.setHours(0, 0, 0, 0); // Saat kısmını sıfırlar
    this.carImages.forEach(carImage => {
      const a: Date | null = carImage.rentDate ? new Date(carImage.rentDate) : null;
      const b: Date | null = carImage.returnDate ? new Date(carImage.returnDate) : null;
      console.log("Now:", now, "Rent Date:", a, "Return Date:", b, "Car Image Id:", carImage.id);
      if (!a || !b || now < a || now > b) {
        console.log("Now is not between rent and return dates");
        this.toastrService.message("You can rent this car today", "Renting is convenient", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopCenter
        });
      } else {
        console.log("Now is between rent and return dates");
        this.toastrService.message("You cannot rent this car today", "Renting is not convenient", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter
        });
      }
    });
  });
} 







goBack(): void {
  this.location.back();
}



}
