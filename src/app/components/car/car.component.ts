import { ChangeDetectorRef, Component } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';
import { CarImageService } from '../../services/car-image.service';
import { CarImage } from '../../models/carImage';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/custom-toastr.service';
import { RentalService } from '../../services/rental.service';
import { Rental } from '../../models/rental';
import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent {
  cars: Car[] = [];
  currentCar: Car;
  // dataLoaded=false;
  brands: Brand[] = [];
  colors: Color[] = [];
  rental:Rental[]=[];
  colorFilter: number = 0;
  brandFilter: number = 0;
  imageOfPath: string;
  baseUrl = 'https://localhost:44383/Uploads/Images/';
  filterText = '';
  filterColorText = '';
  carImages:CarImage[]=[];

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService,
    private carImageService: CarImageService,
    private toastrService:CustomToastrService,
    private matradiomodule:MatRadioModule
  ) { }

  ngOnInit(): void {
    this.matradiomodule
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId'] && params['brandId']) {
        this.getCarDetailByColorAndBrand(params['colorId'], params['brandId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['carId']){
        this.getById(params['carId']);
      }else if (params['carId']){
        this.getCarImage(params['carId']);
      }else {
        this.getCars();
      }
    });
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.toastrService.message("Welcome My Love", "You are seeing  all cars",{
        messageType: ToastrMessageType.Info,
        position:ToastrPosition.BottomFullWidth
      })
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      console.log(response);
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      //  this.dataLoaded=true;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      console.log(response);
    });
  }

  getSelectedBrand(brandId: number): boolean {
    console.log();
    return this.brandFilter === brandId;
  }

  getSelectedColor(colorId: number): boolean {
    console.log();
    return this.colorFilter === colorId;
  }

  getCarDetailByColorAndBrand(colorId: number, brandId: number) {
    this.carService
      .getCarDetailByColorAndBrand(colorId, brandId)
      .subscribe((response) => {
        console.log(response);
        this.cars = response.data;
        console.log(response);
      });
  }

  image(carId: number) {
    this.carImageService.getCarImage(carId).subscribe((response) => {
      const imagePath = response.data[0].imagePath;
      this.imageOfPath = this.baseUrl + imagePath;
      console.log(this.imageOfPath);
    });
    return this.imageOfPath;
  }

  setCurrentCar(car: Car) {
    this.getById(car.carId);
  }

  getById(carId:number){
    this.carService
    .getById(carId)
    .subscribe((response)=>{
      this.cars=response.data;
    })
  }

  getCarImage(carId:number){
    this.carImageService.getCarImage(carId).subscribe(response=>{
    this.carImages=response.data;
    const now:Date=new Date();
    this.carImages.forEach(carImages=>{
      const a : Date= carImages.rentDate;
      const b: Date=carImages.returnDate;
      if (a == null || b == null){
        this.toastrService.message("You can  rent this car today", "Renting is  convenient", {
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopCenter
        })
       }
       else if(now >= a && now <= b){{
        this.toastrService.message("You can not rent this car today", "Renting is not convenient", {
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopCenter
        })
       }
      }
      else{
        this.toastrService.message("You can not rent this car today", "Renting is not convenient", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.BottomFullWidth
        });
      }
 
    })
   
    })
     
  }
}
