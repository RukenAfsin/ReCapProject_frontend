import { Component } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  cars:Car[]=[];
  dataLoaded=false;

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute){}

  ngOnInit():void{
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"])
      {
        this.getCarsByBrands(params["brandId"])
      }
      else
      {
        this.getCars()
      }
    }) 
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  getCarsByBrands(brandId: number) {
    this.carService.getCarsByBrands(brandId).subscribe(
      response => {
        if (response) {
          console.log('Servisden dönen veri:', response);
          if (response.data) {
            this.cars = response.data;
            this.dataLoaded = true;
          } else {
            console.error('Veri alınamadı veya boş.');
          }
        } else {
          console.error('Servisten null veya boş bir yanıt alındı.');
        }
      },
      error => {
        console.error('HTTP isteği sırasında bir hata oluştu:', error);
      }
    );
  }
  
  
  
  // getCarsByBrands(brandId:number){
  //   this.carService.getCarsByBrands(brandId).subscribe(response=>{
  //     this.cars=response.data
  //     this.dataLoaded=true;
  //   })
  // }

}
